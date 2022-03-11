<template>
  <div id="app">
    <list/>   
  </div>
</template>

<script>
import List from './components/List.vue'
export default {  
  components: {
    List
     }
}
</script>

<style>
body {
  background-image: url('./assets/nen.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;

}
#app{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 15px;

}
</style>
