'use strict';

angular.module("phApp.apiservice", [])
  .factory('apiservice', function($resource) {
      var register = $resource('http://localhost:9005/user/save'),
          login = $resource('http://localhost:9005/user/login'),
          post = $resource('http://localhost:9005/user/post'),
          getPosts = $resource('http://localhost:9005/user/post'),
          votePosts = $resource('http://localhost:9005/user/vote'),
          downVotePost = $resource('http://localhost:9005/user/downvote'),
          comment = $resource('http://localhost:9005/user/comment'),
          getComments = $resource('http://localhost:9005/user/comment/:postid');
      return {
        register: register,
        login: login,
        post: post,
        getPosts: getPosts,
        votePosts: votePosts,
        downVotePost: downVotePost,
        comment: comment,
        getComments: getComments
      };
  });
