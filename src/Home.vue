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
      <b-row>
        <b-col><label for="room-id">Room id: </label></b-col>
        <b-col><input id="room-id" v-model="roomNumber" placeholder="Type an id for the room"></b-col>
      </b-row>
      <b-row>
        <b-col><label for="room-password">Password: </label></b-col>
        <b-col><input id="room-password" v-model="roomPassword" placeholder="Type a password for the room"></b-col>
      </b-row>
      <b-row class="mt-auto">
        <b-col><button class="button" v-on:click="createRoom">Create</button></b-col>
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
  },
  props: {
    playerName: String,
    lang: String,
    roomNumber: String,
    roomPassword: String
  },
  methods: {
    createRoom() {
      console.log(this.$route);
      axios
      .post(`http://localhost:8080/room?number=${this.roomNumber}&password=${this.roomPassword}`)
      .then(roomResponse => {
        let roomId = roomResponse.data.roomId;
        axios.patch(`http://localhost:8080/room/${roomId}/master?name=${this.playerName}`)
        .then(masterPlayerResponse => {
          localStorage.player = masterPlayerResponse.data;
          this.$router.push('/config');
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
