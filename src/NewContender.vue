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
      <!-- <b-row>
        <b-col><label for="room-password">Password: </label></b-col>
        <b-col><input id="room-password" v-model="roomPassword" placeholder="Type a password for the room"></b-col>
      </b-row> -->
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
  },
  data() {
    return {
      playerName: null,
      lang: null
    }
  },
  methods: {
    createRoom() {
      axios
      .post(`http://localhost:8080/room?password=${this.roomPassword}`)
      .then(roomResponse => {
        let roomId = roomResponse.data.roomId;
        axios.patch(`http://localhost:8080/room/${roomId}/master?name=${this.playerName}`)
        .then(masterPlayerResponse => {
          localStorage.setItem('player', JSON.stringify(masterPlayerResponse.data));
          localStorage.setItem('room', JSON.stringify({
            "id": roomId,
            "number": roomResponse.data.number,
            "password": this.roomPassword
          }))
          localStorage.setItem('lang', this.lang)
          this.$router.push(`/config?roomId=${roomId}`);
        });
      });

    },
    joinRoom() {
      alert("join room: " + this.playerName + this.lang + this.roomNumber + this.roomPassword);
    }
  }
}
</script>

<style>
</style>
