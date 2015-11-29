'use strict';

/**
 * @ngdoc function
 * @name phApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the phApp
 */
angular.module('phApp.MainView',['ngRoute','ngStorage'])
  .controller('MainCtrl', function ($route,$scope,$location,$rootScope,$localStorage,apiservice) {
     $scope.toggle = false;
     var item = function () {
      console.log("userid is",$localStorage.user_id);
       var posts = apiservice.getPosts.get({userid:$localStorage.user_id},function() {
       $scope.result = posts.result;
       console.log("results",$scope.result);
     });
     }
     $scope.upVote = function (index,flag) {
        $scope.toggle = !$scope.toggle;
        var post = {};
        post.post_id = index;
        post.user_id = $localStorage.user_id;
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
          console.log("down vote is called");
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
     $scope.vote = 0;
     item();
});
