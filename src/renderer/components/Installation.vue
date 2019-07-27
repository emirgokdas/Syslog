<template>
    <el-row :gutter="18">

        <el-col :span="5" :offset="9">
            <h1 style="margin-left: 70px;">Welcome Installation </h1>
            <el-divider><i class="el-icon-star-on"></i></el-divider>
            <el-form   :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="Email Address" prop="pass">
                    <el-input type="email" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Log Path" prop="checkPass">
                    <el-input type="text" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Archive Path" prop="age">
                    <el-input type="text" v-model.number="ruleForm.age"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
                    <el-button @click="resetForm('ruleForm')">Reset</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <div class="w3-container">

            <h1 style="color:blueviolet">Wapp - New</h1>
            <h3>Brand new app</h3>

            <p>
                Current version: <span id="version"></span>
            </p>

            <div id="messages" style="color:cyan"></div>

            <div class="w3-light-grey">
                <div class="w3-blue" style="height:24px;width:0%" id="progressBar"></div>
            </div>

        </div>
    </el-row>
</template>
<script>
    import db from '../settings/db.js';
    import router from '../router';
    import fs from 'fs';
    export default {
        data() {
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('Please input the archive path directory'));
                }
                setTimeout(() => {

                    callback();

                }, 1000);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input the email'));
                }
                db.query("SELECT email FROM syslog where email ='"+value+"'",function (error,results,fields) {

                    if(results.length>0)
                    {
                        callback();
                    }else{
                        callback(new Error('This email address is not match in database'));
                    }
                })
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '')
                {
                    callback(new Error('Please input the log path directory'));
                }
                else
                {
                    callback();
                }
            };

            return {
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    age: ''
                },
                ruleLoginForm:{
                    username: '',
                    password: ''
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    age: [
                        { validator: checkAge, trigger: 'blur' }
                    ]
                },
                emailSorgu:''
            };
        },
        methods: {
            submitForm(formName) {
                var vm = this;
                this.$refs[formName].validate((valid) => {
                    if (valid)
                    {
                        db.query('SELECT * FROM syslog WHERE email = "'+vm.ruleForm.pass+'" ', function (error, results, fields) {
                            var id = results[0]["id"];
                            var lisans = results[0]["lisansclient"];
                            var fs = require('fs');
                            console.log("Write started");
                            console.log(vm.ruleForm.pass);
                            var veri ={
                                "LogPath": vm.ruleForm.checkPass,
                                "ArchivePath":vm.ruleForm.age,
                                "Serverip":"localhost",
                                "ArchivePathDate":"12:00",
                                "email":vm.ruleForm.pass,
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
                                "Delay":lisans,
                                "CorsAllowMethods":"GET POST",
                                "CorsAllowCredentials":"true"
                            };
                            for (var i = 0; i < lisans; i++) {
                                veri.Sources.push({
                                    "id": i,
                                    "enabled":true,
                                    "name":null,
                                    "displayName":null,
                                    "sourceHost":null,
                                    "sourceIP":null,
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
                            swal("Success!", "You are redirecting to panel", "success",{
                                button: false,
                            });

                            router.push('./panel');
                        });
                    } else
                    {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
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

        }
    }
</script>

<style scoped>

</style>
