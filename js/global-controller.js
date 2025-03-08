'use strict';

/* Global Controller */

angular.module('myApp.globalController', []).
  controller('MainController', ['$scope', '$http', '$log', '$location', '$window', function($scope, $http, $log, $location, $window) {

  	// INIT GLOBAL
    $scope.FilterIsOpen = false;

    // MENU NAV INDICATOR
    $scope.getClass = function(path) {
        if ($location.path().substr(0, path.length) == path) {
          return "current"
        } else {
          return ""
        }
    }

    // GLOBAL METHODE
    $scope.GetStateFilter = function(){
        if( $scope.FilterIsOpen ){
            return "filter_deploy";
        } else{
            return "";
        }
    }
    
    $scope.OpenFilter = function(){
        $scope.FilterIsOpen = !$scope.FilterIsOpen;
        init();
    }
    // END GLOBAL METHODE

    /* lors du resize de la fenetre - migration vers angularjs */

    var racine2_2 = Math.sqrt(2);
    var valueSizeCorner = 90;
    var get_hippon = 0;

    var computeWidth = function() {
        return window.innerWidth;
    };

    var computeHeight = function() {
        return window.innerHeight;
    };
    
    function init(){
        var offset = 0;
        var delta = offset / 2;
        
        var h = computeHeight()-offset;
        var w = computeWidth()-offset;
                
        var h2 = (h/2.0)*(h/2.0);
        var w2 = (w/2.0)*(w/2.0);

        /* on définit la hauteur du carré vert - Pythagore */
        var hv = Math.sqrt(h2+w2)*2 ;
        
        var green_top = delta-((hv-h)/2);
        var green_left = delta-((hv-w)/2);     
        
        var H = racine2_2*hv;
        var bout = (H-h)/2;
        var bout2gauche = bout-w/2;
        //var hippon = Math.sqrt(bout2gauche * bout2gauche + bout2gauche*bout2gauche)/2;
        var hippon = bout2gauche/racine2_2;
        
        var big = w/h;
        var f = hv/2;
        // g => cos (alpha) = w/ hv;
        var g= bout2gauche; // 
        
        var w_filter = 0; // init
        var h_filter = 0; // init

        var dif = hippon;
        get_hippon = hippon;
                                   
        var milieu = (hv/2);
        var milieu_left = milieu;// + green_left;
        var milieu_top = milieu;// + green_top;
        
        var right_top = (h/2);//+(hv-h)/2;
        var right_left = (w/2);// +(hv-w)/2;
        
        //DEFINITION VALEUR NG-STYLE 

        $scope.StyleBigContainer = {height: h + 'px' , width: w + 'px'}; 
        $scope.StyleBackground = {height: h + 'px' , width: w + 'px' , top: delta + 'px', left: delta + 'px'}; 

        $scope.StyleInnerFilter = {
            top: (hv-h)/2 + 'px', 
            left: (hv-w)/2 + 'px', 
            height: h + 'px', 
            width: w + 'px',
            '-webkit-transform-origin': right_left + "px " + right_top + "px",
            '-ms-transform-origin': right_left + "px " + right_top + "px",
            '-moz-transform-origin': right_left + "px " + right_top + "px",

        };

        $scope.StyleInnerBackground = {
            height: h + 'px', 
            width: w + 'px'
        }; 


            //version Dr Jekyll
            h_filter = valueSizeCorner+hippon;

            $scope.StyleFilterJekyll = {
                height: hv + 'px' , 
                top: green_top + 'px', 
                left: green_left + 'px', 
                width: h_filter + 'px', 
                '-webkit-transform-origin': milieu_left+"px "+milieu_top+"px",
                '-moz-transform-origin': milieu_left+"px "+milieu_top+"px",
                '-ms-transform-origin': milieu_left+"px "+milieu_top+"px"
            };

            //version Mr Hyde
            w_filter = hv - (valueSizeCorner*2); 

            $scope.StyleFilterHyde = {
                height: hv + 'px' , 
                top: green_top + 'px', 
                left: green_left + 'px', 
                width: w_filter + 'px', 
                '-webkit-transform-origin': milieu_left+"px "+milieu_top+"px",
                '-moz-transform-origin': milieu_left+"px "+milieu_top+"px",
                '-ms-transform-origin': milieu_left+"px "+milieu_top+"px"
            };

        $scope.StyleSliderIndex = {
            height: h * 95 / 100 + 'px',
            width: w * 95 / 100 + 'px'
        }
        
    }

    init();

    angular.element(window).bind('resize', function() {
        init();        
        $scope.$apply();
    });
    
    $scope.GetStyleFilter = function(){
        if($scope.FilterIsOpen == false){
            return $scope.StyleFilterJekyll;
        }
        else{
            return $scope.StyleFilterHyde;
        }
    }

  }]);