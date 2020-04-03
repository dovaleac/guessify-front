<template>
  <div class="form">
    <b-container class ="d-flex flex-column">
      <b-row>
        <b-col><fileupload :target="target" action="PUT" v-on:finish="finishUpload" id="file"></fileupload></b-col>
      </b-row>
      <b-row class="mt-auto">
        <b-col></b-col>
        <b-col><button class="button" v-on:click="next" v-bind:class="{ inactive: loadNotFinished }">Next</button></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import FileUpload from 'vue-simple-upload/dist/FileUpload'
let questions = JSON.parse(localStorage.getItem('questions'));

if(!questions) {
  questions = []
}

export default {
  name: 'ConfigQuestions',
  props: {
  },
  data: function () {
    return {
      target: `http://localhost:8080/game/${localStorage.getItem("gameId")}/questions-file`,
      loadNotFinished: true
    }
  },
  components: {
    'fileupload': FileUpload
  },
methods: {
   
    finishUpload(e) {
      console.log(e.target.status)
      console.log(e.target.status === 200)
      if(e.target.status === 200) {
        this.loadNotFinished = false;
      }
    },

    next: function() {
      console.log("createGame")
    }

  }
}
</script>

<style>
</style>
