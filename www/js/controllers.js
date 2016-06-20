angular.module('app.controllers', [])

.controller('indicadoresCtrl', function($scope) {
  $scope.labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"];
  $scope.series = ['Facturado', 'Cobrado'];
  $scope.data = [
    [65000, 59000, 80000, 81000, 56000, 5500, 40000],
    [28000, 48000, 40000, 19000, 86000, 27000, 90000]
  ];
})

.controller('indicadoresMenuCtrl', function($state) {
  var vm = this;
  vm.goto = goto;

  vm.opciones = [
    {
      label: 'Facturación vs Cobro',
      url: 'menu.indicadores',
      grupo: 'Facturación'
    },
    {
      label: 'Facturación x Local',
      url: 'menu.indicadores',
      grupo: 'Facturación'
    },
    {
      label: 'Cant. de Vehículos',
      url: 'menu.indicadores',
      grupo: 'Estacionamiento'
    },
    {
      label: 'Ingreso C.C. x M2',
      url: 'menu.indicadores',
      grupo: 'Ingreso M2'
    }
  ];

  function goto(item) {
    $state.go(item.url);
  }
})

.controller('eventosCtrl', function($scope) {

})


.controller('eventosMenuCtrl', function() {
  var vm = this;
})

.controller('espaciosCtrl', function($scope) {

})

.controller('espaciosMenuCtrl', function() {
  var vm = this;
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

  function gotoLogin(negocioId) {
    if (!SessionService.isOwner(negocioId)) {
      $ionicHistory.nextViewOptions({disableBack: true});
      $state.go('menu.entrar');
    }
    else {
      gotoNegocio(negocioId);
    }
  }

  function gotoNegocio(param) {
    // $ionicHistory.nextViewOptions({disableBack: true});
    $state.go('menu.negocio', {param: param});
   }

  SessionService.registerObserver(watchSessionStatus);
  watchSessionStatus();
})

.controller('menuCtrl', function($scope, $state, $ionicHistory, $ionicSideMenuDelegate, SessionService) {
  var vm = this;
  vm.logout = logout;
  vm.session = SessionService.session;

  function logout() {
    SessionService.logout();
    $ionicHistory.nextViewOptions({disableBack: true});
    $ionicSideMenuDelegate.toggleLeft();
  }
})

.controller('negocioCtrl', function($scope, $stateParams, OwnershipService) {
  var vm = this;
  vm.param = $stateParams.param;
  vm.ownership = {}

  init();
  function init() {
    vm.ownership = OwnershipService.getById(vm.param);
  }
})
