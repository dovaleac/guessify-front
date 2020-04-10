<template>
  <div class="form">
    <b-container class ="d-flex flex-column">
      <b-row>
        Welcome to Guessify! Let's play guesses! Do you want to create a room to play or join an already created one? Give me a clue!
      </b-row>
      
      <b-row class="mt-auto">
        <b-col><button class="button" v-on:click="createRoom">Create</button></b-col>
        <b-col><button class="button" v-on:click="joinRoom">Join</button></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

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
      roomPassword: null
    }
  },
  methods: {
    createRoom() {
      this.$router.push('/newRoom')
    },
    joinRoom() {
      this.$router.push('/newContender')
    }
  }
}
</script>

<style>
</style>
