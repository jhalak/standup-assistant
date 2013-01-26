/**
 * Script for STDUP APP
 * 
 * Created by - Onirudda Odikare 
 * 
 */

/* Module */
angular.module('standup-assistant', ['ngResource']).
  config(['$routeProvider',function($routeProvider) {
    $routeProvider
      .otherwise({templateUrl:'partials/home.html',controller:SaController});
}]);

/* Controller */
function RouteController($scope,$location){
  $scope.setRoute = function(route){
    $location.path(route);
  }
}

function SaController($scope) {
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

function addProject(name){
  //console.log(name);
}