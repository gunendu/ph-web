'use strict';
/**
 * @ngdoc function
 * @name phApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the phApp
 */
angular.module('phApp')
  .controller('RegisterCtrl',function ($scope,phApi) {
     $scope.saveData = function() {
        console.log($scope.Name);
        $scope.phApi = new phApi();
        $scope.phApi.Name = $scope.Name;
        $scope.phApi.Email = $scope.Email;
        $scope.phApi.Password $scope.Password;
        console.log("Scope is",$scope.phApi);
        phApi.User.save($scope.phApi,function() {
          console.log("data is saved");
        });
     };
  });
