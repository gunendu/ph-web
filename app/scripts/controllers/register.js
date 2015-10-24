'use strict';
/**
 * @ngdoc function
 * @name phApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the phApp
 */
angular.module('phApp.RegisterView',['ngRoute'])
  .controller('RegisterCtrl',function ($scope,apiservice) {
     $scope.saveData = function() {
        console.log($scope.Name);
        var user = {};
        user.firstname = $scope.Name;
        user.username = $scope.Email;
        user.password = $scope.Password;
        console.log("Scope is",user);
        apiservice.register.save(user,function(response) {
          console.log("data is saved",response);
        });
     };
  });
