var fs = require('fs');
console.log("Write started");

var yol ="C:\\test\\logs\\adadadsaas"

var veri ={
    "LogPath":yol,
    "ArchivePath":"C:\\test\\logs\\",
    "Serverip":"localhost",
    "ArchivePathDate":"15:52",
    "isCreated" : "0",
    "Ports":[
        514
    ],
    "Sources":[
        {
            "id":"1",
            "enabled":true,
            "name":"MixTekno",
            "displayName":"MixTekno",
            "sourceHost":"mixtekno.localdomain",
            "sourceIP":"10.10.10.1",
            "port":514,
            "forwardEnabled":false,
            "forwardHost":"",
            "forwardIP":"0.0.0.0",
            "forwardPort":514,
            "forwardTransport":"UDP",
            "logFolder":"{defaultlogpath}\\{host}",
            "logFilename":"{host}-{date}.log",
            "archiveEnabled":true,
            "archiveFolder":"{defaultarchivepath}\\{host}",
            "archiveFormat":"ZIP",
            "archivePeriod":15,
            "error":""
        }
    ],
    "InitConfigured":true,
    "AuthUsername":"test",
    "AuthPassword":"test",
    "CorsAllowOrigin":"",
    "CorsAllowHeaders":"*",
    "CorsAllowMethods":"GET POST",
    "CorsAllowCredentials":"true"
};

const jsonString = JSON.stringify(veri)
fs.writeFile("settings1.json",jsonString,function(error){
    console.log("Dosya Oluşturuldu");
});
