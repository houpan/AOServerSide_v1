	var tcp = require("./LighterWebPlatform/LighterWebEngine/TCP");  
      
    tcp.CreateServer(10000,  
        function(){ 
            console.log("Initialization");
        },  
        function(hSocket, sBuffer){
            console.log("來吧");
            console.log(sBuffer);
            var obj = JSON.parse(sBuffer);
            console.log(obj.author.name);
        },  
        function(hSocket){
            console.log("disconnected!");
        },  
        function(hSocket){
	    console.log("connected!");
            hSocket.write('hello World!');
            hSocket.end();  
        }  
    );  
