'use strict';

/**
 * @ngdoc function
 * @name phApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the phApp
 */
angular.module('phApp.MainView',['ngRoute'])
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
