'use strict';

/**
 * @ngdoc function
 * @name phApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the phApp
 */
angular.module('phApp.MainView',['ngRoute'])
  .controller('MainCtrl', function ($scope,apiservice) {
     var item = function () {
       $scope.names = [{
       url: 'bob'
       }, {
       url: 'mary'
     }];
     var posts = apiservice.getPosts.get(function() {
       console.log("entries",posts.result,$scope.names);
       $scope.result = posts.result;
     });
     }
     item();
  });
