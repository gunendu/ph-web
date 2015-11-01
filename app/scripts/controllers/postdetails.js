'use strict';

angular.module('phApp.PostViewDetails',['ngRoute','ngStorage'])
  .controller('PostDetailsCtrl',function ($scope,$routeParams,$localStorage,apiservice) {
  $scope.post_id = $routeParams.post_id;
  $scope.sendComment = function(message) {
    console.log("message is",message,$scope.post_id);
    var comment = {};
    comment.post_id = $scope.post_id;
    comment.comment = message;
    comment.user_id = $localStorage.user_id;
    var username = $localStorage.username;
    console.log("comment details",comment,username);
    apiservice.comment.save(comment,function(response) {
      console.log("comment save response",response);
    });
  }
  var getComments = function() {
     var response = apiservice.getComments.get({postid:$scope.post_id},function() {
       $scope.comments = response.result;
     });
  }
  getComments();
  });
