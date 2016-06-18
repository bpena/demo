angular.module('app.controllers', [])

.controller('indicadoresCtrl', function($scope) {
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
})

.controller('eventosCtrl', function($scope) {

})

.controller('espaciosCtrl', function($scope) {

})

.controller('entrarCtrl', function($scope, $state, $ionicHistory, SessionService, Utils) {
  var vm = this;
  vm.username = '';
  vm.password = '';
  vm.hasError = false;


  vm.login = function() {
    vm.hasError = Utils.isEmpty(vm.username) || Utils.isEmpty(vm.password);

    if (!vm.hasError)
      SessionService.login(vm.username, vm.password)
        .then(function(value) {
          console.log(value);
          if (value) {
            $ionicHistory.nextViewOptions({disableBack: true});
            $state.go('menu.inicio');
          }
        });
  }
})

.controller('inicioCtrl', function($scope, $state, $ionicHistory, OwnershipService, SessionService) {
  var vm = this;
  vm.session = SessionService.session;
  vm.ownerships = OwnershipService.getList();
  vm.gotoNegocio = gotoNegocio;
  vm.gotoLogin = gotoLogin;

  function watchSessionStatus() {
    if (vm.session.isGuest)
      vm.ownerships = OwnershipService.getList();
    else
      vm.ownerships = OwnershipService.getListByUser(vm.session.currentUser);
  }

  function gotoLogin() {
    $ionicHistory.nextViewOptions({disableBack: true});
    $state.go('menu.entrar');
  }

  function gotoNegocio(param) {
    $ionicHistory.nextViewOptions({disableBack: true});
    $state.go('menu.negocio', {param: param});
  }

  SessionService.registerObserver(watchSessionStatus);
  watchSessionStatus();
})

.controller('menuCtrl', function($scope, $state, $ionicSideMenuDelegate, SessionService) {
  var vm = this;
  vm.logout = logout;
  vm.session = SessionService.session;

  function logout() {
    SessionService.logout();
    $ionicSideMenuDelegate.toggleLeft();
  }
})

.controller('negocioCtrl', function($scope, $stateParams) {
  var vm = this;
  vm.param = $stateParams;

  init();
  function init() {
    console.log(vm.param);
    console.log($stateParams);
  }
})
