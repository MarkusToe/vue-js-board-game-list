<template>
  <div class="container">
    <h1>Board Game List</h1>
    <div class="row">
      <div class="col-md-3">
        <div class="form-group">
          <input type="text" v-model="newBoardGame" class="form-control" placeholder="Game Name">
        </div>
        <button class="btn btn-primary" v-on:click="addBoardGame">Add BoardGame</button>
      </div>

      <div class="col-md-9">
        <div class="btn-group" role="group" aria-label="...">
          <button type="button" class="btn btn-default">All</button>
          <button type="button" class="btn btn-default">Bought</button>
          <button type="button" class="btn btn-default">Unbought</button>
        </div>

        <div v-for="boardGame in boardGames | orderBy 'playCount' -1" class="panel panel-default"
          v-bind:class="{ 'panel-success': boardGame.bought }" track-by="$index">
          <div class="panel-heading"><i v-if="boardGame.bought" class="glyphicon glyphicon-ok-sign"></i> {{ boardGame.name }}</div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-2" v-if="boardGame.imgSrc">
                <img src="{{ boardGame.imgSrc }}" alt="" class="img-responsive">
              </div>
              <div class="col-md-2">
                <button @click="mark(boardGame, boardGame['.key'])" class="btn btn-success" v-if="!boardGame.bought">Bought</button>
                <button v-on:click="increasePlayCount(boardGame, boardGame['.key'])" v-if="boardGame.bought"
                  class="btn btn-default">Played</button>
              </div>
              <div class="col-md-8" v-if="boardGame.bought">
                <div class="row">
                  <div class="col-md-6">
                    <h4>
                      <i class="glyphicon glyphicon-time"></i>
                      Play Count: {{ boardGame.playCount }}
                    </h4>
                  </div>
                  <div class="col-md-6">
                    <h4>
                      <i class="glyphicon glyphicon-heart"></i>
                      Rating: {{ boardGame.playCount }}
                    </h4>
                  </div>
                </div>

                <div class="row" v-if="boardGame.lastPlayed">
                  <div class="col-md-12">
                    <h4>
                      <i class="glyphicon glyphicon-calendar"></i>
                      Last Played: {{ boardGame.lastPlayed }}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <pre>{{ boardGames | json }}</pre> -->
      </div>
    </div>
  </div>
</template>

<script>
  import Firebase from 'firebase';
  const itemsRef = new Firebase('https://shining-torch-265.firebaseio.com/');

  export default {
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
