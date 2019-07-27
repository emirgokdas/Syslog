<template>
    <!-- Modal -->
    <div class="modal right fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabe2">Settings</h4>
                </div>
                <div class="modal-body">
                    <div class="panel panel-default card-view">
                        <div class="panel-wrapper collapse in">
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-sm-12 col-xs-12">
                                        <div class="form-wrap">
                                            <form>
                                                <div class="form-group">
                                                    <label class="control-label mb-10" for="logPath">Log Path Address</label>
                                                    <div class="input-group">
                                                        <div class="input-group-addon"><i class="icon-user"></i></div>
                                                        <input type="text" class="form-control" id="logPath" v-model="logPath" placeholder="placeholderValue">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label mb-10" for="arsivPath">Archive Path Address</label>
                                                    <div class="input-group">
                                                        <div class="input-group-addon"><i class="icon-envelope-open"></i></div>
                                                        <input type="email" class="form-control" id="arsivPath" v-model="arsivPath" placeholder="placeholderValue">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label mb-10">Archive Time</label>
                                                    <div class="input-group">
                                                        <div class="input-group-addon"><i class="icon-lock"></i></div>
                                                        <input type="time" class="form-control" v-model="timePicker" id="timePicker" placeholder="Archive Time">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label mb-10" for="sourceIP">IP Address</label>
                                                    <div class="input-group">
                                                        <div class="input-group-addon"><i class="icon-lock"></i></div>
                                                        <input type="text" class="form-control" v-model="sourceIP" id="sourceIP" placeholder="IP Number">
                                                    </div>
                                                </div>

                                                <button @click="submitForm" type="submit" class="btn btn-success mr-10">Save</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div><!-- modal-content -->
    </div><!-- modal-dialog -->

