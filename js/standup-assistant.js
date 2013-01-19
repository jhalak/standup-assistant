/**
 * Script for STDUP APP
 * 
 * Created by - Onirudda Odikare 
 * 
 */


/* Controller */
function RouteController($scope,$location){
  $scope.setRoute = function(route){
    $location.path(route);
  }
}

function SaController($scope,$routeParams,SA) {
  $scope.talents = [
                    {
                      'id' : 1,
                      'name': 'Bazlur'
                    },
                    {
                      'id' : 2,
                      'name': 'Jhalak'
                    },
                    {
                      'id' : 3,
                      'name': 'Jitu'
                    },
                    {
                      'id' : 4,
                      'name': 'Sakib'
                    }
  ];
  $scope.projects = [
                   {
                     'id' : 1,
                     'name' : 'Al Khudair',
                   },
                   {
                     'id' : 2,
                     'name' : 'Moteel',
                   }
  ];
}

function generateReport() {
  $('.project').each(function(){
      var $proj = $(this);
      $proj.find('li').each(function(idx) {
        console.log('Project' + $proj.attr('name') + $(this).attr('name'));
    });
  });
}

/* Module */
angular.module('standup-assistant', ['saModel']).
  config(['$routeProvider',function($routeProvider) {
    $routeProvider
      .otherwise({templateUrl:'partials/home.html',controller:SaController});
}]);

/* Model */
var model = angular.module('saModel', ['ngResource']);

model.factory('SA', function($resource) {
  
});