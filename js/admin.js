/**
 * Script for STDUP APP Admin
 * 
 * Created by - Onirudda Odikare 
 * 
 */

var admin = angular.module('Admin', ['ngResource']);

admin.config(function($routeProvider){
  $routeProvider
    .when('/talents', {templateUrl: 'partials/talents.html', controller: 'TalentController'})
    .otherwise({redirectTo: '/dashboard', templateUrl: 'partials/dashboard.html'})
    
});

admin.factory('adminService', function() {
  var service = {};
  
  return service;
});

admin.directive('editInPlace', ['$http', function($http){
    
    function updateTalent($model) {
      var url = 'api/index.php/talent/update';
      $http({
          method: 'PUT',
          url: url,
          data: $model
      }).success(function () {
        
      });
    } 
  
    return {
      restrict: 'E',
      scope: { model: '@model', value: '@value', update: '@update' },
      template: '<span ng-click="edit()" ng-bind="value"></span><input ng-model="value"></input>',
      link: function ( $scope, element, attrs ) {
        // Let's get a reference to the input element, as we'll want to reference it.
        var inputElement = angular.element( element.children()[1] );
        
        // This directive should have a set class so we can style it.
        element.addClass( 'edit-in-place' );
        
        // Initially, we're not editing.
        $scope.editing = false;
        
        // ng-click handler to activate edit-in-place
        $scope.edit = function () {
          $scope.editing = true;
          // We control display through a class on the directive itself. See the CSS.
          element.addClass( 'active' );
          
          // And we must focus the element. 
          // `angular.element()` provides a chainable array, like jQuery so to access a native DOM function, 
          // we have to reference the first element in the array.
          inputElement[0].focus();
        };
        
        // When we leave the input, we're done editing.
        inputElement.prop( 'onblur', function() {
          $scope.editing = false;
          var model = JSON.parse($scope.model);
          var name = model.name;
          var email = model.email;
          if ($scope.update == "name") {
            name = $scope.value;
          }
          if ($scope.update == "email") {
            email = $scope.value;
          }
          var data = {
              id : model.id,
              name: name,
              email: email
          };
          updateTalent(data);
          element.removeClass( 'active' );
        });
      }
    };
}]);



function TalentController($scope, $resource){
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
