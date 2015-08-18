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