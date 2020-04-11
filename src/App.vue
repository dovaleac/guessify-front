<template>
  <div id="app">
    <nav class="header"><div class="title" v-on:click="home">GUESSIFY</div></nav>
    <router-view/>
    <div class="big-copy-link" v-bind:class="{disappeared: dontShowCopyLinkInRoute}" v-on:click="copyLink">Copy link to room</div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
 
Vue.use(VueClipboard)
export default {
  name: 'App',
  data() {
    return {
      dontShowCopyLinkInRoute: this.calculateLinkShowing()
    }
  },
  watch:{
    $route () {
      this.dontShowCopyLinkInRoute = this.calculateLinkShowing()
    }
  },
  methods: {
    home() {
      localStorage.removeItem('gameId')
      localStorage.removeItem('questions')
      localStorage.removeItem('room')
      localStorage.removeItem('players')
      localStorage.removeItem('player')
      localStorage.removeItem('gameConfig')
      localStorage.removeItem('lang')
      this.$router.push('/')
    },
    calculateLinkShowing() {
      return ['home', 'newRoom', 'newContender', 'game'].includes(this.$route.name)
    },
    async copyLink() {
      const roomUuid = JSON.parse(localStorage.getItem("room")).uuid
      const joinRoomUrl = "http://localhost:8081/#/newContender?roomId=" + roomUuid
      await this.$copyText(joinRoomUrl)
    }
  }
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

.disappeared {
  display: none !important;
}

.big-copy-link {
  background-color: royalblue;
  height: 10vh;
  width: 34vw;
  position: fixed;
  right: 33vw;
  bottom: 5vw;
  left: 33vw;
  z-index: 100;
  color: aliceblue;
  font-size: 2.5em;
  font-weight: bold;
  line-height: 10vh;
  border: 0.2vw solid royalblue;
  cursor: pointer;
}

.big-copy-link:hover {
    background-color: rgb(207, 219, 255);
  color: rgb(44, 88, 223);
}

nav.header {
  background-color: royalblue;
  height: calc(5vh + 0.4vw);
  width: 100vw;
  position: fixed;
  right: 0;
  top:0;
  left:0;
  z-index: 100;
  border-bottom: 0.4vw solid aliceblue;
  color: aliceblue;
}

nav.header .title {
  font-weight: bold;
  line-height: 5vh;
  letter-spacing: 9px;
  font-size: 1.8em;
  cursor: pointer;
  width: 16vw;
  float: right;
  margin-right: 42vw;
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
  height: calc(95vh - 0.4vw);
  margin-top: calc(5vh + 0.4vw);
}

.form.questions label {
  text-align: left;
}

.form.questions .container {
  padding-top: 0;
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
.answerboard .form {
  font-size: 1.2em;
  width: 30vw;
  height: 50vh;
  transform: none;
  margin-top: 0;
  position: fixed;
  bottom: 0;
  right: 0;
}

.form .container {
  padding-top: 5%;
  padding-bottom: 5%;
  height: 100%;
}

.form.scoreboard {
  margin-top: calc(5vh + 0.4vw);
}

.form.scoreboard .container{
  padding-top: 0;
}

.form.answerboard .container{
  padding-top: 0;
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

.header {
  font-weight: bold;
  background-color: royalblue;
  color: aliceblue;
}
.header div {
  vertical-align: middle;
}

.button {
  border: none;
  background-color: royalblue;
  color: aliceblue;
  font-weight: bold;
} 
.button.inactive {
  background-color: rgb(207, 219, 255);
  color: aliceblue;
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

.hidden-clue {
  opacity: 0;
  user-select: none;
}

.answer {
  font-size: 2em;
  font-weight: bold;
}

.button.big-button {
  min-width: 25px;
}
</style>