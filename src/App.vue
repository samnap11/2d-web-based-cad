<template>
  <Poligon />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Poligon from './components/Poligon.vue';

export default defineComponent({
  name: 'App',
  components: {
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
