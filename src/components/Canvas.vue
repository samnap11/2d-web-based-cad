<template>
  <Suspense>
    <template #default>
      <div>
        <input type="radio" id="transformLine" value="1" v-model="picked" />
        <label for="transformLine">Geser</label>
        <input type="radio" id="rotateLine" value="2" v-model="picked" />
        <label for="rotateLine">Rotate</label>
        <input type="radio" id="scaleLine" value="3" v-model="picked" />
        <label for="scaleLine">Scale</label>
        <canvas id="mycanvasLine" width="1000" height="1000"></canvas>
      </div>
    </template>
    <template #fallback>
      <h3>Loading...</h3>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onUpdated } from 'vue';
import Renderer from '../classes/Renderer';
import { initShaderFiles } from '../loaders/shader';
import GLObjectInput from '../utils/GLObjectInput';
import { drawTriangle } from '../utils/draw';

export default defineComponent({
  name: 'Canvas',
  setup() {
    const lineData = ref([200.0, 200.0, 400.0, 200.0]);
    const picked = ref('');
    let oldx = 0;
    let oldy = 0;
    let posx = 0;
    let posy = 0;
    let drag = false;
    let THETA = 0;

    onMounted(async () => {
      const canvas = document.getElementById(
        'mycanvasLine'
      ) as HTMLCanvasElement;
      const gl = canvas.getContext('webgl2') as WebGL2RenderingContext;

      const program = await initShaderFiles(
        gl,
        'draw-vert.glsl',
        'draw-frag.glsl'
      );

      if (!program) {
        console.log("Program can't be instantiated");
      }
      canvas.addEventListener(
        'mousedown',
        (e) => {
          drag = true;
          oldx = e.pageX;
          oldy = e.pageY;
          console.log(drag);
          e.preventDefault();
        },
        false
      );
      canvas.addEventListener(
        'mouseup',
        (e) => {
          drag = false;
          console.log(drag);
          e.preventDefault();
        },
        false
      );

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clearColor(1, 1, 1, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const glObject0Config: GLObjectInput = {
        id: 0,
        vertexArr: lineData.value,
        position: [0, 0],
        rotation: 0,
        scale: [1, 1],
      };

      const glObject = drawTriangle(glObject0Config, program, gl);
      const renderer = new Renderer();
      renderer.addObject(glObject);
      renderer.render(glObject.id);
      canvas.addEventListener(
        'mousemove',
        (e) => {
          if (!drag) return false;
          if (picked.value == '1') {
            posx = (e.pageX - oldx) / 2;
            posy = (oldy - e.pageY) / 2;
            console.log(posx, posy);
            glObject.setPosition(posx, posy);
            glObject.bind();
            const renderer = new Renderer();
            renderer.addObject(glObject);
            renderer.render(glObject.id);
          } else if (picked.value == '2') {
            THETA += (e.pageX - oldx) * 2 * Math.PI;
            glObject.setRotation(THETA);
            glObject.bind();
            const renderer = new Renderer();
            renderer.addObject(glObject);
            renderer.render(glObject.id);
          } else if (picked.value == '3') {
            posx = (e.pageX - oldx) / 1000;
            posy = (oldy - e.pageY) / 1000;
            console.log(posx, posy);
            glObject.setScale(posx, posy);
            glObject.bind();
            const renderer = new Renderer();
            renderer.addObject(glObject);
            renderer.render(glObject.id);
          } else {
            return false;
          }
          e.preventDefault();
        },
        false
      );
    });
    onUpdated(() => {
      console.log(picked.value);
    });
    return { picked };
  },
});
</script>
