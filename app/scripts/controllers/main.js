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
     console.log("localStorage data",$localStorage.accesstoken,$localStorage.username);
     var item = function () {
     var posts = apiservice.getPosts.get(function() {
       console.log("rootScope",$rootScope.user);
       console.log("entries",posts.result);
       $scope.result = posts.result;
     });
     }
     $scope.upVote = function (index) {
        $scope.toggle = !$scope.toggle;
        var post = {};
        post.post_id = index;
        console.log("upvote index is",index,$scope.toggle);
        if($scope.toggle) {
          $scope.vote++;
          apiservice.votePosts.save(post,function(response) {
            console.log("response is",response);
          });
        } else {
          $scope.vote--;
          apiservice.downVotePost.save(post,function(response) {
            console.log("down vote response",response);
          });
        }
     }
     $scope.go = function(path,id) {
       console.log("item id",id);
       $location.path(path+id);
     }
     $scope.vote = 0;
     item();
  });
;
