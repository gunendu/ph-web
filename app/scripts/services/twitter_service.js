'use strict';

var myapp = angular.module("phApp.twitterservice", ['ngStorage','ngResource']);

myapp.factory('twitterservice', function($resource,$localStorage,$q) {
  var authorizationResult = false;
    return {
        initialize: function() {
            OAuth.initialize('O-MwMJmmXGsJEbOAVjvgcKPFcto', {cache:true});
            authorizationResult = OAuth.create('twitter');
        },
        isReady: function() {
            return (authorizationResult);
        },
        connectTwitter: function() {
            var deferred = $q.defer();
            OAuth.popup('twitter', {cache:true}, function(error, result) {
                if (!error) {
                    authorizationResult = result;
                    deferred.resolve();
                } else {
                    console.log("error authorising user");
                }
            });
            return deferred.promise;
        },
        clearCache: function() {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        },
        getLatestTweets: function () {
            var deferred = $q.defer();
            var promise = authorizationResult.get('/1.1/statuses/home_timeline.json').done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
                deferred.resolve(data)
            });
            return deferred.promise;
        },
        getUserDetails: function () {
          var deferred = $q.defer();
          var promise = authorizationResult.get('/1.1/account/verify_credentials.json?include_email=true').done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/account/verify_credentials
            console.log("userdetails",data);
            deferred.resolve(data)
          });
          return deferred.promise;
        }
    }
});
