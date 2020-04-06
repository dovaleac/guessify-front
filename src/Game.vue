<template>
<div class="wholeScreen">
  <div class="form questions">
    <b-container class = "d-flex flex-column">
      <b-row class="header">
        <b-col>Number</b-col>
        <b-col class="text-left ml-3" cols="9">Clue</b-col> 
        <b-col>SOS!</b-col><!--Players requesting next clue -->
      </b-row>
      <b-row v-for="(clue, index) in currentQuestion.clues" :key="index">
        <b-col>{{index + 1}}</b-col>
        <b-col class="text-left ml-3" cols="9">{{ index>currentQuestion.currentClue?'':clue }}</b-col> 
        <b-col>{{ clueRequests[index] }}</b-col>
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
      currentQuestion: {},
      gameStatus: 'STARTED',
      allQuestionsInGame: [],
      basicClueRequests: {},
      clueRequests: {}
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
    getAllClueRequests(questionInGameId) {
      return axios.get(`http://localhost:8080/question/${questionInGameId}/clues`)
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
        let clueRequestsMap = this.basicClueRequests
        this.getAllClueRequests(currentQuestionInGame.id)
          .then(clueRequests => {
            _.forEach(
              _.mapValues(
                _.groupBy(clueRequests.data, 'currentClue'), function(requestsOfClue) {
                  return _.uniqBy(requestsOfClue, 'playerId').length
              }), function(value, clue){
                clueRequestsMap[clue] = value
              })
          this.clueRequests = clueRequestsMap          
        })
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
    },
    calculateBasicClueRequests(cluesPerQuestion) {
      let result = {}
      _.range(cluesPerQuestion).forEach(element => {
        result[element] = 0
      });
      return result
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
        this.basicClueRequests = this.calculateBasicClueRequests(gameConfig.cluesPerQuestion)
      })
    } else {
      this.processDynamicInfo()
      this.basicClueRequests = this.calculateBasicClueRequests(gameConfig.cluesPerQuestion)
    }
  }
}
</script>

<style>
</style>
