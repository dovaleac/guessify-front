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
      roomUuid: null
    }
  },
  methods: {
    createRoom() {
      axios
      .post(`http://localhost:8080/room`)
      .then(roomResponse => {
        let roomId = roomResponse.data.roomId;
        axios.patch(`http://localhost:8080/room/${roomId}/master?name=${this.playerName}`)
        .then(masterPlayerResponse => {
          localStorage.setItem('player', JSON.stringify(masterPlayerResponse.data));
          localStorage.setItem('room', JSON.stringify({
            "id": roomId,
            "number": roomResponse.data.number
          }))
          localStorage.setItem('lang', this.lang)
          this.$router.push(`/config?roomId=${roomId}`);
        });
      });

    },
    joinRoom() {
      alert("join room: " + this.playerName + this.lang + this.roomNumber);
    }
  }
}
</script>

<style>
</style>
