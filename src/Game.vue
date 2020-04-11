<template>
<div class="wholeScreen">
  <div class="form questions">
    <b-container class = "d-flex flex-column">
      <b-row class="header">
        <b-col>Number</b-col>
        <b-col class="text-left ml-3" cols="9">Clue</b-col> 
        <b-col>SOS!</b-col><!--Players requesting next clue -->
      </b-row>
      <b-row class="mt-1" v-for="(clue, index) in currentQuestion.clues" :key="clue.id">
        <b-col>{{index + 1}}</b-col>
        <b-col class="text-left ml-3" cols="9" v-bind:id="'clue' + index" v-bind:ref="'clue' + index" v-bind:class="{ 'hidden-clue': index>currentQuestion.currentClue }">{{ clue }}</b-col> 
        <b-col>{{ clueRequests[index] }}</b-col>
      </b-row>
      <b-row>
        <b-col id ="answer" ref="answer" class="answer text-center mt-5 hidden-clue" cols="12">{{ currentQuestion.answer }}</b-col> 
      </b-row>
      <b-row>
        <b-col id ="funfacts" ref="funfacts" class="funfacts text-center mt-3 hidden-clue" cols="12">{{ currentQuestion.funFacts }}</b-col> 
      </b-row>
      <b-row v-if="isMaster" class="mt-auto">
        <b-col><button class="button" id="revealClue" ref="revealClue" v-bind:class="{ inactive: isLastClue }" v-on:click="revealClue">Reveal clue</button></b-col>
        <b-col><button class="button" id="revealAnswer" ref="revealAnswer" v-bind:class="{ inactive: isNotLastClue }" v-on:click="revealAnswer">Reveal answer</button></b-col>
        <b-col><button class="button inactive" id="nextQuestion" ref="nextQuestion" v-on:click="nextQuestion">Next question</button></b-col>
      </b-row>
      <b-row v-else class="mt-auto">
        <b-col><input id="guess-text-box" ref="guess-text-box" v-model="guess"></b-col>
        <b-col><button class="button" id="makeGuess" ref="makeGuess" v-bind:class="{ inactive: cantGuessAnymore }" v-on:click="makeGuess">Make a guess!</button></b-col>
      </b-row>
    </b-container>
  </div>
  <div class="scoreboard">
    <scoreboard v-bind:scoreboard="scoreboard"/>
  </div>
  <div class="answerboard">
    <answerboard v-bind:answerboard="answerboard" v-bind:isMaster="isMaster"/>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import Scoreboard from './components/Scoreboard'
import Answerboard from './components/Answerboard'
const _ = require('lodash')

  //let room = JSON.parse(localStorage.getItem("room"))
  let players = JSON.parse(localStorage.getItem("players"))
  let player = JSON.parse(localStorage.getItem("player"))
  //let defaultLang = localStorage.getItem("lang")

