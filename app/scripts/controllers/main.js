'use strict';

/**
 * @ngdoc function
 * @name phApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the phApp
 */
angular.module('phApp.MainView',['ngRoute'])
  .controller('MainCtrl', function ($scope,$location,apiservice) {
     var item = function () {
     var posts = apiservice.getPosts.get(function() {
       console.log("entries",posts.result);
       $scope.result = posts.result;
     });
     }
     $scope.upVote = function (index) {
        console.log("upvote index is",index);
        var post = {};
        post.post_id = index;
        apiservice.votePosts.save(post,function(response){
          console.log("response is",response);
        });
        $scope.vote++;
     }
     $scope.downVote = function (index) {
       console.log("downvote index is",index);
       var post = {};
       post.post_id = index;
       apiservice.downVotePost.save(post,function(response) {
         console.log("down vote response",response);
       });
       $scope.vote--;
     }
     $scope.go = function(path,id) {
       console.log("item id",id);
       $location.path(path+id);
     }
     $scope.vote = 0;
     item();
  });
