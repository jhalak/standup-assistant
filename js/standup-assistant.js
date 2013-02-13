/**
 * Script for STDUP APP
 * 
 * Created by - Onirudda Odikare 
 * 
 */

/* Module */
angular.module('Standup Assistant', ['ngResource']);

/* Controller */
function SaController($scope, $resource) {
  $resource('api/:action', 
      {action:'index.php', q: 'all', callback: 'JSON_CALLBACK'},
      {get:{method:'JSON'}}
  )
  .get(function(result){
    $scope.projects = result.projects;
    $scope.talents = result.talents;
    setTimeout('SaUi()', 100);
  });
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
