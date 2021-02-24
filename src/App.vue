<template>
  <div class="container">
    <h3>Mari Menggambar</h3>
    <div class="content-container">
      <div class="content">
        <h3></h3>
      </div>
    </div>
    <div class="canva-container">
      <Canvas />
      <Persegi />
      <Poligon />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Persegi from './components/Persegi.vue';
import Canvas from './components/Canvas.vue';
import Poligon from './components/Poligon.vue';

export default defineComponent({
  name: 'App',
  components: {
    Persegi,
    Canvas,
    Poligon,
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
