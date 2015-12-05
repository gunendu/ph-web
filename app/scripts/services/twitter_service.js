'use strict';

var myapp = angular.module("phApp.twitterservice", ['ngStorage','ngResource']);

myapp.factory('twitterservice', function($resource,$localStorage,$q) {
  var authorizationResult = false;
    return {
        initialize: function() {
            //initialize OAuth.io with public key of the application
            OAuth.initialize('O-MwMJmmXGsJEbOAVjvgcKPFcto', {cache:true});
            //try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
            authorizationResult = OAuth.create('twitter');
        },
        isReady: function() {
            return (authorizationResult);
        },
        connectTwitter: function() {
            var deferred = $q.defer();
            OAuth.popup('twitter', {cache:true}, function(error, result) { //cache means to execute the callback if the tokens are already present
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
            //create a deferred object using Angular's $q service
            var deferred = $q.defer();
            var promise = authorizationResult.get('/1.1/statuses/home_timeline.json').done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
                //when the data is retrieved resolved the deferred object
                deferred.resolve(data)
            });
            //return the promise of the deferred object
            return deferred.promise;
        },
        getUserDetails: function () {
          var deferred = $q.defer();
          var promise = authorizationResult.get('/1.1/account/verify_credentials.json').done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/account/verify_credentials
            console.log("userdetails",data);
            deferred.resolve(data)
          });
          return deferred.promise;
        }
    }
});