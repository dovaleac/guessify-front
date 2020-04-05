<template>
<div class="wholeScreen">
  <div class="form questions">
    <b-container class = "d-flex flex-column">
      <!-- <b-row class="header">
        <b-col><label>Players: </label></b-col>
      </b-row> -->
      <b-row v-for="(clue, index) in currentQuestion.clues" :key="index">
        <b-col>Clue {{index + 1}}:</b-col><b-col>{{ index>currentQuestion.currentClue?'':clue }}</b-col> 
      </b-row>
      <b-row v-if="isMaster" class="mt-auto">
        <b-col></b-col>
        <b-col><button class="button" v-on:click="revealClue">Reveal clue</button></b-col>
      </b-row>
    </b-container>
  </div>
  <div class="scoreboard">
    <scoreboard v-bind:scoreboard="scoreboard"/>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import Scoreboard from './components/Scoreboard'
const _ = require('lodash')

  let questions = JSON.parse(localStorage.getItem("questions"))
  let gameConfig = JSON.parse(localStorage.getItem("gameConfig"))
  //let room = JSON.parse(localStorage.getItem("room"))
  let players = JSON.parse(localStorage.getItem("players"))
  let player = JSON.parse(localStorage.getItem("player"))
  let gameId = localStorage.getItem("gameId")
  //let defaultLang = localStorage.getItem("lang")

export default {
  name: 'Game',
  data() {
    return {
      scoreboard: this.initialScoreboard(players),
      isMaster: player.playerRole === 'MASTER',
      currentQuestion: null,
      gameStatus: 'STARTED',
      allQuestionsInGame: null
    }
  },
  components: {
    'scoreboard': Scoreboard
  },
  methods: {
    getStaticInfo() {
      return axios.get(`http://localhost:8080/game/${gameId}/static-info`)
    },
    getDynamicInfo() {
      return axios.get(`http://localhost:8080/game/${gameId}/dynamic-info`)
    },
    putRevealClue(questionInGameId, nextClue) {
      return axios.put(`http://localhost:8080/question/${questionInGameId}/clue?nextClue=${nextClue}`)
    },
    processDynamicInfo() {
      this.getDynamicInfo().then(dynamicInfo => {
        this.gameStatus = dynamicInfo.data.gameStatus
        this.allQuestionsInGame = dynamicInfo.data.questionsInGame
        const currentQuestionInGame = _.find(this.allQuestionsInGame, function(o) { return o.status === 'ACTIVE' })
        let currentQuestion = _.find(questions, function(o) { return o.id === currentQuestionInGame.questionId })
        currentQuestion.currentClue = currentQuestionInGame.currentClue
        currentQuestion.questionInGameId = currentQuestionInGame.id
        this.currentQuestion = currentQuestion
      })
    },
    async revealClue() {
      await this.putRevealClue(this.currentQuestion.questionInGameId, ++this.currentQuestion.currentClue)
    },
    initialScoreboard(playersNames) {
      return _.map(playersNames, function(player) {
        return {
        "id": player.id,
        "name": player.name,
        "points": 0,
        "guessed": 0
        }
      })
    }
  },
  beforeDestroy () {
    
  },
  created () {
    if(!questions || !gameConfig) {
      this.getStaticInfo().then(staticInfo => {
        questions = staticInfo.data.questions
        gameConfig = staticInfo.data.gameConfiguration
        this.processDynamicInfo()
      })
    } else {
      this.processDynamicInfo()
    }
  }
}
</script>

<style>
</style>
