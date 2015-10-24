'use strict'

var app = angular.module('phApp', ['ngResource']);

app.factory("phApi", function($resource) {
   var User = $resource("localhost:9005/api/users");
   return {
     User: User
   }
});
