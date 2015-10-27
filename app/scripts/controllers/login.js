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

myapp.factory('srvAuth',function($rootScope,$location) {

var checkLoginState = function() {
    FB.getLoginStatus(function(response) {
      console.log("getLoginStatus",response);
      getUserInfo();
    });
}

var getUserInfo = function() {
  FB.api('/me?fields=email,name', function(res) {
    console.log("get user details is called",res);
    $rootScope.$apply(function() {
      $rootScope.user = res;
      
      $location.path('');
    });
  });
}

return {
  getUserInfo: getUserInfo,
  checkLoginState: checkLoginState
}

});

myapp.controller('LoginCtrl', function($scope,$window,srvAuth) {
   $window.login = function() {
     srvAuth.checkLoginState();
   }
   $scope.logout = function() {
     FB.logout(function(response) {
       console.log("logout is success",response);
     });
   }
});
