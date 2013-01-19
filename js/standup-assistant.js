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
  $scope.talents = AllTalents;
  $scope.projects = AllProjects;
}

function ReportController() {
  var $html = '<ul>';
  $('.project').each(function(){
      var $proj = $(this);
      $html += '<li class="proj-name">' + $proj.attr('name') + '</li>';
      $html += '<ul>';
      $proj.find('li').each(function(idx) {
        $html += '<li>' + $(this).attr('name') + '</li>';
      });
      $html += '</ul>';
  });
  $html += '</ul>';
  $('#report').html($html).dialog();
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
