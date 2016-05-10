<template>
  <h1>Not Bought</h1>
  <game-panel v-for="boardGame in boardGames | filterBy 'false' in 'bought' | orderBy 'playCount' -1"
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
  };
</script>