<template>
  <div class="form">
    <b-container class ="d-flex flex-column">
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
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
const _ = require('lodash')

  let room = JSON.parse(localStorage.getItem("room"))
  let gameId = localStorage.getItem("gameId")

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
    async getCurrentPlayers() {
      return await axios.get(`http://localhost:8080/room/${room.id}/players`)
    },
    updateStatus() {
      const self = this;   
      this.getCurrentPlayers().then(playersResponse => {
        localStorage.setItem("players", JSON.stringify(playersResponse.data))
        axios.get(`http://localhost:8080/game/${gameId}/dynamic-info`).then(response => {
          if(response.data.gameStatus != "CREATED") {
            this.$router.push('/game')
          }
        })
        self.players = self.getNamesOfContenders(playersResponse.data)
      })
    },
    pollPlayers () {       
      this.playersInterval = setInterval(() => this.updateStatus(), 3000)
    },
    getNamesOfContenders(allPlayers) {
      let contenders = _.filter(allPlayers, {'playerStatus': 'ACTIVE'})
      contenders = _.map(contenders, function (contender) {
        const trimmedContender = _.pick(contender, ['id', 'name'])
        return trimmedContender
      })
      return contenders
    },
    clearPlayersInterval() {
      if(this.playersInterval != null) {
        clearInterval(this.playersInterval)
      }
    },
    start() {
      this.clearPlayersInterval()
      axios.put(`http://localhost:8080/game/${gameId}/start?roomId=${room.id}`)
      .then(() => this.$router.push('/game'))
    }
  },
  beforeDestroy () {
    this.clearPlayersInterval()
  },
  created () {
    this.updateStatus()
    this.pollPlayers()
  }
}
</script>

<style>
</style>
