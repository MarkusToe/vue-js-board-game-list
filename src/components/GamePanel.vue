<template>
  <div class="panel panel-default">
    <div class="panel-heading"><i v-if="boardGame.bought" class="glyphicon glyphicon-ok-sign"></i> {{ boardGame.name }}</div>
    <div class="panel-body">
      <div class="row">
        <div class="col-md-2" v-if="boardGame.imgSrc">
          <img src="{{ boardGame.imgSrc }}" alt="" class="img-responsive">
        </div>
        <div class="col-md-2">
          <button @click="mark(boardGame, boardGame['.key'])" class="btn btn-success" v-if="!boardGame.bought">Bought</button>
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

          <div class="row">
            <div class="col-md-12">
              <h4>Ratings</h4>
              <div class="row">
                <div class="col-md-6">
                  <select class="form-control">
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
                <div class="col-md-6">
                  <select class="form-control">
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
  <!-- <pre>{{ boardGames | json }}</pre> -->
</template>

<script>
  export default {
    props: ['board-game'],
  };
</script>
