'user strict';

angular.module('phApp.PostView',['ngRoute'])
  .controller('PostCtrl', function($scope,apiservice) {
    $scope.savePost = function () {
      var post = {};
      post.title = $scope.Title;
      post.url = $scope.Url;
      console.log("post is",post);
      apiservice.post.save(post,function(response) {
        console.log("post is",response);
      });
    };
  });
