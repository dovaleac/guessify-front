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
  background-image: url('./assets/brain.svg');
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  background-size: 8vw;
  left: 0;
  background-position-y: 45%;
}
.form {
  background-color: aliceblue;
  width: 50vw;
  margin-left: 50vw;
  transform: translateX(-50%) translateY(-50%);
  height: 50vh;
  margin-top: 50vh;
  font-size: 1.5em;
  color: royalblue;
  border: 0.2vw solid royalblue;
}
.form.questions {
  width: 70vw;
  margin-left: 0;
  transform: none;
  height: 75vh;
  margin-top: 0;
}

.scoreboard .form {
  font-size: 1.2em;
  width: 30vw;
  height: 50vh;
  transform: none;
  margin-top: 0;
  position: fixed;
  top: 0;
  right: 0;
}

.form .container{
  padding-top: 5%;
  padding-bottom: 5%;
  height: 100%;
}

.form .row {
  padding-bottom: 2vh;
}

.form label {
  float: left;
  margin-left: 20%;
}

.form select, input, .button {
  width: 70%;
}

.form input.small-textbox {
  width: 40px;
  text-align: center;
}

.form input {
  border-color: royalblue;
}

.button {
  border: none;
  background-color: royalblue;
  color: aliceblue;
  font-weight: bold;
} 
.button.inactive {
  background-color: rgb(207, 219, 255);
  color: rgb(44, 88, 223);
  pointer-events: none;
} 

.button:hover {
  background-color: rgb(207, 219, 255);
  color: rgb(44, 88, 223);
}

.inputfile {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}

.inputfile + label {
	cursor: pointer;
}

</style>