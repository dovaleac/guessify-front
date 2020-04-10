<template>
  <div class="form">
    <b-container class ="d-flex flex-column">
      <b-row>
        <b-col><label for="player-name">Name: </label></b-col>
        <b-col><input id="player-name" v-model="playerName" placeholder="Player name"></b-col>
      </b-row>
      <b-row>
        <b-col><label for="lang">Language: </label></b-col>
        <b-col><select v-model="lang" id="lang">
          <option selected="selected">ES</option>
          <option>EN</option>
        </select></b-col>
      </b-row>
      <b-row v-bind:class="{ disappeared: haveToHideIdField }">
        <b-col><label for="room-password">Room ID: </label></b-col>
        <b-col><input id="room-password" v-model="roomUuid"></b-col>
      </b-row>
      <b-row class="mt-auto">
        <b-col><button class="button" v-on:click="joinRoom">Join</button></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  created() {
    this.lang = "ES"
    const player = JSON.parse(localStorage.getItem('player'))
    if(player) {
      this.playerName = player.name
    }
    const roomIdFromQuery = this.$route.query.roomId
    if(roomIdFromQuery) {
      this.haveToHideIdField = true
      this.roomUuid = roomIdFromQuery
    } else {
      this.haveToHideIdField = false
    }

  },
  data() {
    return {
      playerName: null,
      lang: null,
      haveToHideIdField: true,
      roomUuid: null,
      gameInterval: null,
      roomId: null
    }
  },
  methods: {
    joinRoom() {
      axios
      .get(`http://localhost:8080/room?number=${this.roomUuid}`)
      .then(roomResponse => {
        this.roomId = roomResponse.data.roomId;
        localStorage.setItem('room', JSON.stringify({
            "id": this.roomId,
            "number": roomResponse.data.number
          }))
        localStorage.setItem('lang', this.lang)
        axios
        .get(`http://localhost:8080/room/game?number=${this.roomUuid}`)
        .then(gameResponse => {
          axios.patch(`http://localhost:8080/room/${this.roomId}/player?name=${this.playerName}`)
          .then(playerResponse => {
            localStorage.setItem('player', JSON.stringify(playerResponse.data));
            this.$router.push(`/before-start?roomId=${this.roomId}&gameId=${gameResponse.data.gameId}`);
          })
          localStorage.setItem('gameId', JSON.stringify(gameResponse.data.gameId));
        })
        .catch(() => {
          this.pollGame()
        })
      });

    },
    clearGameInterval() {
      if(this.gameInterval != null) {
        clearInterval(this.gameInterval)
      }
    },
    pollGame () {       
      this.gameInterval = setInterval(() => this.updateStatusForGame(), 3000)
    },
    updateStatusForGame() {
      const self = this
      axios
      .get(`http://localhost:8080/room/game?number=${this.roomUuid}`)
      .then(gameResponse => {
        self.clearGameInterval()
        axios.patch(`http://localhost:8080/room/${self.roomId}/player?name=${self.playerName}`)
        .then(masterPlayerResponse => {
          localStorage.setItem('player', JSON.stringify(masterPlayerResponse.data));
            this.$router.push(`/before-start?roomId=${self.roomId}&gameId=${gameResponse.data.gameId}`);
          })
          localStorage.setItem('gameId', JSON.stringify(gameResponse.data.gameId));
      })
    }
  }
}
</script>

<style>
</style>
