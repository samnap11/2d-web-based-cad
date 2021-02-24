<template>
<div class = "container">
<h3>Mari Menggambar</h3>
  <div class = "content-container">
    <div class = "content">
    <h3>Kontol</h3>
    </div>
  </div>
  <div class = "canva-container">
    <Canvas />
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Canvas from './components/Canvas.vue';

export default defineComponent({
  name: 'App',
  components: {
    Canvas,
  },
  setup() {
    onMounted(() => {
      console.log('App mounted');
    });
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>