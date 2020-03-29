<template>
  <div class="form"> 
    <div class="horizontal-split">
      <label for="player-name">Name: </label>
      <input id="player-name" v-model="playerName" placeholder="Player name">
    </div>
    <div class="horizontal-split">
      <label for="lang">Language: </label>
      <select v-model="lang" id="lang">
        <option selected="selected">ES</option>
        <option>EN</option>
      </select>
    </div>
    <div class="horizontal-split">
      <label for="room-id">Room id: </label>
      <input id="room-id" v-model="roomNumber" placeholder="Type an id for the room">
    </div>
    <div class="horizontal-split">
      <label for="room-password">Password: </label>
      <input id="room-password" v-model="roomPassword" placeholder="Type a password for the room">
    </div>
    <div class="horizontal-split">
      <button class="button" v-on:click="createRoom">Create</button>
      <button class="button" v-on:click="joinRoom">Join</button>
    </div>
  </div>
</template>

<script>

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
      alert("create room: " + this.playerName + this.lang + this.roomNumber + this.roomPassword);
    },
    joinRoom() {
      alert("join room: " + this.playerName + this.lang + this.roomNumber + this.roomPassword);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
