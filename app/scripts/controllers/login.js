'use strict';

var myapp = angular.module('phApp.LoginView',['ngRoute','ngStorage']);

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

myapp.factory('srvAuth',function($rootScope,$location,$localStorage,apiservice) {

var checkLoginState = function() {
    FB.getLoginStatus(function(response) {
      getUserInfo(function(res) {
        var user = {};
        user.username = res.email;
        user.name = res.name;
        user.profile_url = res.picture.data.url;
        apiservice.register.save(user,function(response) {
          console.log("user register response is",response);
          $localStorage.username = user.username;
          $localStorage.name = user.name;
          $localStorage.user_id = response.result.insertId;
          $localStorage.accesstoken = response.result.token;
          console.log("localStorage data",$localStorage.accesstoken,$localStorage.username);
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

myapp.controller('LoginCtrl', function($scope,$window,$localStorage,srvAuth) {
   $window.login = function() {
     srvAuth.checkLoginState();
   }
   $scope.logout = function() {
     FB.logout(function(response) {
       delete $localStorage.username;
       delete $localStorage.user_id;
       delete $localStorage.name;
       delete $localStorage.accesstoken;
       console.log("logout is success",response);
     });
   }
});
