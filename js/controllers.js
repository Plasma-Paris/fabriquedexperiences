'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

  .controller('ContactController', ['$scope', '$http', '$location', '$log', function($scope, $http, $location, $log) {



  }])

  .controller('SoonController', ['$scope', '$http', '$location', '$log', function($scope, $http, $location, $log) {



  }])

  .controller('HomeController', ['$scope', '$http', '$location', '$log', function($scope, $http, $location, $log) {

    //INIT INDEX PAGE
    $scope.LengthSlide = 0;
    $scope.AllSlidesJekyll = []; 
    $scope.AllSlidesHyde = [];
    $scope.CurrentSlide = 0;

    $scope.Loader = {                 
            'display': "block"
        };
       
    $scope.addElement = function(element) {
        var newElement = angular.copy(element);
        $scope.AllSlidesJekyll.push(newElement);
    };

    function LoadDataIndex(){
        //STATIC DATA INDEX PAGE
        $http.get('../datas/slides_home.json').success(function(data) {
            
            $scope.Loader = {                 
                'display': "none"
            };

            $scope.AllSlidesHyde = data;
            
            angular.forEach(data, function(item) {
              $scope.addElement(item);
            });

            $scope.LengthSlide = data.length;

            //SlideTo($scope.CurrentSlide);            
        });
    }

    LoadDataIndex();

    $scope.Previous = function(){
        //Slide("left");
        $scope.$broadcast('ManagerControllerPrevious', {
            data: "Previous"
        })
    }

    $scope.Next = function(){
        //Slide("right");
        $scope.$broadcast('ManagerControllerNext', {
            data: "Next"
        })
    }

    function SlideTo(currentSlide){

        if(currentSlide < 0 || currentSlide > $scope.LengthSlide-1)
        {
            currentSlide = 0;
        }

        if($scope.CurrentSlide!=currentSlide){
            $scope.AllSlidesHyde[$scope.CurrentSlide].active = false;
            $scope.AllSlidesJekyll[$scope.CurrentSlide].active = false;
        }

        $scope.CurrentSlide = currentSlide;

        $scope.AllSlidesHyde[$scope.CurrentSlide].active = true;
        $scope.AllSlidesJekyll[$scope.CurrentSlide].active = true;
    }

    function Slide(sens){
        var IndexTo = $scope.CurrentSlide;

        if(sens==="left"){
            if($scope.CurrentSlide == 0){
                IndexTo = $scope.LengthSlide-1;
            }
            else{
                IndexTo--;
            }
        }
        else{
            if($scope.CurrentSlide == $scope.LengthSlide-1){
                IndexTo = 0;
            }
            else{
                IndexTo++;
            }
        }
        
        SlideTo(IndexTo);
    }
    
  }]);