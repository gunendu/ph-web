'use strict';

angular.module('phApp.PostViewDetails',['ngRoute','ngStorage'])
  .controller('PostDetailsCtrl',function ($scope,$routeParams,$localStorage,$location,apiservice) {
  $scope.post_id = $routeParams.post_id;
  $scope.sendComment = function(message) {
    console.log("message is",message,$scope.post_id);
    var comment = {};
    comment.post_id = $scope.post_id;
    comment.comment = message;
    comment.user_id = $localStorage.user_id;
    var username = $localStorage.username;
    apiservice.comment.save(comment,
      function(response) {
        console.log("comment save response",response);
      },
      function(err) {
        console.log("error saving comment",err);
        $location.path('/login');
      });
  }
  var getComments = function() {
     console.log("get comments is called");
     var response = apiservice.getComments.get({postid:$scope.post_id},function() {
       $scope.comments = response.result;
       console.log("comments",$scope.comments);
     });
  }
  $scope.addReply = function(message,comment_id) {
    console.log("reply text is",message);
    var reply = {};
    reply.comment_id = comment_id;
    reply.reply = message;
    reply.user_id = $localStorage.user_id;
    console.log("reply",reply);
    apiservice.reply.save(reply,
      function(response) {
        console.log("comment is saved",response);
      },
      function(err) {
        console.log("error sending comments");
      });
  }
  getComments();
  });
