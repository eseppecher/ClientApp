///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////        Initialize the APP           //////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
var name = "";
document.addEventListener("deviceready", onDeviceReady, false);
    
function onDeviceReady() {
	var db = window.openDatabase("condiDB", "1.0", "CondiDB", 1000000);
    var query = "SELECT name FROM sqlite_master WHERE type='table' AND name='config'" ;
    db.transaction(function (tz){ tz.executeSql(query, [], onSuccess, onError )});    
}

function onError() {alert("error");}
   
function onSuccess(tx, results) {

//ATTENTION//////////////////////////
	// pour tester l'initialization inverser la condition suvante

	if(results.rows.length!==1){
		initialize();	
	} 
}
		
function initialize() {
	var element = document.getElementById('overlay');
	element.innerHTML += '<form role="form" class="initialize" name="myform" action="javascript:void(0);">'+ 
		'<img src="img/intro.png" height="150">' +
		'<br> <h3>Adopte un pseudo :</h3> <div class="form-group">  <input type="text" class="form-control" name="name" placeholder="..." required> </div>' +
		"<br> <button type='submit' id='submeat' class='btn btn-condi btn-lg' onclick='configure()'> Decouvre l'APP </button>";
	var elt = document.getElementById('design');
	elt.innerHTML = "#overlay {z-index: 10; color: #FEFEFE; position: fixed; width: 100%; height: 100%; text-align: center; background-color: rgba(206, 206, 206, 0.8);}";
}
	
function configure(myform){		
	name = document.myform.name.value;
	if(name!==""){
		var db = window.openDatabase("condiDB", "1.0", "CondiDB", 1000000);
		db.transaction(createConfig, onError, prefill);
	}
	else{
		alert("Vous devez choisir un pseudo");
		return;
	} 
}	
	
function createConfig(tx) {
	tx.executeSql('DROP TABLE IF EXISTS config');
	tx.executeSql('CREATE TABLE IF NOT EXISTS config (name varchar(255))');
}
    
function prefill(){
    var db = window.openDatabase("condiDB", "1.0", "CondiDB", 1000000);
	db.transaction(fillConfig, onError, Success);
}

function fillConfig(tx) { tx.executeSql('INSERT INTO config (name) VALUES ("' + name + '")'); }
	
function Success(){

	window.location.href = "demo.html";

}