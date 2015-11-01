'use strict';

var myapp = angular.module('phApp.LoginView',['ngRoute']);

myapp.run(['$rootScope','$window', 'srvAuth',
  function($rootScope,$window, sAuth) {
  $rootScope.user = {};
  $window.fbAsyncInit = function() {
    FB.init({
      appId: '1711053645793575',
      status: true,
      cookie: true,
      xfbml: true,
      version: 'v2.4'
    });
  };

  (function(d){
    var js,
    id = 'facebook-jssdk',
    ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    ref.parentNode.insertBefore(js, ref);
  }(document));
}]);

myapp.factory('srvAuth',function($rootScope,$location,$cookies,apiservice) {

var checkLoginState = function() {
    FB.getLoginStatus(function(response) {
      getUserInfo(function(res) {
        var user = {};
        user.username = res.email;
        user.name = res.name;
        user.profile_url = res.picture.data.url;
        apiservice.register.save(user,function(response) {
          console.log("user register response is",response);
          $cookies.put('username',user.username);
          $cookies.put('name',user.name);
          $cookies.put('user_id',response.result.insertId);
        });
        $location.path('');
      });
    });
}

var getUserInfo = function(callback) {
  FB.api('/me?fields=email,name,picture', function(res) {
    $rootScope.$apply(function() {
      console.log("profile pic",res);
      callback(res);
    });
  });
}

return {
  getUserInfo: getUserInfo,
  checkLoginState: checkLoginState
}

});

myapp.controller('LoginCtrl', function($scope,$window,$cookies,srvAuth) {
   $window.login = function() {
     srvAuth.checkLoginState();
   }
   $scope.logout = function() {
     FB.logout(function(response) {
       $cookies.remove('username');
       $cookies.remove('user_id');
       $cookies.remove('name');
       console.log("logout is success",response);
     });
   }
});
