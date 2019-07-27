<template>
    <el-container>
        <el-header href="index.html" style="height: 45%">
            <img src="../assets/src/logo.png" >
            <i style="float: right; margin-top: 30px; cursor: pointer; "  class="el-icon-setting" @click="show = !show"></i>
        </el-header>
        <div style="margin: 7px;"></div>
        <el-container  class="addDevice" >
            <el-button  v-on:click="counter += 1" style="width: 61%;  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);" @click="showDeviceAddPanel" type="success" :disabled="disable">Add Device</el-button>
        </el-container>
        <div style="margin: 7px;"></div>
        <el-container >
            <div style="margin: 2px;"></div>
            <transition
                    enter-class=""
                    enter-active-class="animated fadeInLeft"
                    leave-class=""
                    leave-active-class=""
                    appear>
                <el-aside v-if="seen">
                    <el-alert v-if="showFormError"
                              title="Please fill all fields"
                              type="error">
                    </el-alert>
                    <el-alert
                            v-if="showLisansAlert"
                            title="You need to insert your devices information"
                            type="success"
                            effect="dark">
                    </el-alert>
                    <div style="margin: 20px;"></div>
                    <transition
                            enter-class=""
                            enter-active-class="animated fadeInLeft"
                            leave-class=""
                            leave-active-class=""
                            appear>
                        <el-form v-if="showDeviceAddForm" style="padding: 7px;" ref="form" :model="form">
                            <el-form-item label="IP Addresses" >
                                <el-input  v-model="form.ip"></el-input>
                            </el-form-item>
                            <el-form-item label="Log Path" >
                                <el-input  v-model="form.logPath"></el-input>
                            </el-form-item>
                            <el-form-item label="Archive Path" >
                                <el-input  v-model="form.archivePath"></el-input>
                            </el-form-item>
                            <el-form-item label="Set Archive Time">
                                <el-time-picker placeholder="Pick a time" v-model="form.date2" style="width: 100%;"></el-time-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm">Save</el-button>
                                <el-button @click="closeModal" type="danger">Cancel</el-button>
                            </el-form-item>
                        </el-form>
                    </transition>
                </el-aside>
            </transition>
            <el-main >
                <div class="Chart">
                    <h1 style="text-align:center;">Barchart with reactive mixing for live data as props</h1>
                    <reactive-prop-example :chart-data="dataPoints"/>
                </div>
                <logtable :name="devices" :json-data="logPath"></logtable>

            </el-main>
            <transition
                    enter-class=""
                    enter-active-class="animated fadeInRight"
                    leave-class=""
                    leave-active-class="animated fadeOutRight"
                    appear>
                <el-aside v-if="show" style="background-color:#ffff; padding: 5px;">
                    <div style="padding: 7px;"></div>
                    <h4 style="width: 61%;  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);">Device Settings</h4>
                    <el-collapse style="background-color: #0fc5bb;"  v-for="(item,index) in devices" accordion>
                        <el-collapse-item :title="item.sourceIP" name="1">
                            <el-form :label-position="labelPosition" label-width="100px" >
                                <el-form-item label="Device Name">
                                    <el-input id="deneme" v-model="item.displayName"></el-input>
                                </el-form-item>
                                <el-form-item label="Device Port">
                                    <el-input v-bind="deviceNameTest" v-model="item.port" ></el-input>
                                </el-form-item>
                                <el-form-item label="Enabled">
                                    <el-switch v-model="item.enabled">
                                    </el-switch>
                                </el-form-item>
                                <el-button  style="width:500px; text-align: left;" type="success" @click="saveDeviceDetail(index)">Save</el-button>
                            </el-form>
                        </el-collapse-item>
                    </el-collapse>
                </el-aside>
            </transition>
        </el-container>
    </el-container>
