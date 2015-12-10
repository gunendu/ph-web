'use strict';

/**
 * @ngdoc function
 * @name phApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the phApp
 */
angular.module('phApp.MainView',['ngRoute','ngStorage','ngSanitize'])
  .controller('MainCtrl', function ($route,$scope,$location,$rootScope,$localStorage,apiservice,$sce) {
     $scope.profile_url = $localStorage.profile_url;
     console.log("profile_url is",$scope.profile_url);
     $scope.trustSrc = function(src) {
       return $sce.trustAsResourceUrl($scope.profile_url);
     }
     var item = function () {
       var posts = apiservice.getPosts.get({userid:$localStorage.user_id},function() {
       console.log("posts",posts.result);
       $scope.result = posts.result;
     });
     }
     $scope.upVote = function (index,flag) {
        $scope.toggle = !$scope.toggle;
        var post = {};
        post.post_id = index;
        post.user_id = $localStorage.user_id;
        console.log("upvote object",post);
        if(!flag) {
          apiservice.votePosts.save(post,
            function(response) {
              console.log("Success upvoting Post",response);
              $route.reload();
            },
            function(err) {
              console.log("upVote error",err.data.error.code);
              $location.path('/login');
            });
        } else {
          apiservice.downVotePost.save(post,
            function(response) {
              console.log("Success downvoting Post",response);
              $route.reload();
            },
            function(err) {
              console.log("downVote error",err.data.console.code);
              $location.path('/login');
            });
        }
     }
     $scope.go = function(path,id) {
       $location.path(path+id);
     }
     $scope.profile = function(path,param) {
       console.log("path and param",path,param,$localStorage.username);
       $location.path(path+param)
     }
     $scope.vote = 0;
     item();
});
