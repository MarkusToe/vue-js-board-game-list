<template>
  <div class="container">
    <h1>Board Game List</h1>
    <Hello></Hello>
    <my-component></my-component>
    <div class="row">
      <div class="col-md-3">
        <div class="form-group">
          <input type="text" v-model="newBoardGame" class="form-control" placeholder="Game Name">
        </div>
        <button class="btn btn-primary" @click="addBoardGame">Add BoardGame</button>
      </div>

      <div class="col-md-9">
        <div class="btn-group" role="group" aria-label="...">
          <button type="button" class="btn btn-default">All</button>
          <button type="button" class="btn btn-default">Bought</button>
          <button type="button" class="btn btn-default">Unbought</button>
        </div>

        <game-panel v-for="boardGame in boardGames | orderBy 'playCount' -1" class="panel panel-default" :board-game="boardGame"></game-panel>

        <!-- <pre>{{ boardGames | json }}</pre> -->
      </div>
    </div>
  </div>
</template>

<script>
  import Firebase from 'firebase';
  const itemsRef = new Firebase('https://shining-torch-265.firebaseio.com/');

  import GamePanel from './components/GamePanel.vue';

  export default {
    components: {
      'game-panel': GamePanel,
    },

    data() {
      return {
        newBoardGame: '',
      };
    },

    firebase: {
      boardGames: itemsRef.limitToLast(25),
    },

    methods: {
      mark(boardGame, key) {
        const boardGameRef = itemsRef.child(key);
        boardGameRef.update({
          bought: !boardGame.bought,
        });
      },

      increasePlayCount(boardGame, key) {
        const myDate = new Date();
        const dateFormated = `${myDate.getDate()}.${myDate.getMonth() + 1}.${myDate.getFullYear()}`;
        const boardGameRef = itemsRef.child(key);
        boardGameRef.update({
          playCount: boardGame.playCount + 1,
          lastPlayed: dateFormated,
        });
      },

      addBoardGame() {
        const name = this.newBoardGame.trim();
        console.log(name);
        if (name) {
          this.boardGames.push({
            name,
            bought: false,
            playCount: 0,
          });

          itemsRef.push({
            name,
            bought: false,
            playCount: 0,
          });

          this.newBoardGame = '';
        }
      },
    },
  };
</script>

<style>
  .btn-group { margin-bottom: 1em; }
</style>
