'use strict';

angular.module('phApp.ProfileView',['ngRoute','ngStorage'])
  .controller('ProfileCtrl', function ($scope,$location,$routeParams,$localStorage,apiservice) {
    $scope.user_id = $routeParams.user_id;
    $scope.username = $localStorage.username;
    $scope.name = $localStorage.name;
    $scope.user_id = $localStorage.user_id;
    $scope.profile_url = $localStorage.profile_url;
    console.log("userid is",$scope.user_id,$scope.username,$scope.profile_url);
    var UserVotedPost = function() {
      var posts = apiservice.getUserDetails.get({userid:$scope.user_id},function() {
        $scope.result = posts.result;
        console.log("results",posts);
      });
    }
    $scope.go = function(path,id) {
        console.log("profile is clicked",id,path);
        $location.path(path+id);
    };
    UserVotedPost();
});
