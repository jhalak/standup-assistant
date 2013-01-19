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
    { 'id': 1, 'name' : Anik},
    { 'id': 2, 'name' : Ashraf},
    { 'id': 3, 'name' : Bazlur},
    { 'id': 4, 'name' : Farhan},
    { 'id': 5, 'name' : Gazi},
    { 'id': 6, 'name' : Habib},
    { 'id': 7, 'name' : Hasin},
    { 'id': 8, 'name' : Hasinur},
    { 'id': 9, 'name' : Irfan},
    { 'id': 10, 'name' : Jhalak},
    { 'id': 11, 'name' : Kamal},
    { 'id': 12, 'name' : Khair},
    { 'id': 13, 'name' : Lenin},
    { 'id': 14, 'name' : Mahfuz},
    { 'id': 15, 'name' : Mosaddek},
    { 'id': 16, 'name' : Munshi},
    { 'id': 17, 'name' : Muntasim},
    { 'id': 18, 'name' : Mushfiq},
    { 'id': 19, 'name' : Nurul},
    { 'id': 20, 'name' : Rafiqul},
    { 'id': 21, 'name' : Rakib},
    { 'id': 22, 'name' : Rifat},
    { 'id': 23, 'name' : Rinku},
    { 'id': 24, 'name' : Sakib},
    { 'id': 25, 'name' : Shahjahan},
    { 'id': 26, 'name' : Talha},
    { 'id': 27, 'name' : Tanzim},
    { 'id': 28, 'name' : Tariq},
    { 'id': 29, 'name' : Wasiqul},
    { 'id': 30, 'name' : Younus}
  ];
  $scope.projects = [
    { 'id': 1, 'name' : Moteel},
    { 'id': 2, 'name' : Raakib},
    { 'id': 3, 'name' : Al-Khudair},
    { 'id': 4, 'name' : Al-Khudair mobile},
    { 'id': 5, 'name' : OpenBravo},
    { 'id': 6, 'name' : Ma7mi},
    { 'id': 7, 'name' : HR},
    { 'id': 8, 'name' : System Admin & Support},
    { 'id': 9, 'name' : Absent During Meeting},
    { 'id': 10, 'name' : Absent But Informed},
    { 'id': 11, 'name' : On leave}
  ];
}

function ReportController() {
  var $html = '<ul>';
  $('.project').each(function(){
      var $proj = $(this);
      $html += '<li>' + $proj.attr('name') + '</li>';
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