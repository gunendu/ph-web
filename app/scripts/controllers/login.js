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
      console.log("response fb",response);
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
          $localStorage.profile_url = user.profile_url;
          $localStorage.accesstoken = response.result.token;
          console.log("localStorage data",$localStorage.accesstoken,$localStorage.username);
          $location.path('/');
        });

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

myapp.controller('LoginCtrl', function($scope,$window,$localStorage,srvAuth,twitterservice,apiservice,$location) {
   $scope.login = function() {
     console.log("login is triggered");
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
   twitterservice.initialize();

   //when the user clicks the connect twitter button, the popup authorization window opens
    $scope.connectButton = function() {
        twitterservice.connectTwitter().then(function() {
            if (twitterservice.isReady()) {
                twitterservice.getUserDetails().then(function(response) {
                  var user = {};
                  user.username = response.email;
                  user.name = response.name;
                  user.profile_url = response.profile_image_url_https;
                  apiservice.register.save(user,function(response) {
                    $localStorage.username = user.username;
                    $localStorage.name = user.name;
                    $localStorage.user_id = response.result.insertId;
                    $localStorage.profile_url = response.result.profile_url;
                    $localStorage.accesstoken = response.result.token;
                    $location.path('/main');
                  });
                })
            }
        });
    }
    //sign out clears the OAuth cache, the user will have to reauthenticate when returning
   $scope.signOut = function() {
       twitterservice.clearCache();

       $('#getTimelineButton, #signOut').fadeOut(function(){
           $('#connectButton').fadeIn();
       });
   }

});
