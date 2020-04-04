<template>
  <div class="form">
    <b-container class ="d-flex flex-column">
      <b-row class="mt-auto">
        <b-col><button class="button" v-on:click="download">Download template</button></b-col>
        <b-col>
          <fileupload class="inputfile" :target="target" action="PUT" v-on:finish="finishUpload" id="file"></fileupload>
          <label class="button" for="file">Choose a file</label>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import FileUpload from 'vue-simple-upload/dist/FileUpload'

export default {
  name: 'ConfigQuestions',
  props: {
  },
  data: function () {
    const gameId = localStorage.getItem("gameId")
    const cluesPerQuestion = JSON.parse(localStorage.getItem("gameConfig")).cluesPerQuestion
    return {
      target: `http://localhost:8080/game/${gameId}/questions-file?cluesPerQuestion=${cluesPerQuestion}`
    }
  },
  components: {
    'fileupload': FileUpload
  },
methods: {
   
    finishUpload(e) {
      if(e.target.status === 200) {
        localStorage.setItem("questions", e.target.response)
        alert("qwer")
      }
    },

    download: function() {
      
    }

  }
}
</script>

<style>
</style>
