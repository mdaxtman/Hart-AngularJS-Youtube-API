(function(){

  angular
    .module('player.directive', [])
    .directive('player', player);

  player.$inject = ['$timeout', '$state'];
  function player($timeout, $state){
    return {
      scope: {
        videoId: '=',
        videoList: '='
      },
      restrict: 'A',
      templateUrl: 'dist/templates/player.directive.html',
      link: function(scope, elem, attr){
          var video = function(ID){
            $timeout(function(){

            var refreshPlayer = function(){
              $('#player').remove();
              elem.append('<div id="player"></div>');
              var first = scope.videoList.shift();
              video(first.id.videoId);
            };
            var player;
            function onYouTubeIframeAPIReady() {  
              player = new YT.Player('player', {
                height: '390',
                width: '640',
                videoId: ID,
                events: {
                  'onReady': onPlayerReady,
                  'onStateChange': onPlayerStateChange
                }
              });
            }
            function onPlayerReady(event) {
              event.target.playVideo();
            }
            function onPlayerStateChange(event) {
              if(event.data === 0){
                refreshPlayer();
              }
              if(event.data === 2){
                player.playVideo();
              }
            }
            function stopVideo() {
              player.stopVideo();
            }
            onYouTubeIframeAPIReady();
          }, 100);
        };


        video(scope.videoId);
      }
    };
  }

})();
