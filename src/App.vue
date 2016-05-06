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
                <button v-on:click="mark(boardGame, boardGame['.key'])" class="btn btn-success" v-if="!boardGame.bought">Bought</button>
                <button v-on:click="increasePlayCount(boardGame)" v-if="boardGame.bought"
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
        /*
        boardGames: [
          {
            idx: 1,
            name: 'Mage Wars Academy',
            bought: false,
            playCount: 0,
          },
          {
            idx: 2,
            name: 'Dice Masters',
            bought: true,
            playCount: 0,
            imgSrc: 'http://cdn.miniaturemarket.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/z/wzk71298_2.jpg',
          },
          {
            idx: 3,
            name: 'Star Realms',
            bought: true,
            playCount: 0,
            imgSrc: 'http://a2.res.cloudinary.com/csicdn/image/upload/c_pad,h_300,w_300/v1/Images/Products/Misc%20Art/White%20Wizard%20Games/full/WWG001_1.jpg',
          },
        ],
        */
        newBoardGame: '',
      };
    },

    firebase: {
      boardGames: itemsRef.limitToLast(25),
    },

    methods: {
      mark(boardGame, key) {
        // const idx = this.boardGames.findIndex(element => element.idx === boardGame.idx);
        const updatedObject = Object.assign({}, boardGame, {
          bought: !boardGame.bought,
        });

        // this.boardGames.$set(idx, updatedObject);
        console.log(key);

        itemsRef.child(key).set(updatedObject);
      },

      increasePlayCount(boardGame) {
        const idx = this.boardGames.findIndex(element => element.idx === boardGame.idx);
        const myDate = new Date();
        const dateFormated = `${myDate.getDate()}.${myDate.getMonth() + 1}.${myDate.getFullYear()}`;
        this.boardGames.$set(idx, Object.assign({}, boardGame, {
          playCount: boardGame.playCount + 1,
          lastPlayed: dateFormated,
        }));
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
