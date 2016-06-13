angular.module('app.controllers', [])

.controller('indicadoresCtrl', function($scope) {

})

.controller('eventosCtrl', function($scope) {

})

.controller('espaciosCtrl', function($scope) {

})

.controller('entrarCtrl', function($scope, SessionService, Utils) {
  var vm = this;
  vm.username = '';
  vm.password = '';
  vm.hasError = false;

  vm.login = function() {
    vm.hasError = Utils.isEmpty(vm.username) || Utils.isEmpty(vm.password);

    if (!vm.hasError)
      SessionService.login(vm.username, vm.password)
        .then(function(value) {
          
        });
  }
})

.controller('inicioCtrl', function($scope, OwnershipService) {
  var vm = this;
  vm.ownerships = OwnershipService.getList();
})

.controller('menuCtrl', function($scope, SessionService) {
  var vm = this;
  vm.logout = logout;

  function watchSessionStatus() {
    vm.isGuest = SessionService.isGuest();
  }

  function logout() {
    SessionService.logout();
  }

  SessionService.registerObserver(watchSessionStatus);
  watchSessionStatus();
})
