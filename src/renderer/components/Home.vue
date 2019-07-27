<template>
    <el-row :gutter="18">
        <el-col :span="5" :offset="9" v-if="installShow">
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
            <el-col :span="5" :offset="9" v-if="loginShow">
            <h1 style="margin-left: 70px;">Welcome Login Page </h1>
            <el-divider><i class="el-icon-star-on"></i></el-divider>
            <el-form  :model="ruleLoginForm" status-icon :rules="rulesLogin" ref="rulesLogin" label-width="120px" class="demo-ruleForm">
                <el-form-item label="Username" prop="username">
                    <el-input type="text" v-model="ruleLoginForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input type="password" v-model="ruleLoginForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitLoginForm('rulesLogin')">Submit</el-button>
                    <el-button @click="resetLoginForm('rulesLogin')">Reset</el-button>
                </el-form-item>
            </el-form>
        </el-col>
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
            var validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input the email'));
                }
                fs.readFile('./src/renderer/settings.json', 'utf8', (err, fileContents) =>
                {
                    if (err) {
                        console.error(err)
                        return
                    }
                    try{
                        const data = JSON.parse(fileContents)
                        var id = data["id"];
                        db.query('SELECT password FROM syslog WHERE id = '+id+' ', function (error, results, fields)
                        {

                            var password =  results[0]["password"];
                            if(value == password){
                                callback();
                            }
                            else{
                                callback(new Error('This password  is not match in database records'));
                            }
                        });
                    }
                    catch (err) {
                        console.error(err)
                    }

                });
            };
            var validateUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input the username'));
                }
                fs.readFile('./src/renderer/settings.json', 'utf8', (err, fileContents) =>
                {
                    if (err) {
                        console.error(err)
                        return
                    }
                    try{
                        const data = JSON.parse(fileContents)
                        var id = data["id"];
                        db.query('SELECT username FROM syslog WHERE id = '+id+' ', function (error, results, fields)
                        {

                            var username =  results[0]["username"];
                            if(value == username){
                                callback();
                            }
                            else{
                                callback(new Error('This username  is not match in database records'));
                            }
                        });
                    }
                    catch (err) {
                        console.error(err)
                    }

                });

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
                rulesLogin: {
                    username: [
                        { validator: validateUsername, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                },
                emailSorgu:'',
                installShow:true,
                loginShow:true
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
            submitLoginForm(ruleFormLogin) {
                this.$refs[ruleFormLogin].validate((valid) =>
                {
                    if (valid)
                    {
                        swal("Success!", "You are redirecting to panel", "success",{
                            button: false,
                        });
                        router.push('./panel');

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

            const path = require('path');
            const directoryPath = path.join('./src/renderer/');

            fs.readdir(directoryPath, function (err, files) {
                if (err) {
                    return console.log('Unable to scan directory: ' + err);
                }
                if(files === undefined || files.length == 0)
                {
                    router.push('./installation');
                }
                else
                {
                    files.forEach(function (file) {

                        if(file != "settings.json")
                        {
                            router.push('./installation');
                        } else
                        {
                            router.push('./login');
                        }
                    })
                }
            });
        }
    }
</script>
<style scoped>
    @import '../vendors/bower_components/datatables/media/css/jquery.dataTables.min.css';
    @import '../vendors/bower_components/jquery-toast-plugin/dist/jquery.toast.min.css';

</style>
