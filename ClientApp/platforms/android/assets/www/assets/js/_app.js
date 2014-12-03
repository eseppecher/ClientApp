var myApp = angular.module('myApp', [
          'ngRoute', 
          'ngResource',
          'LocalStorageModule', // local storage. NOT USED ANYMORE. Should we keep it ?
          'ngSanitize',
          'google-maps',
           'angular-websql', //db
           'ngTouch', // allowing swipe
           'angular-carousel' //not in use to be used in a test of new line detail view
           
                        
          ]);
angular.module('MyApp', ['angular-carousel']);

myApp.config(['localStorageServiceProvider', function(localStorageServiceProvider){
	  localStorageServiceProvider.setPrefix('bonoway');
	  // localStorageServiceProvider.setStorageCookieDomain('example.com');
	  // localStorageServiceProvider.setStorageType('sessionStorage');
	}]);


