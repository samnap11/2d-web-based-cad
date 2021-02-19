<template>
  <canvas id="mycanvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import GLObject from '../classes/GLObject';
import { initShaderFiles } from '../loaders/shader';

export default defineComponent({
  name: 'Canvas',
  setup() {
    const triangleData = [0.1, 0.1, 1.0, 0.0, 0.0, 1.0];

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
      glObject.setVertexArray(triangleData);
      glObject.setPosition(0, 0);
      glObject.setRotation(0);
      glObject.setScale(1, 1);
      glObject.bind();
      glObject.draw();
    });
  },
});
</script>
