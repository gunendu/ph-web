'use strict';

angular.module('phApp.PostViewDetails',['ngRoute','ngStorage','jkuri.gallery'])
  .controller('PostDetailsCtrl',function ($scope,$routeParams,$localStorage,$location,$window,apiservice,$document) {
    $scope.images = [
      {thumb: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/p50x50/1507900_10151842209257595_366437610_n.jpg?oh=80e3e1aa9fd6c02ef7cfce5d10235b4a&oe=56ED109E&__gda__=1458131288_008a7a036f2d466466f2fa2298717d81', img: 'https://staging-zipprmedia.s3.amazonaws.com/images/hamlet1.png', description: 'Image 1'},
      {thumb: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/p50x50/1507900_10151842209257595_366437610_n.jpg?oh=80e3e1aa9fd6c02ef7cfce5d10235b4a&oe=56ED109E&__gda__=1458131288_008a7a036f2d466466f2fa2298717d81', img: 'https://staging-zipprmedia.s3.amazonaws.com/images/zippr.jpeg', description: 'Image 2'}
    ];
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
