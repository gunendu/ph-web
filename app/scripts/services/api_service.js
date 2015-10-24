'use strict';

angular.module("phApp.apiservice", [])
  .factory('apiservice', function($resource) {
      var register = $resource('http://localhost:9005/user/save'),
          login = $resource('http://localhost:9005/user/login'),
          post = $resource('http://localhost:9005/user/post'),
          getPosts = $resource('http://localhost:9005/user/post');
      return {
        register: register,
        login: login,
        post: post,
        getPosts: getPosts
      };
  });
