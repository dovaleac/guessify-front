<template>
  <div class="form">
    <b-container class ="d-flex flex-column">
      <b-row>
        <b-col><label for="total-rounds">Total rounds: </label></b-col>
        <b-col><input class="small-textbox" id="total-rounds" v-model="totalRounds"></b-col>
      </b-row>
      <b-row>
        <b-col><label for="clues-per-question">Clues per question: </label></b-col>
        <b-col><input class="small-textbox" id="clues-per-question" v-model="CluesPerQuestion"></b-col>
      </b-row>
      <b-row>
        <b-col><label for="errors-allowed">Errors allowed: </label></b-col>
        <b-col><input class="small-textbox" id="errors-allowed" v-model="errorsAllowed"></b-col>
      </b-row>
      <b-row class="mt-auto">
        <b-col><button class="button" v-on:click="configScoring">Config scoring</button></b-col>
        <b-col><button class="button" v-on:click="loadQuestions">Load questions</button></b-col>
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
    totalRounds: String,
    lang: String,
    CluesPerQuestion: String,
    errorsAllowed: String
  },
  methods: {
    configScoring() {
      axios
      .post(`http://localhost:8080/room?number=${this.CluesPerQuestion}&password=${this.errorsAllowed}`)
      .then(roomResponse => {
        let roomId = roomResponse.data.roomId;
        axios.patch(`http://localhost:8080/room/${roomId}/master?name=${this.totalRounds}`)
        .then(masterPlayerResponse => {
          localStorage.player = masterPlayerResponse.data;
        });
      });

    },
    loadQuestions() {
      alert("join room: " + this.totalRounds + this.lang + this.CluesPerQuestion + this.errorsAllowed);
    }
  }
}
</script>

<style>
</style>
