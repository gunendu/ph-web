'use strict';

angular.module('phApp.PostViewDetails',['ngRoute','ngStorage','jkuri.gallery'])
  .controller('PostDetailsCtrl',function ($scope,$routeParams,$localStorage,$location,$window,apiservice,$document,$route) {
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
        $route.reload();
      },
      function(err) {
        console.log("error saving comment",err);
        $location.path('/login');
      });
  }
  var getComments = function() {
     var response = apiservice.getComments.get({postid:$scope.post_id},function() {
       $scope.comments = response.result;
       console.log("comments",$scope.comments);
       $scope.users = _.pluck(response.result.users,'profile_url');
       console.log("users are",$scope.users);
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
  $scope.upVoteComment = function(comment_id,flag) {
    var comment = {};
    comment.comment_id = comment_id;
    comment.user_id = $localStorage.user_id;
    console.log("comment object",comment);
    if(!flag) {
      apiservice.voteComment.save(comment,
        function(response) {
          console.log("Success upvoting Post",response);
          $route.reload();
        },
        function(err){
          console.log("upVote error",err.data.error.code);
          $location.path('/logout');
        });
    } else {
      apiservice.downVoteComment.save(comment,
        function(response) {
          console.log("Success downvoting Post",response);
          $route.reload();
        },
        function(err) {
          console.log("downVote error",err.data);
          $location.path('/logout');
        });
    }
  }

  $scope.upVoteReply = function(reply_id,comment_id,flag) {
    var reply = {};
    reply.reply_id = reply_id;
    reply.comment_id = comment_id;
    reply.user_id = $localStorage.user_id;
    if(!flag) {
      apiservice.voteReply.save(reply,
        function(response) {
          console.log("Success upvoting Post",response);
          $route.reload();
        },
        function(err){
          console.log("upVote error",err.data.error.code);
          $location.path('/login');
        });
    } else {
      apiservice.downVoteReply.save(reply,
        function(response) {
          console.log("Success downvoting Post",response);
          $route.reload();
        },
        function(err) {
          console.log("downVote error",err.data);
          $location.path('/logout');
        });
    }
  }

  $scope.facebookshare = function() {
    FB.ui({
      method: 'feed',
      link: 'https://www.producthunt.com/tech/startup-stash',
      caption: 'An example caption',
    }, function(response){});
  }

  $scope.go = function(path,id) {
      console.log("profile is clicked",id,path);
      $location.path(path+id);
  };

  $scope.hoverIn = function(url,e) {
    console.log("tag is",url,e.currentTarget);
    var content = "<img src='" + url + "' />" + e.currentTarget.innerHTML;
    tooltip.pop(e.currentTarget,content);
  };

  getComments();
  });
