///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////     GPS FUNCTIONS        /////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 

 
 
    function gpsTriger(){ //setting up all variables involved and launching GPS query
        time = new Date().getTime();
    	CurrentLatitude = 0;
    	CurrentLongitude = 0;
    	CurrentAltitude = 0;
    	CurrentAccuracy = 0;
    	accuracy = 1000;
    	bestaccuracy = 1000;
    	gpsoff = false;
    	list = [];
    	historic = [];
    	//Computed point with level 2 methode

    	OptimalAccuracy = 100;
    	navigator.geolocation.getCurrentPosition(gpsOptimisation, onError, {maximumAge: 0, timeout: 5000000, enableHighAccuracy: true});
    }
    
    function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
 
    function gpsOptimisation(position) {
   	accuracy = position.coords.accuracy;
	document.getElementById('iteration').innerHTML = "Iteration : " + list.length;
	n = (new Date().getTime()-time)/1000;
	document.getElementById('runtime').innerHTML = "Runtime : " + n;
    historic.push([n, position.coords.accuracy]);

   	if(list.length===0){  		
	   	list.push([position.coords.latitude,position.coords.longitude,position.coords.altitude,position.coords.accuracy]);
   	}
   	else{
   		if(!((position.coords.latitude == list[list.length-1][0])||(position.coords.longitude == list[list.length-1][1])||(position.coords.longitude == list[list.length-1][2]))){
   			alert("Iteration différente!!!!");
	   		list.push([position.coords.latitude,position.coords.longitude,position.coords.altitude,position.coords.accuracy]);
	    	OptimalLatitude = 0;
    		OptimalLongitude = 0;
    		OptimalAltitude = 0;
    		OptimalAccuracy = 0;
    		SumAccuracy = 0;
	   		for(var i=0;i<list.length;i++){
	   			OptimalLatitude = OptimalLatitude + list[i][0]*list[i][3];
    			OptimalLongitude = OptimalLongitude + list[i][1]*list[i][3];
    			OptimalAltitude = OptimalAltitude + list[i][2]*list[i][3];
    			OptimalAccuracy = OptimalAccuracy + 1/list[i][3];
    			SumAccuracy = SumAccuracy +  list[i][3];
	   		}
	   		
	   		OptimalLatitude = OptimalLatitude / SumAccuracy;
    		OptimalLongitude = OptimalLongitude / SumAccuracy;
    		OptimalAltitude = OptimalAltitude / SumAccuracy;
    		OptimalAccuracy = 1/OptimalAccuracy;
	   		  
	   		  document.getElementById('accuracy').innerHTML = "Accuracy : " + accuracy + " / " + OptimalAccuracy;
 		
  	 	}
    }

    if(gpsoff == true){
    	alert("gps off");
    	return;
    }

   	if(accuracy<=2){ // A partir d'une précision limite ici 2 on stop l'optimisation
   		gpsResults(position); 
   		}
   	else{ // Sinon on continue l'optimisation
   		if(accuracy<bestaccuracy){ // si la dernière requete est la plus précise alors elle est mémorisée.
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