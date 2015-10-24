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
        $scope.apiservice = new apiservice();
        $scope.apiservice.firstname = $scope.Name;
        $scope.apiservice.username = $scope.Email;
        $scope.apiservice.password = $scope.Password;
        console.log("Scope is",$scope.apiservice);
        apiservice.save($scope.apiservice,function() {
          console.log("data is saved");
        });
     };
  });
