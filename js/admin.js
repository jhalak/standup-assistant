/**
 * Script for STDUP APP Admin
 * 
 * Created by - Onirudda Odikare 
 * 
 */

var admin = angular.module('Admin', ['ngResource'])
  .config(function($routeProvider){
  $routeProvider
    .when('/projects', {templateUrl: 'partials/projects.html', controller: 'projectController'})
    .when('/talents', {templateUrl: 'partials/talents.html', controller: 'talentController'})
    .otherwise({redirectTo: '/dashboard', templateUrl: 'partials/dashboard.html'})
    
});

function talentController($scope, $resource){
  $resource('api/:action', 
    {
      action:'index.php',
      q:'talents',
      callback:'JSON_CALLBACK'
    },
    {
      get:{method:'JSON'}
    }
  ).get(function(result){
    $scope.talents = result;
    $scope.myData = [{name: "Moroni", age: 50},
                     {name: "Tiancum", age: 43},
                     {name: "Jacob", age: 27},
                     {name: "Nephi", age: 29},
                     {name: "Enos", age: 34}];
    $scope.gridOptions = { data : 'myData' };
  });
}

function projectController($scope, $resource){
  $.getScript('js/lib/kendoui/kendo.all.min.js');
  $.getScript('js/manage.project.js');
  
}