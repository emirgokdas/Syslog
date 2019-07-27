var dateFormat = require('dateformat');
var now = new Date();
var fs = require('fs');
var path = require('path');
var cron = require('node-cron');
var dgram = require('dgram');
var dbcon = require ('./dbconnection');
var winston = require('winston');
var imza = require("./sha256");
require('winston-daily-rotate-file');
//Direk çalıştırmalarda path ../json/settings.json
fs.readFile('./src/renderer/settings.json', 'utf8', (err, fileContents) => {
    if (err) {
        console.error(err)
        return
    }
    try {
        const data = JSON.parse(fileContents)
        var id = data.id;
        var ports = data.Ports;
        //console.log(data);
        udpclients =[514,4655];
        udpsockets=[]
        dbcon.query('SELECT * FROM syslog WHERE id = '+id+' ', function (error, results, fields) {
            var ipAdresleri = results[0]["ipaddress"];
            var arsivDate = results[0]["arsivDate"];
            var splitArsivDate = arsivDate.split(':');
            var splitIP = ipAdresleri.split(',');
            var saat = splitArsivDate[0];
            var dakika = splitArsivDate[1];
            var b = dakika+' '+saat+' * * *';
            cron.schedule(b ,() => {
                imza.imzala();
            });
            if (error) throw error;
            var path1 = data["LogPath"];
            var logDir = path1; // directory path you want to set
            if ( !fs.existsSync( logDir ) ) {
                // Create the directory if it does not exist
                fs.mkdirSync( logDir );
            }
            udpclients.forEach(function(port) {
                var udpServer = dgram.createSocket('udp4');
                udpServer.bind(port,'10.10.10.109')
                udpServer.on('listening', function() {
                    var address = udpServer.address()
                    console.log("listening"+address.address+" port::"+address.port)
                });
                udpServer.on('message', function (msg, rinfo) {
                    for (var i = 0; i < splitIP.length; i++) {
                        var ip = rinfo.address;
                        console.log(ip);
                        var sqlip = splitIP[i];
                        if (ip == sqlip) {
                            var transport = new (winston.transports.DailyRotateFile)({
                                filename: path.join(logDir, '//' + ip + '//%DATE%.log'),
                                datePattern: 'YYYY-MM-DD',
                                zippedArchive: true,
                                maxSize: '4096m',
                            });
                        }
                        else
                        {
                            return

                        }
                    }
                    let logger = winston.createLogger({
                        transports: [
                            new winston.transports.Console(),//LOG LİST
                            new winston.transports.File({ filename: 'error.log', level: 'error' }),
                            transport
                        ],
                        exitOnError: false // don't crush no error
                    });
                    logger.info(msg + '\n');
                });
            });
        });
    } catch(err) {
        console.error(err)
    }
})



