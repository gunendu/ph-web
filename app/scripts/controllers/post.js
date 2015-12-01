'use strict';

var myapp = angular.module('phApp.PostView',['ngRoute','ngStorage'])

myapp.controller('PostCtrl', function($scope,$http,$localStorage,apiservice) {
    $scope.savePost = function (files) {
      var post = {};
      post.title = $scope.title;
      post.url = $scope.url;
      post.product_name = $scope.name;
      post.user_id = $localStorage.user_id;
      var fd = new FormData();
      angular.forEach($scope.files,function(file){
        fd.append('image',file);
      })

      fd.append('formdata',JSON.stringify(post));

      $http.post('http://localhost:9005/user/post', fd, {
          headers: {'Content-Type': undefined },
          transformRequest: angular.identity
      })
      .success(function(response) {
         console.log("response is",response);
      })
      .error(function(error){
        console.log("error uploading image",error);
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

myapp.directive('fileInput',['$parse',function($parse) {
  return {
    restrict:'A',
    link:function(scope,elm,attrs){
      elm.bind('change',function(){
        $parse(attrs.fileInput)
        .assign(scope,elm[0].files)
        scope.$apply()
      })
    }
  }
}]);
