'use strict';

var myapp = angular.module("phApp.apiservice", ['ngStorage','ngResource'])

myapp.factory('apiservice', function($resource,$localStorage,$http) {
      $http.defaults.headers.common['access-token'] = $localStorage.accesstoken;
      var register = $resource('http://localhost:9005/user/login'),
          post = $resource('http://localhost:9005/user/post'),
          getPosts = $resource('http://localhost:9005/user/post'),
          votePosts = $resource('http://localhost:9005/user/vote'),
          downVotePost = $resource('http://localhost:9005/user/downvote'),
          comment = $resource('http://localhost:9005/user/comment'),
          getComments = $resource('http://localhost:9005/user/comment/:postid'),
          reply = $resource('http://localhost:9005/user/reply'),
          voteComment = $resource('http://localhost:9005/user/voteComment'),
          downVoteComment = $resource('http://localhost:9005/user/downVoteComment');
      return {
        register: register,
        post: post,
        getPosts: getPosts,
        votePosts: votePosts,
        downVotePost: downVotePost,
        comment: comment,
        getComments: getComments,
        reply: reply,
        voteComment: voteComment,
        downVoteComment: downVoteComment
      };
});
