angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$state,$http) { 
        $scope.info="grayscale";     
          $scope.favorit="grayscale";  
            $scope.food="grayscale";  
              $scope.settings="grayscale";   
              $scope.infoText="#009900";
              $scope.infoFavorit="#009900";


  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) { 
  //});
 
   $scope.openState = function (state) {  
      if(state=="app.home"){ 
        $scope.info="";  
           $scope.favorit="grayscale";   
               $scope.infoFavorit="dimgrey";  
          $scope.activities="grayscale";  
            $scope.food="grayscale";  
              $scope.settings="grayscale";   


      }

           if(state=="app.favorites"){ 
        $scope.info="grayscale";  
         $scope.infoText="dimgrey";

           $scope.favorit="";                
              $scope.infoFavorit="#009900";
          $scope.activities="grayscale";  
            $scope.food="grayscale";  
              $scope.settings="grayscale";    
                }

      alert(state);
     $scope.klasa
      $state.go(state);
    };
 
})

 