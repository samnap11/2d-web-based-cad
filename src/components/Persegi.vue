<template>
  <div></div>
  <div>
    <Suspense>
      <template #default>
        <div>
          <input type="radio" id="transformSq" value="1" v-model="picked" />
          <label for="transformSq">Geser</label>
          <input type="radio" id="rotateSq" value="2" v-model="picked" />
          <label for="rotateSq">Rotate</label>
          <input type="radio" id="scaleSq" value="3" v-model="picked" />
          <label for="scaleSq">Scale</label>
          <canvas id="mycanvasSq" width="1000" height="1000"></canvas>
        </div>
      </template>
      <template #fallback>
        <h3>Loading...</h3>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onUpdated } from 'vue';
import GLObject from '../classes/GLObject';
import Renderer from '../classes/Renderer';
import { initShaderFiles } from '../loaders/shader';

export default defineComponent({
  name: 'Canvas',
  setup() {
    const squareData = ref([
      400.0,
      400.0,
      200.0,
      400.0,
      200.0,
      200.0,
      400.0,
      200.0,
    ]);
    const picked = ref('');
    let oldx = 0;
    let oldy = 0;
    let posx = 0;
    let posy = 0;
    let drag = false;
    let THETA = 0;

    onMounted(async () => {
      const canvas = document.getElementById('mycanvasSq') as HTMLCanvasElement;
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
      gl.clearColor(1, 1, 1, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const glObject = new GLObject(0, program, gl);
      glObject.setVertexArray(squareData.value);
      glObject.setPosition(0, 0);
      glObject.setRotation(0);
      glObject.setScale(1, 1);
      glObject.bind();
      const renderer = new Renderer();
      renderer.addObject(glObject);
      renderer.render(glObject.id);
      canvas.addEventListener(
        'mousemove',
        (e) => {
          if (!drag) return false;
          if (picked.value == '1') {
            posx = (e.pageX - oldx) / 1000;
            posy = (oldy - e.pageY) / 1000;
            console.log(posx, posy);
            glObject.setPosition(posx, posy);
            glObject.bind();
            const renderer = new Renderer();
            renderer.addObject(glObject);
            renderer.render(glObject.id);
          } else if (picked.value == '2') {
            THETA += ((e.pageX - oldx) * 2 * Math.PI) / canvas.width;
            console.log(THETA);
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
<style lang="css"></style>
