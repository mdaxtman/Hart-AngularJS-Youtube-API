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
