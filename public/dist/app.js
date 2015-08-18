(function(){

  angular
    .module('player.config', [])
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise('/search');
      $stateProvider
        .state('app', {
          url: '/search',
          controller: 'SearchCtrl',
          controllerAs: 'Search',
          templateUrl: 'dist/templates/search.html'
        });
  }

})();
(function(){

  angular 
    .module('playerCore', [
      'ui.bootstrap',
      'ui.router',
      'ngResource'
      ]);

})();

(function(){

  angular
    .module('playerApp', [
      'playerCore',
      'player.directive',
      'api.service',
      'player.config',
      'states'
      ]);

})();
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

(function(){

  angular
    .module('api.service', [])
    .factory('api', api);

  api.$inject = ['$http', '$q'];
  function api($http, $q){
    return {
      get: function(param){
        var deferred = $q.defer();
        var query = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&key=AIzaSyDzU_QGfwS61KKF5yfIQpR4UW-fRKIJVtQ';
        
        $http.get(query+ '&q='+param).success(function(data){
          console.log(data);
          deferred.resolve(data);
        });
        return deferred;
    // type: "GET",
    // data: {
    //   orderby: "relevance",
    //   v: "2",
    //   alt: "jsonc",
    //   license: "cc",  
    //   duration: "long",
    //   "max-results": "50",
    //   genre: channel
    // },
      }
    };
  }

})();

(function(){

  angular
    .module('states', [
      'search.controller',
      'video'
      ]);

})();

(function(){

  angular
    .module('search.controller', [])
    .controller('SearchCtrl', SearchCtrl);

  SearchCtrl.$inject = ['$state'];

  function SearchCtrl($state){
    var vm = this;
    vm.input = '';
    vm.find = function(e){
      e.preventDefault();
      if(vm.input.length >= 1){
        $state.go('app.video', {query: vm.input});
      }else{
        alert('please enter a query');
      } 
    };
  }

})();

(function(){

  angular
    .module('video.config', [])
    .config(config);
  config.$inject = ['$stateProvider'];

  function config($stateProvider){
    $stateProvider
      .state('app.video', {
        url: 'video/:query',
        controller: 'VideoCtrl',
        controllerAs: 'Video',
        templateUrl: 'dist/templates/video.html',
        resolve : {
          results: ['$stateParams', 'api', function($stateParams, api){
            return api.get($stateParams.query).promise;
          }]
        }
      });
  }

})();

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

(function(){

  angular
    .module('video', [
      'video.config',
      'video.controller'
      ]);

})();
