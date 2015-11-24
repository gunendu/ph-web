'use strict';

/**
 * @ngdoc overview
 * @name phApp
 * @description
 * # phApp
 *
 * Main module of the application.
 */
angular
  .module('phApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'phApp.LoginView',
    'phApp.RegisterView',
    'phApp.MainView',
    'phApp.PostView',
    'phApp.PostViewDetails',
    'phApp.apiservice'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/submit', {
        templateUrl: 'views/post.html',
        controller: 'PostCtrl',
        controllerAs: 'post'
      })
      .when('/postdetails/:post_id', {
        templateUrl: 'views/postdetails.html',
        controller: 'PostDetailsCtrl',
        controllerAs: 'postdetails'
      })
      .when('/profile', {
         templateUrl: 'views/profiledetails.html',
         controller: 'ProfileDetailsCtrl',
         controllerAs: 'profiledetails'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