export default {
  name: 'Game',
  data() {
    let storedGuessTries = localStorage.getItem("guessTries")
    if (storedGuessTries) {
      storedGuessTries = parseInt(storedGuessTries)
    } else {
      storedGuessTries = 0
    }
    return {
      scoreboard: this.initialScoreboard(players),
      isMaster: player.playerRole === 'MASTER',
      currentQuestion: {},
      gameStatus: 'STARTED',
      allQuestionsInGame: [],
      basicClueRequests: {},
      clueRequests: {},
      gameId: _.get(this, '$route.query.gameId'),
      questions: JSON.parse(localStorage.getItem("questions")),
      gameConfig: JSON.parse(localStorage.getItem("gameConfig")),
      guess: "",
      guessTries: storedGuessTries,
      cantGuessAnymore: null,
      answerboard: [],
      answersInterval: null
    }
  },
  watch: {
    guessTries: function (newGuessTries) {
      this.cantGuessAnymore = newGuessTries > this.gameConfig.errorsAllowedPerQuestion
      localStorage.setItem("guessTries", newGuessTries)
    }
  },
  computed: {
    isNotLastClue: function() {
      if(this.currentQuestion && this.gameConfig) {
        console.log(this.currentQuestion.currentClue)
        console.log(this.gameConfig.cluesPerQuestion)
        return this.currentQuestion.currentClue < this.gameConfig.cluesPerQuestion -1
      } else {
        return false
      }
    },
    isLastClue: function() {
      return !this.isNotLastClue
    }
  },
  components: {
    'scoreboard': Scoreboard,
    'answerboard': Answerboard
  },
  methods: {
    getStaticInfo() {
      return axios.get(`http://localhost:8080/game/${this.gameId}/static-info`)
    },
    getDynamicInfo() {
      return axios.get(`http://localhost:8080/game/${this.gameId}/dynamic-info`)
    },
    getAllClueRequests(questionInGameId) {
      return axios.get(`http://localhost:8080/question/${questionInGameId}/clues`)
    },
    getAllAnswers(questionInGameId) {
      return axios.get(`http://localhost:8080/question/${questionInGameId}/answers`)
    },
    putRevealClue(questionInGameId, nextClue) {
      return axios.put(`http://localhost:8080/question/${questionInGameId}/clue?nextClue=${nextClue}`)
    },
    putMakeGuess(questionInGameId, currentClue, playerId, answer) {
      return axios.put(`http://localhost:8080/question/${questionInGameId}/answer?playerId=${playerId}&currentClue=${currentClue}&answer=${answer}`)
    },
    putRevealAnswer(questionInGameId, nextQuestionInGameId) {
      if(nextQuestionInGameId) {
        return axios.put(`http://localhost:8080/question/${questionInGameId}/reveal?nextQuestionInGameId=${nextQuestionInGameId}&gameId=${this.gameId}`)
      } else {
        return axios.put(`http://localhost:8080/question/${questionInGameId}/reveal?gameId=${this.gameId}`)
      }
    },
    processDynamicInfo() {
/*       _.forEach(this.questions, function(question) {
        if (!_.has(question, 'currentClue')) {
          question.currentClue = 0
        }
      }) */
      this.getDynamicInfo().then(dynamicInfo => {
        this.gameStatus = dynamicInfo.data.gameStatus
        this.allQuestionsInGame = dynamicInfo.data.questionsInGame
        const self = this
        _.forEach(this.allQuestionsInGame, function(questionInGame) {
          let currentQuestion = _.find(self.questions, function(o) { return o.id === questionInGame.questionId })
          currentQuestion.currentClue = questionInGame.currentClue
          currentQuestion.questionInGameId = questionInGame.id
          //currentQuestion.funfacts = questionInGame.id
        })
        const currentQuestionInGame = _.find(this.allQuestionsInGame, function(o) { return o.status === 'ACTIVE' })
        let currentQuestion = _.find(this.questions, function(o) { return o.id === currentQuestionInGame.questionId })
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
          this.focusOnGuessTextBox()          
        })
        this.currentQuestion = currentQuestion
        this.answersInterval = setInterval(() => this.updateAnswers(), 3000)
        this.updateAnswers()
      })
    },
    async revealClue() {
      this.putRevealClue(this.currentQuestion.questionInGameId, this.currentQuestion.currentClue + 1).then(() => {
        console.log(this)
        this.currentQuestion.currentClue = this.currentQuestion.currentClue + 1
        this.$refs['clue' + this.currentQuestion.currentClue][0].classList.remove("hidden-clue")
        console.log(this.currentQuestion.currentClue)
        if(this.currentQuestion.currentClue + 1 == this.gameConfig.cluesPerQuestion) {
          this.$refs['revealAnswer'].classList.remove("inactive")
          this.$refs['revealClue'].classList.add("inactive")
        }
      })
    },
    revealAnswer() {
      this.$refs['answer'].classList.remove('hidden-clue')
      this.$refs['funfacts'].classList.remove('hidden-clue')
      this.$refs['nextQuestion'].classList.remove('inactive')
      this.$refs['revealAnswer'].classList.add("inactive")
    },
    async nextQuestion() {
      const self = this
      const keysToHide = _.filter(_.keys(this.$refs), function(ref) {
        return ref.startsWith("clue") && ref != "clue0"
      })
      const elementsToHide = _.map(keysToHide, function(key) {
        console.log(key)
        console.log(self.$refs[key])
        return self.$refs[key]
      })
      _.forEach(elementsToHide, function(clueDiv) {
        clueDiv[0].classList.add('hidden-clue')
      })
      this.$refs['answer'].classList.add('hidden-clue')
      this.$refs['funfacts'].classList.add('hidden-clue')
      this.$refs['nextQuestion'].classList.add("inactive")
      this.$refs['revealClue'].classList.remove("inactive")

      const nextQuestion = this.calculateNextQuestionInGame()
      this.putRevealAnswer(this.currentQuestion.questionInGameId, nextQuestion.questionInGameId).then(() => {
        this.currentQuestion = nextQuestion
      })
    },
    calculateNextQuestionInGame() {
      const currentQuestionIndex = _.findIndex(this.questions, {'id': this.currentQuestion.id})
      console.log(currentQuestionIndex)
      if (currentQuestionIndex + 1 == _.size(this.questions)) {
        return undefined
      } else {
        return this.questions[currentQuestionIndex + 1]
      }
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
    },
    focusOnGuessTextBox() {
      if (!this.isMaster) {
        this.$refs['guess-text-box'].focus()
      }
    },
    makeGuess() {
      //questionInGameId, currentClue, playerId, answer
      
      this.putMakeGuess(this.currentQuestion.questionInGameId, this.currentQuestion.currentClue, player.id, this.guess).then(() => {
        this.guessTries++
        this.guess = ""
        this.focusOnGuessTextBox()
      })
    },
    updateAnswers() {
      this.getAllAnswers(this.currentQuestion.questionInGameId).then(answersResponse => {
        this.answerboard = _.map(answersResponse.data, function(answer){
          answer.playerName =_.find(players, {'id': answer.playerId}).name
          return answer
        })
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.answersInterval)
  },
  created () {
    this.game = _.get(this, '$route.query.gameId')
    this.questions = JSON.parse(localStorage.getItem("questions"))
    this.gameConfig = JSON.parse(localStorage.getItem("gameConfig"))
    if(!this.questions || !this.gameConfig) {
      this.getStaticInfo().then(staticInfo => {
        this.questions = staticInfo.data.questions
        this.gameConfig = staticInfo.data.gameConfiguration
        this.processDynamicInfo()
        this.basicClueRequests = this.calculateBasicClueRequests(this.gameConfig.cluesPerQuestion)
        this.cantGuessAnymore = this.guessTries > this.gameConfig.errorsAllowedPerQuestion
      })
    } else {
      this.processDynamicInfo()
      this.basicClueRequests = this.calculateBasicClueRequests(this.gameConfig.cluesPerQuestion)
      this.cantGuessAnymore = this.guessTries > this.gameConfig.errorsAllowedPerQuestion
    }
  }
}
</script>

<style>
</style>
