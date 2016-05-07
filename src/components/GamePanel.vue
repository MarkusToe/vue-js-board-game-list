<template>
  <div class="panel panel-default" v-bind:class="{ 'panel-success': boardGame.bought } ">

    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" href="#collapse{{index}}">
          <i v-if="boardGame.bought" class="glyphicon glyphicon-ok-sign"></i> {{ boardGame.name }}
        </a>
      </h4>
    </div>

    <div id="collapse{{index}}" class="panel-collapse collapse">
      <div class="panel-body">
        <div class="row">
          <div class="col-md-2" v-if="boardGame.imgSrc">
            <img src="{{ boardGame.imgSrc }}" alt="" class="img-responsive">
          </div>

          <div class="col-md-2">
            <button @click="toggleOwnedState(boardGame, boardGame['.key'])" class="btn btn-success" v-if="!boardGame.bought">Bought</button>
            <button @click="increasePlayCount(boardGame, boardGame['.key'])" v-if="boardGame.bought"
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
                  Rating: {{ rating }}
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

            <div class="row">
              <div class="col-md-12">
                <h4>Ratings</h4>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Rating Marion</label>
                      <select class="form-control" v-model="boardGame.ratingMarion" @change="setRating(boardGame['.key'], boardGame.ratingMarion, 'ratingMarion')">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Rating Markus</label>
                      <select class="form-control" v-model="boardGame.ratingMarkus" @change="setRating(boardGame['.key'], boardGame.ratingMarkus, 'ratingMarkus')">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                      </select>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
<!-- <pre>{{ boardGames | json }}</pre> -->
</template>

<script>
export default {
  computed: {
    rating() {
      return (parseInt(this.boardGame.ratingMarion, 10) +
      parseInt(this.boardGame.ratingMarkus, 10)) / 2;
    },
  },

  props: ['board-game', 'index'],

  methods: {
    increasePlayCount(boardGame, key) {
      this.$dispatch('increase-playcount', boardGame, key);
    },

    toggleOwnedState(boardGame, key) {
      this.$dispatch('toggle-owned-state', boardGame, key);
    },

    setRating(key, value, ratingPerson) {
      this.$dispatch('change-rating', {
        key,
        ratingPerson,
        value,
      });
    },
  },
};
</script>
