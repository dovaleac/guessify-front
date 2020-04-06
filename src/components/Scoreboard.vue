<template>
  <div class="form">
    <b-container class ="d-flex flex-column">
      <b-row class="header">
        <b-col>Player</b-col>
        <b-col>Points</b-col>
        <b-col>Guessed</b-col>
      </b-row>
      <b-row v-for="player in scoreboard" :key="player.id">
        <b-col>{{ player.name }}</b-col>
        <b-col>{{ player.points }}</b-col>
        <b-col>{{ player.guessed }}</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Scoreboard',
  props: {
    scoreboard: Array
  }
}
</script>




