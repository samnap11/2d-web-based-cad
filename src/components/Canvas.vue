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
    let oldx = 0;
    let oldy = 0;
    let posx= 0;
    let posy = 0;
    let drag = false;

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
      canvas.addEventListener('mousedown',(e)=>{
        drag = true;
        oldx = e.pageX;
        oldy = e.pageY;
        console.log(drag);
        e.preventDefault();
      },false);
      canvas.addEventListener('mouseup',(e)=>{
        drag = false;
        console.log(drag);
        e.preventDefault();
      },false);

      gl.clearColor(1, 1, 1, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const glObject = new GLObject(0, program, gl);
        glObject.setVertexArray(triangleData.value);
        glObject.setPosition(0, 0);
        glObject.setRotation(0);
        glObject.setScale(1, 1);
        glObject.bind();
        const renderer = new Renderer();
        renderer.addObject(glObject);
        renderer.render();
        canvas.addEventListener('mousemove',(e)=>{
        if(!drag) return false;
        posx = (e.pageX - oldx)/1000;
        posy = (oldy- e.pageY)/1000;
        console.log(posx,posy);
        glObject.setPosition(posx, posy);
        glObject.bind();
        const renderer = new Renderer();
        renderer.addObject(glObject);
        renderer.render();
        e.preventDefault();
      },false);
    });
  },
});
</script>
<style lang = "css">
  
</style>