</template>
<script>
    import fs from 'fs';
    import mysql  from 'mysql';
    import swal from 'sweetalert';
    import service from '../settings/service.js'
    import object from '../json/settings.json';
    const editJsonFile = require("edit-json-file");
    const updateJsonFile = require('update-json-file')

    export default {
        name: "RightSidePanel.vue",
        data() {
            return {
                logPath: null,
                arsivPath: null,
                sourceIP: null,
                lisansClient: null,
                Ports:null,
                timePicker:null,
                placeholderValue: 'Watafaka',
                pathJson: "./src/renderer/json/settings.json",
            }
        },
        methods : {
            submitForm() {
                try {
                    var newLogPath = this.logPath;
                    var newarsivPath = this.arsivPath;
                    var newarsivDate = this.timePicker;
                    var ports = this.Ports;
                    let file = editJsonFile(''+this.pathJson+'');
                    file.set("LogPath", ""+newLogPath+"");
                    file.set("ArchivePath", ""+newarsivPath+"");
                    file.set("ArchivePathDate", ""+newarsivDate+"");
                    file.set("Ports", ""+ports+"");
                    file.save();
                    file = editJsonFile(''+this.pathJson+'', {
                        autosave: true
                    });

                    var sourceIpInp = this.sourceIP;
                    var timeArsiv = this.timePicker;
                    var usernameSessiona = this.$cookie.get('usernameSession');
                    var connection = mysql.createConnection({
                        host: '127.0.0.1',
                        user: 'root',
                        password: '',
                        database: 'test'
                    });
                    connection.connect(function (err) {
                        if (err) throw err;
                    });
                    connection.query('SELECT * FROM syslog  WHERE username = "' + usernameSessiona + '" ', function (error, results, fields) {
                        var emailSorgu = results["email"];
                        var id = results["id"];
                        var ipSorgu = results["ipaddress"];
                        var lisansclientSorgu = results["lisansclient"];
                        var isCreatedSorguSorgu = results["isCreated"];
                        var ip = sourceIpInp;
                        var splitIp = ip.split(',')
                        var countIP = splitIp.length;
                        if (countIP > lisansclientSorgu) {
                            swal("Hata!", "Lisans'ta belirlenen client sayısı kadar (" + lisansclientSorgu + ") adet Kaynak IP girebilirsiniz!", "error");
                        } else {
                            let sql = 'UPDATE syslog SET ipaddress = "'+ip+'", arsivDate = "'+timeArsiv+'" WHERE username = "' +usernameSessiona+ '" ' ;

                            connection.query(sql);
                            var fs = require('fs');

                            var veri ={
                                "LogPath": newLogPath,
                                "ArchivePath":newarsivPath,
                                "Serverip":"localhost",
                                "ArchivePathDate":newarsivDate,
                                "email":emailSorgu,
                                "id":id,
                                "Ports":[
                                    null
                                ],
                                "Sources":[],
                                "InitConfigured":true,
                                "AuthUsername":"test",
                                "AuthPassword":"test",
                                "CorsAllowOrigin":"",
                                "CorsAllowHeaders":"*",
                                "Delay":lisansclientSorgu,
                                "CorsAllowMethods":"GET POST",
                                "CorsAllowCredentials":"true"
                            };

                            for (var i = 0; i < splitIp.length; i++) {
                                veri.Sources.push({

                                    "id": i,
                                    "enabled":true,
                                    "name":null,
                                    "displayName":null,
                                    "sourceHost":null,
                                    "sourceIP":splitIp[i],
                                    "port":null,
                                    "forwardEnabled":null,
                                    "forwardHost":null,
                                    "forwardIP":null,
                                    "forwardPort":null,
                                    "forwardTransport":null,
                                    "logFolder":null,
                                    "logFilename":null,
                                    "archiveEnabled":null,
                                    "archiveFolder":null,
                                    "archiveFormat":null,
                                    "archivePeriod":null,
                                    "error":null
                                });
                            }
                            const jsonString = JSON.stringify(veri)
                            fs.writeFile("./src/renderer/json/settings.json",jsonString,function(error){
                            });




                            service.runServe();
                            swal("Success!", "Listening '"+ip+"' Sources ", "success");
                        }
                    });
                } catch (err) {

                }

            }
        },
        mounted() {
            this.sourceIP = this.ipSorgu;
            fs.readFile('src/renderer/json/settings.json', 'utf8', (err, fileContents) => {
                if (err) {
                    console.error(err)
                    return
                }
                try {
                    const data = JSON.parse(fileContents)
                    this.logPath = data["LogPath"];
                    this.arsivPath = data["ArchivePath"];
                    this.timePicker = data["ArchivePathDate"];
                    this.Ports = data["Ports"];

                    var userID = data.id;

                    var connection = mysql.createConnection({
                        host: '127.0.0.1',
                        user: 'root',
                        password: '',
                        database: 'test'
                    });
                    connection.connect(function (err) {
                        if (err) throw err;
                    });
                    connection.query('SELECT * FROM syslog  WHERE id = "' + userID + '" ', function (error, results, fields) {
                        var ipSorgu = results["ipaddress"];
                    });
                } catch (err) {

                }
            })
        }
    }

</script>
<style scoped>

    .modal.left .modal-dialog,
    .modal.right .modal-dialog {
        position: fixed;
        margin: auto;
        width: 25%;
        height: 100%;
        -webkit-transform: translate3d(0%, 0, 0);
        -ms-transform: translate3d(0%, 0, 0);
        -o-transform: translate3d(0%, 0, 0);
        transform: translate3d(0%, 0, 0);
    }

    .modal.left .modal-content,
    .modal.right .modal-content {
        height: 100%;
        overflow-y: auto;
    }

    .modal.left .modal-body,
    .modal.right .modal-body {
        padding: 15px 15px 80px;
    }

    .modal.right.fade .modal-dialog {
        right: -320px;
        -webkit-transition: opacity 0.3s linear, right 0.3s ease-out;
        -moz-transition: opacity 0.3s linear, right 0.3s ease-out;
        -o-transition: opacity 0.3s linear, right 0.3s ease-out;
        transition: opacity 0.3s linear, right 0.3s ease-out;
    }

    .modal.right.fade.in .modal-dialog {
        right: 0;
    }

    /* ----- MODAL STYLE ----- */
    .modal-content {
        border-radius: 0;
        border: none;
    }

    .modal-header {
        border-bottom-color: #ffffff;
        background-color: #0fc5bb;
        text-align: center;
        color: #fff;
        font-weight: 700;
    }
</style>
