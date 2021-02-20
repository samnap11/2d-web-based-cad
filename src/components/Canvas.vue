<template>
  <Suspense>
    <template #default>
      <canvas id="mycanvas" width="1000" height="1000"></canvas>
    </template>
    <template #fallback>
      <h3>Loading...</h3>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import GLObject from '../classes/GLObject';
import Renderer from '../classes/Renderer';
import { initShaderFiles } from '../loaders/shader';

export default defineComponent({
  name: 'Canvas',
  setup() {
    const triangleData = ref([0.1, 0.1, 1.0, 0.0, 0.0, 1.0]);

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

      gl.clearColor(1, 1, 1, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const glObject = new GLObject(0, program, gl);
      glObject.setVertexArray(triangleData.value);
      glObject.setPosition(0, 0);
      glObject.setRotation(0);
      glObject.setScale(1, 1);
      glObject.bind();

      const glObject2 = new GLObject(0, program, gl);
      glObject2.setVertexArray(triangleData.value);
      glObject2.setPosition(0, 0);
      glObject2.setRotation(180);
      glObject2.setScale(1, 1);
      glObject2.bind();

      const renderer = new Renderer();
      renderer.addObject(glObject);
      renderer.addObject(glObject2);
      renderer.render();
    });
  },
});
</script>
