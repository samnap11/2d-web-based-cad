<template>
  <canvas id="mycanvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'Canvas',
  setup() {
    onMounted(() => {
      const canvas = document.getElementById('mycanvas') as HTMLCanvasElement;
      const gl = canvas.getContext('webgl2') as WebGL2RenderingContext;

      gl.clearColor(0.9, 0.9, 0.8, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
    });
  },
});
</script>
