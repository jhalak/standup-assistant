/**
 * Script for STDUP APP Admin
 * 
 * Created by - Onirudda Odikare 
 * 
 */

var admin = angular.module('Admin', ['ngResource'])
  .config(function($routeProvider){
  $routeProvider
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
  });
}
