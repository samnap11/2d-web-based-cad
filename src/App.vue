<template>
  <div class="container">
    <h3>Mari Menggambar</h3>
    <div class="content-container">
      <input type="radio" id="garis" value="1" v-model="draw" />
      <label for="garis">Garis</label>
      <input type="radio" id="persegi" value="2" v-model="draw" />
      <label for="persegi">Persegi</label>
      <input type="radio" id="poligon" value="3" v-model="draw" />
      <label for="poligon">Poligon</label>
      <input type="radio" id="help" value="4" v-model="draw" />
      <label for="help">Help</label>
    </div>
    <div>
      <template v-if="draw === '1'">
        <Canvas />
      </template>
      <template v-else-if="draw === '2'">
        <Persegi />
      </template>
      <template v-else-if="draw === '3'">
        <Poligon />
      </template>
      <template v-else-if="draw === '4'">
        <h3>HELP</h3>
        <p>Pilih bangun yang Anda inginkan (Garis, Persegi, Poligon)</p>
        <br />
        <p>
          Scroll ke bawah dan pilih mode yang Anda inginkan (Geser, Rotate,
          Scale)
        </p>
        <br />
        <p>Sekian. Selamat mencoba!</p>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated, ref } from 'vue';
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
    const draw = ref('');
    onMounted(() => {
      console.log('App mounted');
    });
    onUpdated(() => {
      console.log(draw);
    });
    return { draw };
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
