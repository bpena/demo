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

  .state('menu.eventos', {
    url: '/eventos',
    views: {
      'side-menu21': {
        templateUrl: 'templates/eventos.html',
        controller: 'eventosCtrl'
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
