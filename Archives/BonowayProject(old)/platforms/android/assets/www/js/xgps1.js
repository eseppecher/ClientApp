///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////     GPS FUNCTIONS        /////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
    function gpsTriger(){ //setting up all variables involved and launching GPS query
    	CurrentLatitude = 0;
    	CurrentLongitude = 0;
    	CurrentAltitude = 0;
    	CurrentAccuracy = 0;
    	accuracy = 1000;
    	bestaccuracy = 1000;
    	gpsoff = false;
    	navigator.geolocation.getCurrentPosition(gpsOptimisation, onError, {maximumAge: 0, timeout: 5000000, enableHighAccuracy: true});
    }
    
    function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
 
    function gpsOptimisation(position) {
   	accuracy = position.coords.accuracy; 
    if(gpsoff == true){
    	alert("gps off");
    	return;
    }

   	if(accuracy<=2){ // A partir d'une prŽcision limite ici 2 on stop l'optimisation
   		gpsResults(position); 
   		}
   	else{ // Sinon on continue l'optimisation
   		if(accuracy<bestaccuracy){ // si la dernire requete est la plus prŽcise alors elle est mŽmorisŽe.
              CurrentLatitude = position.coords.latitude;
              CurrentLongitude = position.coords.longitude;
              CurrentAltitude = position.coords.altitude;
              CurrentAccuracy = position.coords.accuracy; 
   		      bestaccuracy = accuracy;
   		      
   		     var elementgps = document.getElementById('gpssection');
   		     //affichage de la precision dans l'onglet gpssection
   		     if(bestaccuracy<=2){
   		     	elementgps.innerHTML = '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">' + bestaccuracy + 'm </div>';
   		     	
   		     } else{ if(bestaccuracy<=3){	
   		     	elementgps.innerHTML = '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 90%;">' + bestaccuracy + 'm </div>';
   		     } else{ if(bestaccuracy<=4){	
   		     	elementgps.innerHTML = '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 85%;">' + bestaccuracy + 'm </div>';
   		     } else{ if(bestaccuracy<=5){	
   		     	elementgps.innerHTML = '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 80%;">' + bestaccuracy + 'm </div>';
   		     } else{ if(bestaccuracy<=7){
   		      	elementgps.innerHTML = '<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 70%;">' + bestaccuracy + 'm </div>';
   		     } else{ if(bestaccuracy<=10){
   		      	elementgps.innerHTML = '<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">' + bestaccuracy + 'm </div>';
   		     } else{ if(bestaccuracy<=15){
   		      	elementgps.innerHTML = '<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 50%;">' + bestaccuracy + 'm </div>';
   		     } else{ if(bestaccuracy<=20){
   		      	elementgps.innerHTML = '<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 40%;">' + bestaccuracy + 'm </div>';
   		     } else{ if(bestaccuracy<=40){
   		      	elementgps.innerHTML = '<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 30%;">' + bestaccuracy + 'm </div>';
   		     } else{ if(bestaccuracy<=60){
   		      	elementgps.innerHTML = '<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 20%;">' + bestaccuracy + 'm </div>';
   		     } else{ if(bestaccuracy<=100){
   		      	elementgps.innerHTML = '<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 10%;">' + bestaccuracy + 'm </div>';
               }}}}}}}}}}}   		
   		   		  } 	
          navigator.geolocation.getCurrentPosition(gpsOptimisation, onError, {maximumAge: 0, timeout: 5000000, enableHighAccuracy: true});


      }
   } 
   
    function gpsResults(position) {
          CurrentLatitude = position.coords.latitude;
          CurrentLongitude = position.coords.longitude;
          CurrentAltitude = position.coords.altitude;
          CurrentAccuracy = position.coords.accuracy;        
    }