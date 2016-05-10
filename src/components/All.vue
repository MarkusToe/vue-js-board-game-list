<template>
  <h1>All</h1>
  <game-panel v-for="boardGame in boardGames | orderBy 'playCount' -1"
              class="panel panel-default" :board-game="boardGame" :index="$index" track-by="$index"></game-panel>
</template>

<script>
  import GamePanel from './GamePanel.vue';
  import itemsRef from '../store/index.js';

  export default {
    components: {
      'game-panel': GamePanel,
    },

    firebase: {
      boardGames: itemsRef.limitToLast(25),
    },

    ready() {
      console.log(this);
    },

  };
</script>