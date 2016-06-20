angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('menu.indicadores', {
    url: '/indicadores',
    views: {
      'side-menu21': {
        templateUrl: 'templates/indicadores.html',
        controller: 'indicadoresCtrl'
      }
    }
  })

  .state('menu.indicadores_menu', {
    url: '/indicadores_menu',
    views: {
      'side-menu21': {
        templateUrl: 'templates/indicadores_menu.html',
        controller: 'indicadoresMenuCtrl',
        controllerAs: 'ctrl'
      }
    }
  })

  .state('menu.eventos', {
    url: '/eventos',
    views: {
      'side-menu21': {
        templateUrl: 'templates/eventos.html',
        controller: 'eventosCtrl'
      }
    }
  })

  .state('menu.eventos_menu', {
    url: '/eventos_menu',
    views: {
      'side-menu21': {
        templateUrl: 'templates/eventos_menu.html',
        controller: 'eventosMenuCtrl'
      }
    }
  })

  .state('menu.espacios', {
    url: '/espacios',
    views: {
      'side-menu21': {
        templateUrl: 'templates/espacios.html',
        controller: 'espaciosCtrl'
      }
    }
  })

  .state('menu.espacios_menu', {
    url: '/espacios_menu',
    views: {
      'side-menu21': {
        templateUrl: 'templates/espacios_menu.html',
        controller: 'espaciosMenuCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl',
    controllerAs: 'ctrl',
    abstract:true
  })

  .state('menu.entrar', {
    url: '/entrar',
    views: {
      'side-menu21': {
        templateUrl: 'templates/entrar.html',
        controller: 'entrarCtrl',
        controllerAs: 'ctrl'
      }
    }
  })

  .state('menu.negocio', {
    url: '/negocio/{param}',
    views: {
      'side-menu21': {
        templateUrl: 'templates/negocio.html',
        controller: 'negocioCtrl',
        controllerAs: 'ctrl'
      }
    }
  })

  .state('menu.inicio', {
    url: '/inicio',
    views: {
      'side-menu21': {
        templateUrl: 'templates/inicio.html',
        controller: 'inicioCtrl',
        controllerAs: 'ctrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/inicio')



});
