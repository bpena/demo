angular.module('app.services', [])

.factory('BlankFactory', [function(){
}])
.service('BlankService', [function(){
}])

.factory('SessionService', ['$q', '$timeout', 'UserService', function($q, $timeout, UserService) {

  var username = 'guest';
  var observerCallbacks = [];
  var session = {
    username : 'guest',
    currentUser : null,
    isGuest : true
  }

  var service = {
    login: login,
    logout: logout,
    isOwner: isOwner,
    registerObserver: registerObserverCallback,
    session: session
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

  function login(user, pass) {
    var deferred = $q.defer();
    var _user = user;
    var _pass = pass;
    $timeout(function () {
      var currentUser = UserService.getUserByCredentials(_user, _pass);
      if (user) {
        session.currentUser = currentUser;
        session.username = _user;
        session.isGuest = false;
      }

      notifyObservers();

      deferred.resolve(currentUser != null);
    });

    return deferred.promise;
  }

  function logout() {
    username = 'guest';
    session.username = 'guest';
    session.user = null;
    session.isGuest = true;
    notifyObservers();
  }

  function isOwner(ownershipId) {
    return session.currentUser && session.currentUser.ownership.contains(ownershipId);
  }
}])

.factory('OwnershipService', ['$filter', function($filter) {
  var service = {
    getList: getList,
    getListByUser: getListByUser,
    getById: getById
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

  function getListByUser(user) {
    var list = [];
    ownerships.forEach(function(ownership) {
      user.ownership.forEach(function (id) {
        if (id == ownership.id)
          list.push(ownership)
      });
    });
    return list;
  }

  function getById(id) {
    var _ownership = null;
    ownerships.forEach(function(ownership) {
      if (id == ownership.id)
        _ownership = ownership;
    })

    return _ownership;
  }
}])

.factory('UserService', [function() {
  var service = {
    getUser: getUser,
    getUserByCredentials: getUserByCredentials
  }

  var users = [
    {
      id: 1,
      username: 'admin',
      password: 'admin',
      ownership: ['promotora-tantalo', 'trinitarias', 'la-granja']
    },
    {
      id: 2,
      username: 'bpena',
      password: 'nano123',
      ownership: ['trinitarias-suite']
    },
    {
      id: 3,
      username: 'acobis',
      password: 'cobis123',
      ownership: ['expreso-trinidad', 'expreso-chacaito', 'expreso-baruta']
    }
  ];

  return service;

  function getUser(username) {
    var _user = null;
    users.forEach(function(user) {
      if (user.username == username)
        _user = user;
    });
    return _user;
  }

  function getUserByCredentials(username, password) {
    var _user = null;
    users.forEach(function(user) {
      if (user.username == username && user.password == password)
        _user = user;
    })

    return _user;
  }
}])

.service('Utils', [function() {
  this.isEmpty = function(value) {
    return value == null || value == '';
  }
}]);

