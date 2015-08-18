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