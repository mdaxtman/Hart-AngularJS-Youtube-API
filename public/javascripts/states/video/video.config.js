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
