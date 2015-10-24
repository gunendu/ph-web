'use strict';

angular.module('phApp.LoginView',['ngRoute'])
  .controller('LoginCtrl', function($scope,apiservice) {
      $scope.login = function() {
        var user = {};
        user.username = $scope.userName;
        user.password = $scope.password;
        apiservice.login.save(user,function(response) {
          console.log("response is",response);
        });
      };
  });
