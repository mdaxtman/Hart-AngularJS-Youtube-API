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
