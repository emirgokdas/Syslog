<template>
    <el-row :gutter="18">
        <el-col :span="5" :offset="9">
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
            var validateUsername = (rule, value, callback) =>
            {
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
                ruleLoginForm:{
                    username: '',
                    password: ''
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
            };
        },
        methods: {
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


        }
    }
</script>

<style scoped>

</style>
