<template>
<div class="wholeScreen">
  <div class="form questions">
    <!-- <b-container class ="d-flex flex-column">
      <b-row class="header">
        <b-col><label>Players: </label></b-col>
      </b-row>
      <b-row v-for="player in players" :key="player.id">
        <b-col>{{ player.name }}</b-col> 
      </b-row>
      <b-row class="mt-auto">
        <b-col></b-col>
        <b-col><button class="button" v-on:click="start">Start game</button></b-col>
      </b-row>
    </b-container> -->
  </div>
  <div class="scoreboard">
    <scoreboard v-bind:scoreboard="scoreboard"/>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import Scoreboard from './components/Scoreboard'
const _ = require('lodash')

  let questions = JSON.parse(localStorage.getItem("questions"))
  let gameConfig = JSON.parse(localStorage.getItem("gameConfig"))
  //let room = JSON.parse(localStorage.getItem("room"))
  let players = JSON.parse(localStorage.getItem("players"))
  //let defaultPlayer = JSON.parse(localStorage.getItem("player"))
  let gameId = localStorage.getItem("gameId")
  //let defaultLang = localStorage.getItem("lang")

  if(!questions || !gameConfig) {
    const staticInfo = this.getStaticInfo()
    questions = staticInfo.data.questions
    gameConfig = staticInfo.data.gameConfiguration
  }

export default {
  name: 'Game',
  data() {
    return {
      scoreboard: this.initialScoreboard(players)
    }
  },
  components: {
    'scoreboard': Scoreboard
  },
  methods: {
    async getStaticInfo() {
      return await axios.get(`http://localhost:8080/game/${gameId}/static-info`)
    },
    initialScoreboard(playersNames) {
      return _.map(playersNames, function(player) {
        return {
        "id": player.id,
        "name": player.name,
        "points": 0,
        "guessed": 0
        }
      })
    }
  },
  beforeDestroy () {
    
  },
  created () {
    
  }
}
</script>

<style>
</style>
