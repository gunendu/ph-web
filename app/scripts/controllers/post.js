'use strict';

var myapp = angular.module('phApp.PostView',['ngRoute'])

myapp.controller('PostCtrl', function($scope,$http,apiservice) {
    $scope.savePost = function (files) {
      console.log("files is",files[0],files[1]);
      var post = {};
      post.title = $scope.Title;
      post.url = $scope.Url;
      console.log("post is",post);
      apiservice.post.save(post,function(response) {
        console.log("post is",response);
      });
    };

    $scope.uploadFile = function(files) {
        console.log(files);
        var fd = new FormData();
        fd.append("file", files[0],files[1]);

        $http.post('http://localhost:9005/user/image', fd, {
            withCredentials: true,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        })
    };
});

myapp.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);
