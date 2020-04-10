<template>
  <div class="form">
    <b-container class ="d-flex flex-column">
      <b-row class="header">
        <b-col><label>Players: </label></b-col>
      </b-row>
      <b-row v-for="player in players" :key="player.id">
        <b-col>{{ player.name }}</b-col> 
      </b-row>
      <b-row v-if="isMaster" class="mt-auto">
        <b-col></b-col>
        <b-col><button class="button" v-on:click="start">Start game</button></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
const _ = require('lodash')

let player = JSON.parse(localStorage.getItem("player"))

export default {
  name: 'Game',
  data() {
    return {
      playersInterval: null,
      players: [],
      isMaster: player.playerRole === 'MASTER',
      gameId: _.get(this, '$route.query.gameId')
    }
  },
  computed: {
  },
  methods: {
    async getCurrentPlayers() {
      return await axios.get(`http://localhost:8080/room/${this.$route.query.roomId}/players`)
    },
    updateStatus() {
      const self = this;   
      this.getCurrentPlayers().then(playersResponse => {
        localStorage.setItem("players", JSON.stringify(playersResponse.data))
        axios.get(`http://localhost:8080/game/${this.gameId}/dynamic-info`).then(response => {
          if(response.data.gameStatus != "CREATED") {
            this.$router.push(`/game?roomId=${this.$route.query.roomId}&gameId=${this.gameId}`)
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
      axios.put(`http://localhost:8080/game/${this.gameId}/start?roomId=${this.$route.query.roomId}`)
      .then(() => this.$router.push(`/game?roomId=${this.$route.query.roomId}&gameId=${this.gameId}`))
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
