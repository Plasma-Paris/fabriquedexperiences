'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'myApp.globalController', 'ui.bootstrap'])
  .config(['$routeProvider', function($routeProvider) {  	
    $routeProvider.when('/home', {templateUrl: 'partials/_home.html', controller: 'HomeController'});
    $routeProvider.when('/contact', {templateUrl: 'partials/_contact.html', controller: 'ContactController'});
    $routeProvider.when('/soon', {templateUrl: 'partials/_soon.html', controller: 'SoonController'});
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);
