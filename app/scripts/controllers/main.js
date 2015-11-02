'use strict';

/**
 * @ngdoc function
 * @name phApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the phApp
 */
angular.module('phApp.MainView',['ngRoute','ngStorage'])
  .controller('MainCtrl', function ($scope,$location,$rootScope,$localStorage,apiservice) {
     $scope.toggle = false;
     var item = function () {
     var posts = apiservice.getPosts.get(function() {
       $scope.result = posts.result;
       console.log("results",$scope.result);
     });
     }
     $scope.upVote = function (index) {
        $scope.toggle = !$scope.toggle;
        var post = {};
        post.post_id = index;
        $scope.result[index].vote++;
        if($scope.toggle) {
          $scope.vote++;
          apiservice.votePosts.save(post,
            function(response) {
              console.log("Success upvoting Post",response);
            },
            function(err){
              console.log("upVote error",err.data.error.code);
              $location.path('/login');
            });
        } else {
          $scope.vote--;
          apiservice.downVotePost.save(post,
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
       $location.path(path+id);
     }
     $scope.vote = 0;
     item();
  });
;
