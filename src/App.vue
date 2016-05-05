<template>
  <div class="container">
    <h1>Board Game List</h1>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <input type="text" v-model="newBoardGame" class="form-control" placeholder="Game Name">
        </div>
        <button class="btn btn-default" v-on:click="addBoardGame">Add BoardGame</button>
      </div>

      <div class="col-md-8">
        <div v-for="boardGame in boardGames" class="panel panel-default" v-bind:class="{ 'panel-success': boardGame.bought }">
          <div class="panel-heading"><i v-if="boardGame.bought" class="glyphicon glyphicon-ok-sign"></i> {{ boardGame.name }}</div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-4">
                <button v-on:click="mark($index, boardGame)" class="btn btn-default">Bought</button>
                <button v-on:click="increasePlayCount($index, boardGame)" v-if="boardGame.bought"
                  class="btn btn-default">Played</button>
              </div>
              <div class="col-md-8" v-if="boardGame.bought">
                <h4>
                  <i class="glyphicon glyphicon-time"></i>
                  Play Count: {{ boardGame.playCount }}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <!--<pre>{{ boardGames | json }}</pre>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        boardGames: [
          {
            name: 'Blood Rage',
            bought: false,
            playCount: 0,
          },
          {
            name: 'Mage Wars Academy',
            bought: false,
            playCount: 0,
          },
          {
            name: 'Dice Masters',
            bought: true,
            playCount: 0,
          },
        ],
        newBoardGame: '',
      };
    },

    methods: {
      mark(index, boardGame) {
        const updatedGame = Object.assign({}, boardGame, {
          bought: !boardGame.bought,
        });
        this.boardGames.$set(index, updatedGame);
      },

      increasePlayCount(index, boardGame) {
        const updatedGame = Object.assign({}, boardGame, {
          playCount: boardGame.playCount + 1,
        });
        this.boardGames.$set(index, updatedGame);
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
          this.newBoardGame = '';
        }
      },
    },
  };
</script>
