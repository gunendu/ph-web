'use strict'

var app = angular.module('phApp', ['ngResource']);

app.factory("phApi", function($resource) {
   var User = $resource("localhost:9001/api/users");
   return {
     User: User
   }
});
