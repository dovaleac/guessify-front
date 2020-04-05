<template>
  <div class="form">
    <b-container class ="d-flex flex-column">
      <b-row class="header">
        <b-col>Player</b-col>
        <b-col>Points</b-col>
        <b-col>Questions guessed</b-col>
      </b-row>
      <b-row v-for="(player, id, points, guessed) in scoreboard" :key="id">
        <b-col>{{ player }}</b-col>
        <b-col>{{ points }}</b-col>
        <b-col>{{ guessed }}</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    scoreboard: Object
  }
}
</script>




