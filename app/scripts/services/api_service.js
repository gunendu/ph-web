'use strict';

angular.module("phApp.apiservice", [])
  .factory('apiservice', function($resource) {
      var resource = $resource('http://localhost:9005/user/save',{}, {
        post: {
          method:"POST",
          headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        },
      });
      return resource;
  });
