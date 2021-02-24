<template>
  <Suspense>
    <template #default>
      <div>
        <input type="radio" id="transformPol" value="1" v-model="picked" />
        <label for="transformPol">Geser</label>
        <input type="radio" id="rotatePol" value="2" v-model="picked" />
        <label for="rotatePol">Rotate</label>
        <input type="radio" id="scalePol" value="3" v-model="picked" />
        <label for="scalePol">Scale</label>
        <canvas id="mycanvasPol" width="1000" height="1000"></canvas>
        <!-- <div>
          <input
            type="number"
            name="red"
            id="red"
            placeholder="red"
            v-model="colorR"
          />
          <input
            type="number"
            name="green"
            id="green"
            placeholder="green"
            v-model="colorG"
          />
          <input
            type="number"
            name="blue"
            id="blue"
            placeholder="blue"
            v-model="colorB"
          />
          <input
            type="number"
            name="alpha"
            id="alpha"
            placeholder="alpha"
            v-model="colorA"
          />
          <button @submit.prevent="onSubmitColor" type="submit">Submit</button>
        </div> -->
      </div>
    </template>
    <template #fallback>
      <h3>Loading...</h3>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated, ref } from 'vue';
import Renderer from '../classes/Renderer';
import { initShaderFiles } from '../loaders/shader';
import GLObjectInput from '../utils/GLObjectInput';
import { drawTriangle } from '../utils/draw';

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

    const picked = ref('');

    let oldx = 0;
    let oldy = 0;
    let posx = 0;
    let posy = 0;
    let drag = false;
    let THETA = 0;

    // const colorR = ref(255.0);
    // const colorG = ref(0.0);
    // const colorB = ref(0.0);
    // const colorA = ref(255.0);

    // const mouseX = ref(0);
    // const mouseY = ref(0);
    // const drag = ref(false);
    // const glObject = ref<GLObject>();
    // const renderer = ref(new Renderer());

    onMounted(async () => {
      const canvas = document.getElementById(
        'mycanvasPol'
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

      canvas.addEventListener('mousedown', (e) => {
        drag = true;
        oldx = e.pageX;
        oldy = e.pageY;
        e.preventDefault();
      });

      canvas.addEventListener('mouseup', (e) => {
        drag = false;
        e.preventDefault();
      });

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

      const glObject = drawTriangle(glObject0Config, program, gl);

      const renderer = new Renderer();
      renderer.addObject(glObject);
      renderer.render(glObject.id);
      canvas.addEventListener('mousemove', (e) => {
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
      });
    });

    onUpdated(() => {
      console.log(picked.value);
    });

    // const onMouseDown = (event: MouseEvent) => {
    //   drag.value = true;
    //   mouseX.value = event.pageX;
    //   mouseY.value = event.pageY;
    // };

    // const onMouseUp = () => {
    //   drag.value = false;
    // };

    // const onMouseMove = (event: MouseEvent) => {
    //   if (!drag.value) return;
    //   mouseX.value = (event.pageX - mouseX.value) / 5;
    //   mouseY.value = (mouseY.value - event.pageY) / 5;
    //   glObject.value.bind();
    //   glObject.value.setPosition(mouseX.value, mouseY.value);
    //   renderer.value.removeObject(glObject.value.id);
    //   renderer.value.addObject(glObject.value);
    //   renderer.value.render(glObject.value.id);
    // };

    // const onSubmitColor = () => {
    //   glObject.value.bind();
    //   renderer.value.removeObject(glObject.value.id);
    //   renderer.value.renderAll();
    // };

    return {
      // mouseX,
      // mouseY,
      // drag,
      // onMouseUp,
      // onMouseDown,
      // onMouseMove,
      // glObject,
      // colorR,
      // colorG,
      // colorB,
      // colorA,
      // onSubmitColor,
      picked,
    };
  },
});
</script>
