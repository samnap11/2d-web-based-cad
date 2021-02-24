<template>
<div class = "container">
<h3>Mari Menggambar</h3>
  <div class = "content-container">
    <input type="radio" id="garis" value="1" v-model="draw">
    <label for="garis">Garis</label>
    <input type="radio" id="persegi" value="2" v-model="draw">
    <label for="persegi">Persegi</label>
    <input type="radio" id="poligon" value="3" v-model="draw">
    <label for="poligon">Poligon</label>
  </div>
  <div>
    <template v-if = "draw === '1'">
      <h3>Halo Garis</h3>
    </template>
    <template v-else-if = "draw === '2'">
      <Persegi />
    </template>
    <template v-else-if = "draw === '3'">
      <h3>Halo Poligon</h3>
    </template>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, onMounted,onUpdated,ref } from 'vue';
import Persegi from './components/Persegi.vue';
import VueRouter from 'vue-router';


export default defineComponent({
  name: 'App',
  components:{Persegi},
  setup() {
    const draw = ref('');
    onMounted(() => {
      console.log('App mounted');
    });
    onUpdated(()=>{
      console.log(draw);
    });
    return {draw};
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