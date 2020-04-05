<template>
  <div class="form">
    <b-container class ="d-flex flex-column">
      <b-row class="header">
        <b-col><label>Players: </label></b-col>
      </b-row>
      <b-row v-for="player in players" :key="player.id">
        <b-col>{{ player.name }}</b-col> 
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
const _ = require('lodash')

  let questions = JSON.parse(localStorage.getItem("questions"))
  let gameConfig = JSON.parse(localStorage.getItem("gameConfig"))
  let room = JSON.parse(localStorage.getItem("room"))
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
      playersInterval: null,
      players: []
    }
  },
  computed: {
  },
  methods: {
    async getStaticInfo() {
      return await axios.get(`http://localhost:8080/game/${gameId}/static-info`)
    },
    async getCurrentPlayers() {
      return await axios.get(`http://localhost:8080/room/${room.id}/players`)
    },
    pollPlayers () {
      const self = this;          
      this.playersInterval = setInterval(() => {
        this.getCurrentPlayers().then(playersResponse => {
          localStorage.setItem("players", playersResponse.data)
          self.players = self.getNamesOfContenders(playersResponse.data)
        })
      }, 3000)
    },
    getNamesOfContenders(allPlayers) {
      let contenders = _.filter(allPlayers, {'playerStatus': 'ACTIVE'})
      contenders = _.map(contenders, function (contender) {
        console.log(contender)
        const trimmedContender = _.pick(contender, ['id', 'name'])
        console.log(trimmedContender)
        return trimmedContender
      })
      return contenders
    }
  },
  beforeDestroy () {
    clearInterval(this.playersInterval)
  },
  created () {
    this.pollPlayers()
  }
}
</script>

<style>
</style>
