<template>
  <div class="container">
    <h1>Board Game List</h1>
    <ul>
      <li v-for="boardGame in boardGames" v-bind:class="{ 'alert-success': boardGame.bought }">
        {{ boardGame.name }}
        <button v-on:click="mark">Bought</button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        boardGames: [
          {
            name: 'Blood Rage',
            bought: true,
          },
          {
            name: 'Mage Wars Academy',
            bought: false,
          },
          {
            name: 'Dice Masters',
            bought: false,
          },
        ],
      };
    },

    methods: {
      mark() {
        console.log('Bought!');
      },
    },
  };
</script>
