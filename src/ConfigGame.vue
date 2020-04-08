<template>
  <div class="form">
    <b-container class ="d-flex flex-column">
      <b-row>
        <b-col><label for="total-rounds">Total rounds: </label></b-col>
        <b-col><input class="small-textbox" id="total-rounds" v-model="totalRounds"></b-col>
      </b-row>
      <b-row>
        <b-col><label for="clues-per-question">Clues per question: </label></b-col>
        <b-col><input class="small-textbox" id="clues-per-question" v-model="cluesPerQuestion"></b-col>
      </b-row>
      <b-row>
        <b-col><label for="errors-allowed">Errors allowed: </label></b-col>
        <b-col><input class="small-textbox" id="errors-allowed" v-model="errorsAllowed"></b-col>
      </b-row>
      <b-row class="mt-auto">
        <b-col><!-- <button class="button" v-on:click="configScoring">Config<br>scoring</button> --></b-col>
        <b-col><button class="button" v-on:click="loadQuestions">Load<br>questions</button></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

let defaultProperties = JSON.parse(localStorage.getItem('gameConfig'));

if(!defaultProperties) {
  defaultProperties = {
    totalRounds: 8,
    cluesPerQuestion: 5,
    errorsAllowed: 1
  }
}

export default {
  name: 'ConfigGame',
  props: {
    totalRounds: {
      type: Number,
      default: defaultProperties.totalRounds
    },
    cluesPerQuestion:  {
      type: Number,
      default: defaultProperties.cluesPerQuestion
      },
    errorsAllowed:  {
      type: Number,
      default: defaultProperties.errorsAllowed
      }
  },
  methods: {
    configScoring() {
      localStorage.setItem('gameConfig', JSON.stringify({
        "totalRounds": this.totalRounds,
        "cluesPerQuestion": this.cluesPerQuestion,
        "errorsAllowed": this.errorsAllowed        
      }));
      this.$router.push('/scoring');
    },
    loadQuestions() {
      localStorage.setItem('gameConfig', JSON.stringify({
        "totalRounds": this.totalRounds,
        "cluesPerQuestion": this.cluesPerQuestion,
        "errorsAllowed": this.errorsAllowed        
      }));

      const roomId = this.$route.query.roomId
      const playerId = JSON.parse(localStorage.getItem("player")).id
      const lang = localStorage.getItem("lang").toLowerCase()
      axios.post(`http://localhost:8080/game?roomId=${roomId}&masterId=${playerId}&lang=${lang}`, {
        "totalRounds": this.totalRounds,
        "cluesPerQuestion": this.cluesPerQuestion,
        "errorsAllowed": this.errorsAllowed
      }).then(gameResponse => { 
        localStorage.setItem("gameId", gameResponse.data.gameId)
        this.$router.push(`/questions?roomId=${roomId}&gameId=${gameResponse.data.gameId}`);
      });

    }
  }
}
</script>

<style>
</style>
