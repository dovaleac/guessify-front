<template>
  <div class="form answerboard">
    <b-container class ="d-flex flex-column">
      <b-row class="header">
        <b-col cols="3">Player</b-col>
        <b-col cols="7">Guess</b-col>
      </b-row>
      <b-row v-for="answer in answerboard" :key="answer.id">
        <b-col cols="3">{{ answer.playerName }}</b-col>
        <b-col cols="7">{{ answer.answer }}</b-col>
        <b-col cols="1">√</b-col>
        <b-col cols="1">X</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Answerboard',
  props: {
    answerboard: Array
  }
}
</script>




