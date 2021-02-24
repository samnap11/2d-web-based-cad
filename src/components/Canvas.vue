<template>
  <Suspense>
    <template #default>
      <canvas
        @mousedown.prevent="onMouseDown"
        @mouseup.prevent="onMouseUp"
        @mousemove.prevent="onMouseMove"
        id="mycanvas"
        width="1000"
        height="1000"
      ></canvas>
    </template>
    <template #fallback>
      <h3>Loading...</h3>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Renderer from '../classes/Renderer';
import { initShaderFiles } from '../loaders/shader';
import GLObjectInput from '../utils/GLObjectInput';
import { drawTriangle } from '../utils/draw';
import GLObject from '@/classes/GLObject';

export default defineComponent({
  name: 'Canvas',
  setup() {
    const polygonData = ref([
      200.0,
      200.0,
      400.0,
      200.0,
      400.0,
      400.0,
      200.0,
      400.0,
      100.0,
      300.0,
    ]);

    const mouseX = ref(0);
    const mouseY = ref(0);
    const drag = ref(false);
    const glObject = ref<GLObject>();
    const renderer = ref(new Renderer());

    onMounted(async () => {
      const canvas = document.getElementById('mycanvas') as HTMLCanvasElement;
      const gl = canvas.getContext('webgl2') as WebGL2RenderingContext;

      const program = await initShaderFiles(
        gl,
        'draw-vert.glsl',
        'draw-frag.glsl'
      );

      if (!program) {
        console.log("Program can't be instantiated");
      }

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clearColor(1, 1, 1, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const glObject0Config: GLObjectInput = {
        id: 0,
        vertexArr: polygonData.value,
        position: [0, 0],
        rotation: 0,
        scale: [1, 1],
      };

      glObject.value = drawTriangle(glObject0Config, program, gl);
      renderer.value.addObject(glObject.value);
      renderer.value.render(glObject.value.id);
    });

    const onMouseDown = (event: MouseEvent) => {
      drag.value = true;
      mouseX.value = event.pageX;
      mouseY.value = event.pageY;
    };

    const onMouseUp = () => {
      drag.value = false;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!drag.value) return;
      mouseX.value = (event.pageX - mouseX.value) / 5;
      mouseY.value = (mouseY.value - event.pageY) / 5;
      glObject.value.setPosition(mouseX.value, mouseY.value);
      glObject.value.bind();
      renderer.value.removeObject(glObject.value.id);
      renderer.value.addObject(glObject.value);
      renderer.value.render(glObject.value.id);
    };

    return {
      mouseX,
      mouseY,
      drag,
      onMouseUp,
      onMouseDown,
      onMouseMove,
      glObject,
    };
  },
});
</script>
