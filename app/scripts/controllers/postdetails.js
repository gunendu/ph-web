'use strict';

angular.module('phApp.PostViewDetails',['ngRoute','ngStorage','jkuri.gallery'])
  .controller('PostDetailsCtrl',function ($scope,$routeParams,$localStorage,$location,$window,apiservice,$document) {
  $scope.post_id = $routeParams.post_id;
  $scope.toggle = false;
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
     var response = apiservice.getComments.get({postid:$scope.post_id},function() {
       $scope.comments = response.result;
       $scope.images = [];
       for(var item in $scope.comments.image_urls) {
          var image = {};
          image.thumb = $scope.comments.image_urls[item].scaled.url;
          image.img = $scope.comments.image_urls[item].default.url;
          $scope.images.push(image);
       }
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
  $scope.upVoteComment = function(comment_id) {
    $scope.toggle = !$scope.toggle;
    var comment = {};
    comment.comment_id = comment_id;
    comment.user_id = $localStorage.user_id;
    if($scope.toggle) {
      $scope.vote++;
      apiservice.voteComment.save(comment,
        function(response) {
          console.log("Success upvoting Post",response);
        },
        function(err){
          console.log("upVote error",err.data.error.code);
          $location.path('/login');
        });
    } else {
      $scope.vote--;
      apiservice.downVoteComment.save(comment,
        function(response) {
          console.log("Success downvoting Post",response);
        },
        function(err) {
          console.log("downVote error",err.data.console.code);
          $location.path('/login');
        });
    }
  }
  $scope.go = function(path,id) {
      console.log("profile is clicked",id,path);
      $location.path(path+id);
  };
  getComments();
  });
