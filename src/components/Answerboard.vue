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
        <b-col cols="1" v-if="isMaster">
          <button v-if=" answer.status === 'NOT_JUDGED' " class="button big-button" id="acceptAnswer" ref="acceptAnswer" v-on:click="acceptAnswer(answer.id)">√</button>
          <label v-else v-bind:class="{bold: answer.status === 'RIGHT'}">√</label>
          </b-col>
        <b-col cols="1" v-if="isMaster">
          <button v-if=" answer.status === 'NOT_JUDGED' " class="button big-button" id="rejectAnswer" ref="rejectAnswer" v-on:click="rejectAnswer(answer.id)">X</button>
          <label v-else v-bind:class="{bold: answer.status === 'WRONG'}">√</label>
          </b-col>

      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Answerboard',
  props: {
    answerboard: Array,
    isMaster: Boolean
  },
  methods: {
    acceptAnswer(a, b) {
      console.log(a)
      console.log(b)
    },
    rejectAnswer(a, b) {
      console.log(a)
      console.log(b)
    },
  }
}
</script>




