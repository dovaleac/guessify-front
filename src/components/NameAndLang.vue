<template>
  <div class="form"> 
    <div class="horizontal-split">
      <label for="player-name">Name: </label>
      <input id="player-name" v-model="playerName" placeholder="Player name">
    </div>
    <div class="horizontal-split">
      <label for="lang">Language: </label>
      <input id="lang" v-model="lang" placeholder="Player name">
    </div>
    <div class="horizontal-split">
      <label for="room-id">Room id: </label>
      <input id="room-id" v-model="roomNumber" placeholder="Type an id for the room">
    </div>
    <div class="horizontal-split">
      <label for="room-password">Password: </label>
      <input id="room-password" v-model="playerName" placeholder="Type a password for the room">
    </div>
    <div class="horizontal-split">
      <label for="player-name">Name: </label>
      <input id="player-name" v-model="playerName" placeholder="Player name">
    </div>
  </div>
</template>

<script>
export default {
  name: 'NameAndLang',
  props: {
    playerName: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
