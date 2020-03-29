<template>
  <div id="app">
      
         <router-view/>
    
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: royalblue;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.form {
  background-color: aliceblue;
  width: 50vw;
  margin-left: 50vw;
  transform: translateX(-50%) translateY(-50%);
  height: 50vh;
  margin-top: 50vh;
  font-size: 1.5em;
}
.form .container{
  padding-top: 5%;
  padding-bottom: 5%;
}
.form .row {
  padding-bottom: 2vh;
}
.form label {
  float: left;
  margin-left: 20%;
}
.form select, input, button {
  width: 70%;
}

</style>