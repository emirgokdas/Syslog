var dateFormat = require('dateformat');
var now = new Date();
var fs = require('fs-extra');
var tarih =dateFormat(now, "yyyy-mm-dd");
var sha256File = require('sha256-file');
var winston = require ('winston');
var dbcon = require ('./dbconnection');
var path = require('path');
require('winston-daily-rotate-file');
const zipFolder = require('zip-a-folder');
const { zip } = require('zip-a-folder');
exports.imzala = function () {
    fs.readFile('../my-todos/src/renderer/json/settings.json', 'utf8', (err, fileContents) => {
        if (err) {
            console.error(err)
            return
        }
        try {
            const data = JSON.parse(fileContents)

            var email = data["email"];



            dbcon.query('SELECT ipaddress FROM syslog WHERE email = "'+email+'" ', function (error, results, fields) {
                if (error) throw error;
                var path1 = data["LogPath"];
                var ip  = results[0]["ipaddress"];

                try{
                    var ip = ip.split(',');
                }catch (e) {
                    var ip =results[0]["ipaddress"];
                }


                ip.forEach(function(e) {
                    var logDir = path1+'\\'+e; // directory path you want to set
                    sha256File(logDir+'\\'+tarih+'.log');
                    var transport = new (winston.transports.DailyRotateFile)({
                        filename: path.join(logDir,'//%DATE%.sha256'),
                        datePattern: 'YYYY-MM-DD',
                        zippedArchive: true,
                        maxSize: '4096m',
                    });
                    let logger = winston.createLogger({
                        transports: [
                            transport
                        ],
                        exitOnError: false // don't crush no error
                    });
                     // async/streamed (if using callback)
                    sha256File(logDir+'\\'+tarih+'.log', function (error, sum) {
                        if (error) return console.log(error);
                        logger.info(sum);
                        var dir = tarih;
                         //tarih klasörü oluşturuyor
                        if (!fs.existsSync(''+path1+'\\'+''+e+'\\'+dir+'')){
                            fs.mkdirSync(''+path1+'\\'+''+e+'\\'+dir+'');
                        }
                        //log dosyasını tarih klasörüne kopyalıyor
                        fs.copyFile(logDir+'/'+tarih+'.log', logDir+'/'+tarih+'/'+tarih+'.log', function (err) {
                            if (err) return console.error(err)
                            console.log("success!");
                        })

                        //sha256 dosyasını tarih klasörüne taşıyor
                        fs.move(logDir+'/'+tarih+'.sha256', logDir+'/'+tarih+'/'+tarih+'.sha256', function (err) {
                            if (err) return console.error(err)
                            console.log("success!");
                        })


                         //IP Klasörünün içersinde arşiv klasörü oluşturuyor.
                        if (!fs.existsSync(''+data["ArchivePath"]+''+e+'\\Archive')){
                            fs.mkdirSync(''+data["ArchivePath"]+''+e+'\\Archive');
                        }
                        class ZipAFolder {
                            static main() {
                                zipFolder.zipFolder(''+path1+'\\'+''+e+'\\'+dir+'', ''+data["ArchivePath"]+''+e+'\\Archive'+'\\'+tarih+'.zip', function(err) {
                                    if(err) {
                                        console.log('Something went wrong!', err);
                                    }
                                });
                            }
                        }
                        ZipAFolder.main();1
                    })
                });
            });
        } catch(err) {
            console.error(err)
        }
    })
}







