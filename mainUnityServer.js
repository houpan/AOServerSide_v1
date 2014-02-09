//TCP side
var tcp = require("./LighterWebPlatform/LighterWebEngine/TCP");  
var hSocketOutside;

tcp.CreateServer(10000,  
    function(){ 
        console.log("Initialization");
    },  
    function(hSocket, sBuffer){//接收！
        console.log("接收！"+sBuffer);
/*
		JSON decoding example
        var obj = JSON.parse(sBuffer);
        console.log(obj.author.name);
*/
    },  
    function(hSocket){//斷開連結
        console.log("disconnected!");
    },  
    function(hSocket){//連接
	    console.log("connected!");
	    hSocketOutside = hSocket;
	/*         hSocketOutside.end();   */
	    
/*
		var myVar = setInterval(function(){myTimer()},1000);
		
		function myTimer()
		{
	        hSocketOutside.write('hello World!~~~');
		}
*/
	}
);  


var http = require('http'
),
    url  = require('url'),
    fs   = require("fs"),
    qs   = require('querystring'),
    server;

var express = require('express');
var app = express();

app.listen(5566);
console.log('Listening on port 5566');



//app.get, app.post要針對對方瀏覽器傳過來的是什麼東西。不然會接不到東西
//post要加一個express.bodyParser()，才能正確parse傳進來的資訊
app.use(express.bodyParser());
app.post('/COMMAND',function(req, res){
	
	
	
    var responseData=req.body;
    console.log(responseData.command);
    //用了body parser之後，連arg1裡面的東西都會parse成array，還蠻方變得
    console.log(responseData.arg1.roll);
    console.log(responseData.arg1.pitch);
    console.log(responseData.arg1.overallCount);

	var messageToUnity = {};
	messageToUnity.command = responseData.command;
	messageToUnity.roll = responseData.arg1.roll;
	messageToUnity.pitch = responseData.arg1.pitch;
	messageToUnity.overallCount = responseData.arg1.overallCount;
	var messageToUnity_json = JSON.stringify(messageToUnity);

    hSocketOutside.write(messageToUnity_json);
    
    switch (responseData.command){
	    case "ACCELEROMETER_DATA":
	    	//注意！！這邊一定要回傳result，不然他積六個左右的post就會爛掉了！
		    res.send("OK!");
		    break;
	    default:
	    	break;
    }
    
});
    

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/accGatherer.html');
});
// app.get('/draw', function (req, res) {
//   res.sendfile(__dirname + '/draw.html');
// });
app.use(express.static(__dirname));