</template>
<style scoped>
    img{
        width: 5%;
        margin-top: 10px;
    }
    .el-aside {
        background-color: #fff;
        width: 500px;
        height: 900px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4)
    }
    .el-header {
        background-color: #fff;
        color: #333;
        line-height: 60px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .addDevice{
        width: 500px;
    }
    .el-main{
        background-color:#dcdee3;
    }
    .el-container{
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
    .container {
        max-width: 800px;
        margin: 0 auto;
    }

    h1 {
        font-family: 'Helvetica', Arial;
        color: #464646;
        text-transform: uppercase;
        border-bottom: 1px solid #f1f1f1;
        padding-bottom: 15px;
        font-size: 28px;
        margin-top: 0;
    }

    .Chart
    {
        padding: 20px;
        box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .4);
        border-radius: 20px;
        margin: 50px 0;
    }
</style>
<script>
    import db from '../settings/db';
    import {eventBus} from '../main';
    import ReactivePropExample from './chart'
    const updateJsonFile = require('update-json-file')
    import swal from 'sweetalert';
    import service from '../settings/service.js'
    import fs from 'fs';
    import logtable from './logtable.vue';
    var dateFormat = require('dateformat');
    var now = new Date();
    var tarih =dateFormat(now, "yyyy-mm-dd");

    export default {
        components: {
            ReactivePropExample,
            logtable
        },
        data() {
            return {
                dataPoints: null,
                height: 20,
                fields: ['File Name', 'File Size', 'Created At'],
                labelPosition: 'top',
                show:false,
                form: {
                    name: '',
                    region: '',
                    ip:'',
                    logPath:'',
                    archivePath:'',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    labelPosition: 'top',
                },
                showFormError:'',
                showLisansAlert:'',
                deviceAddPanel: {
                    show:'',
                },
                seen:false,
                showDeviceAddForm:false,
                lisansSayi:'',
                counter: 1,
                disable:false,
                deviceCount:'',
                email:'',
                id:'',
                splitIP:'',
                meip:'',
                devices:'',
                tables:'',
                pathJson:'./src/renderer/settings.json',
                deviceName:'',
                devicePort:'',
                deviceEnabled:'',
                deviceIP:'',
                logPath:'',
                deviceNameTest:'',
                sizes:[],
                files:''
            }
        },
        methods:
            {
                increaseHeight () {
                    this.height += 10
                },
                closeModal()
                {
                    if(this.show == true)
                    {
                        this.show = false;
                    }
                },

                getRandomInt (ipadres = new Array())
                {
                    var vm = this;


                    for (let i = 0; i < ipadres.length ; i++) {
                        var path = "C:\\test\\logs\\"+ipadres[i]+"\\"+tarih+".log";

                        fs.stat(path, function(err, stats) {
                            vm.sizes[i] = stats["size"]/1024;
                        });
                    }
                    return vm.sizes;

                },

                fillData ()
                {
                    var ipler = new Array();

                    var ipSize = new Array();

                    fs.readFile('./src/renderer/settings.json', 'utf8', (err, fileContents) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                        try {
                            const data = JSON.parse(fileContents)
                            var deviceIP = data.Sources;
                            for(var i = 0; i < deviceIP.length; i++)
                            {
                                ipler[i]=deviceIP[i].sourceIP;
                            }
                            var aa = ipler;

                            var ipszie=this.getRandomInt(aa);


                            this.dataPoints = {
                                labels:aa ,//İp list
                                datasets:
                                    [
                                        {
                                            label: 'Log',
                                            backgroundColor: '#67c23a',
                                            //dataya da bugünün logunun size
                                            data:ipszie
                                        }
                                    ]
                            }

                        } catch (err) {
                            console.error(err)
                        }
                    });
                },
                saveDeviceDetail(index)
                {
                    var vm=this;
                    fs.readFile('./src/renderer/settings.json', 'utf8', (err, fileContents) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                        try {
                            const data = JSON.parse(fileContents)
                            var deviceName = data.Sources[index].displayName;
                            var devicePort = data.Sources[index].port;
                            var deviceIP = data.Sources[index].sourceIP;
                            var deviceEnabled = data.Sources[index].enabled;
                            vm.deviceName=deviceName;
                            vm.devicePort=devicePort;
                            vm.deviceIP=deviceIP;
                            vm.deviceEnabled=deviceEnabled;

                            const filePath = ''+this.pathJson+'';
                            updateJsonFile(filePath, (data) =>
                            {

                                data.Sources[index].displayName = this.devices[index].displayName;
                                data.Sources[index].port = this.devices[index].port;
                                data.Sources[index].enabled =this.devices[index].enabled;
                                return data;

                            })
                        } catch (err) {
                            console.error(err)
                        }
                        swal("Success","You have successfully update device" ,"success");
                    });

                },
                submitForm()
                {
                    var vm = this;
                    let sql = 'UPDATE syslog SET ipaddress = "'+this.form.ip+'" WHERE id = '+this.id+' ';
                    db.query(sql);
                    var splitIP = this.form.ip.split(',');
                    vm.splitIP = splitIP;

                    if(splitIP.length > this.lisansSayi)
                    {
                        swal("Warning","You can only "+this.lisansSayi+" ip","warning");
                    }
                    if(splitIP.length<this.lisansSayi)
                    {
                        swal("Warning","You should enter "+this.lisansSayi+" ip source by putting ',' between ip addresses ","warning");
                    }
                    else
                    {
                        var fs = require('fs');
                        var veri ={
                            "LogPath": this.form.logPath,
                            "ArchivePath":this.form.archivePath,
                            "Serverip":"localhost",
                            "ArchivePathDate":this.form.date2,
                            "email":this.email,
                            "id":this.id,
                            "Ports":[
                                null
                            ],
                            "Sources":[],
                            "InitConfigured":true,
                            "AuthUsername":"test",
                            "AuthPassword":"test",
                            "CorsAllowOrigin":"",
                            "CorsAllowHeaders":"*",
                            "Delay":this.deviceCount,
                            "CorsAllowMethods":"GET POST",
                            "CorsAllowCredentials":"true"
                        };
                        for (var i = 0; i < this.splitIP.length; i++) {
                            veri.Sources.push({
                                "id": i,
                                "enabled":true,
                                "name":null,
                                "displayName":null,
                                "sourceHost":null,
                                "sourceIP":this.splitIP[i],
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
                        fs.writeFile("./src/renderer/settings.json",jsonString,function(error){
                        });
                        service.runServe();
                        swal("Success!", "Listening '"+this.splitIP+"' Sources ", "success");
                        this.seen=false;
                        this.show=true;
                    }
                },
                showDeviceAddPanel ()
                {
                    this.showDeviceAddForm=true;
                    var vm=this;
                    db.query("SELECT * FROM syslog WHERE id = 101",function (error,results,fields)
                    {
                        var lisans = results[0]["lisansclient"];
                        var ip = results[0]["ipaddress"];

                        var splitIP = ip.split(",");
                        if(splitIP.length >= lisans)
                        {
                            vm.disable=true;
                            vm.showDeviceAddForm=false;
                            swal("Warning!", "You are added maximum device that you can", "warning");
                            vm.seen=false;
                        }
                        else
                        {
                            vm.seen=true;
                        }
                    })
                    const filePath = ''+this.pathJson+'';
                    updateJsonFile(filePath, (data) =>
                    {
                        data.id = object.id;
                        return data;
                    })

                }
            },
        mounted()
        {
            const { ipcRenderer } = require('electron');

            const select = selector => document.querySelector(selector)

            let container = select('#messages')
            let progressBar = select('#progressBar')
            let version = select('#version')

            ipcRenderer.on('message', (event, text) => {

                let message = document.createElement('div')
                message.innerHTML = text
                container.appendChild(message)

            })

            ipcRenderer.on('version', (event, text) => {
                version.innerText = text
            })

            ipcRenderer.on('download-progress', (event, text) => {
                progressBar.style.width = `${text}%`
            })

            var vm=this;
            setInterval(() => {
                this.fillData()
            },300)

            db.query("SELECT * FROM syslog WHERE id = 101",function (error,results,fields)
            {
                var lisans = results[0]["lisansclient"];
                var ip = results[0]["ipaddress"];
                var email = results[0]["email"];
                var id = results[0]["id"];
                vm.id=id;
                vm.email=email;
                vm.lisansSayi = lisans;
                var splitIP = ip.split(",");
                vm.deviceCount = lisans;
                if(splitIP.length += lisans )
                {
                    vm.seen=true;
                    vm.showDeviceAddForm=false;
                    vm.showLisansAlert=true;
                }
                else
                {
                    vm.seen=true;
                    vm.disable=true;
                    swal("Warning!", "You are added maximum device that you can", "warning");
                }

            })

            fs.readFile('./src/renderer/settings.json', 'utf8', (err, fileContents) => {
                var vm=this;
                if (err) {
                    console.error(err)
                    return
                }
                try {
                    const data = JSON.parse(fileContents)
                    var devices = data.Sources;
                    var logPath = data.LogPath;
                    vm.logPath=logPath;
                    vm.devices = devices;
                    console.log(devices);

                } catch (err) {
                    console.error(err)
                }
                var log_dir = this.logPath;
                var async = require('async'); // async node module (npm install async)
                var manifest = {
                    files: []
                    , size: 0
                }
                var directory = "C:\\test\\logs\\10.10.10.1"; // just an example

                // returns a list of filenames in the directory
                fs.readdir(directory, function(err, files) {
                    //Run for each file in files
                    async.forEach(files, function(file, callback) {

                            // Check file extension
                            if (file.substr(file.lastIndexOf(".")) == ".log") {

                                fs.lstat(directory + "/" + file, function(err, data) {
                                    // Update our manifest object with new data
                                    manifest.size += data.size;
                                    manifest.files.push({
                                        name: file.substr(0,file.lastIndexOf(".log")) //filename without .png
                                        , size: data.size
                                    });
                                    // Let async know this file is done
                                    callback(err);
                                });
                            }
                            else
                            {
                                callback();
                            }
                        },
                        function(err) { //This is only called after all files have fired their 'callback'
                        });
                });
                var vm=this;
                //console.log(manifest.files);
                vm.files = manifest.files;
            });

        },

        computed: {
            myStyles () {
                return {
                    height: `${this.height}px`,
                    position: 'relative'
                }
            }
        },


    };
</script>
