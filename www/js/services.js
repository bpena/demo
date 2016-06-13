angular.module('app.services', [])

.factory('BlankFactory', [function(){
}])
.service('BlankService', [function(){
}])

.factory('SessionService', ['$q', '$timeout', function($q, $timeout) {

  var username = 'guest';
  var observerCallbacks = [];

  var service = {
    isGuest: isGuest,
    login: login,
    logout: logout,
    registerObserver: registerObserverCallback
  };

  return service;

  function registerObserverCallback(callback) {
    observerCallbacks.push(callback);
  }

  function notifyObservers() {
    angular.forEach(observerCallbacks, function(callback) {
      callback();
    })
  }

  function isGuest() {
    return username == 'guest';
  }

  function login(user, pass) {
    var deferred = $q.defer();

    $timeout(function (user, pass) {
      if (user == pass)
        username = user;

      notifyObservers();

      deferred.resolve(user == pass);
    });

    return deferred.promise;
  }

  function logout() {
    username = 'guest';

    notifyObservers();
  }
}])

.factory('OwnershipService', [function() {
  var service = {
    getList: getList
  };

  var ownerships = [
    {
      id: 'promotora-tantalo',
      name: 'Promotora Tántalo',
      image: 'Logos-01.png',
      review: '',
      logo: 'Logos-01.png'
    },
    {
      id: 'trinitarias',
      name: 'Trinitarias',
      image: 'Logos-02.png',
      review: '',
      logo: 'Logos-02.png'
    },
    {
      id: 'la-granja',
      name: 'La Granja',
      image: 'Logos-10.png',
      review: '',
      logo: 'Logos-10.png'
    },
    {
      id: 'trinitarias-suite',
      name: 'Trinitarias Suite',
      image: 'Logos-03.png',
      review: '',
      logo: 'Logos-03.png'
    },
    {
      id: 'expreso-trinidad',
      name: 'Expreso Trinidad',
      image: 'Logos-04.png',
      review: '',
      logo: 'Logos-04.png'
    },
    {
      id: 'expreso-chacaito',
      name: 'Expreso Chacaíto',
      image: 'Logos-05.png',
      review: '',
      logo: 'Logos-05.png'
    },
    {
      id: 'expreso-baruta',
      name: 'Expreso Baruta',
      image: 'Logos-06.png',
      review: '',
      logo: 'Logos-06.png'
    }
  ];

  return service;

  function getList() {
    return ownerships;
  }
}])

.service('Utils', [function() {
  this.isEmpty = function(value) {
    return value == null || value == '';
  }
}]);

