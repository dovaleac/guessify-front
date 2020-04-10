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
      <b-row class="mt-auto">
        <b-col><button class="button" v-on:click="createRoom">Create</button></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

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
      lang: null,
      roomUuid: uuidv4()
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
            "uuid": roomResponse.data.number
          }))
          localStorage.setItem('lang', this.lang)
          this.$router.push(`/config?roomId=${roomId}`);
        });
      });
    }
  }
}
</script>

<style>
</style>
