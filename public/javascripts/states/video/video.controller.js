(function(){

  angular
    .module('video.controller', [])
    .controller('VideoCtrl', VideoCtrl);

  VideoCtrl.$inject = ['results'];
  function VideoCtrl(results){
    var vm = this;
    vm.playlist = results.items;
    vm.first = results.items[0];
    vm.playlist.shift();
    vm.loadNew = function(video, index){
      vm.first = video;
      vm.playlist.splice(index, 1);
    };
  }

})();
