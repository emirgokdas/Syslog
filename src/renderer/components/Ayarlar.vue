<template>
    <!-- Modal -->
    <div class="modal left fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Devices</h4>
                </div>
                <div class="modal-body">
                    <div @click="openAddDevice" class="add-device">
<h1>Add Device</h1>
                    </div>
                    <div @click="openAddPorts" class="add-port">
                        <h1>Add Port</h1>
                    </div>
                    <!-- show Devices -->
                    <div id="deviceListPanel" class="row">
                        <div class="col-md-12">
                            <div class="panel panel-default card-view">
                                <div class="panel-wrapper collapse in">
                                    <div class="panel-body">
                                        <div class="panel-group accordion-struct" id="accordion_1" role="tablist" aria-multiselectable="true">
                                            <div class="panel panel-default">
                                                <div class="panel-heading activestate" role="tab" id="heading_1">
                                                    <a role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapse_1" aria-expanded="true">collapse one</a>
                                                </div>
                                                <div id="collapse_1" class="panel-collapse collapse in" role="tabpanel">
                                                    <div class="panel-body pa-15">
                                                        <ul class="left-style-none">
                                                            <li class="item-list-style-none">
                                                                fasfasdfasdf
                                                            </li>
                                                        </ul>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="panel panel-default">
                                                <div class="panel-heading" role="tab" id="heading_2">
                                                    <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapse_2" aria-expanded="false">collapse two </a>
                                                </div>
                                                <div id="collapse_2" class="panel-collapse collapse" role="tabpanel">
                                                    <div class="panel-body pa-15"> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, </div>
                                                </div>
                                            </div>
                                            <div class="panel panel-default">
                                                <div class="panel-heading" role="tab" id="heading_3">
                                                    <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapse_3" aria-expanded="false" >collapse three</a>
                                                </div>
                                                <div id="collapse_3" class="panel-collapse collapse" role="tabpanel">
                                                    <div class="panel-body pa-15"> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, inable VHS. </div>
                                                </div>
                                            </div>
                                            <div class="panel panel-default">
                                                <div class="panel-heading" role="tab" id="heading_4">
                                                    <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapse_4" aria-expanded="false"> collapse four</a>
                                                </div>
                                                <div id="collapse_4" class="panel-collapse collapse" role="tabpanel">
                                                    <div class="panel-body pa-15"> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, inable VHS. </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- show Devices -->
                    <!-- show Ports -->
                    <div id="portListPanel" class="row">
                        <div class="col-md-12">
                            <div class="panel panel-default card-view">
                                <div class="panel-wrapper collapse in">
                                    <div class="panel-body">
                                        <div class="panel-group accordion-struct" id="accordion_1" role="tablist" aria-multiselectable="true">
                                            <div class="panel panel-default">
                                                <div class="panel-heading activestate" role="tab" id="heading_1">
                                                    <a role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapse_1" aria-expanded="true">collapse one</a>
                                                </div>
                                                <div id="collapse_1" class="panel-collapse collapse in" role="tabpanel">
                                                    <div class="panel-body pa-15">
                                                        <ul class="left-style-none">
                                                            <li class="item-list-style-none">
                                                              Port Numbers
                                                            </li>
                                                        </ul>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="panel panel-default">
                                                <div class="panel-heading" role="tab" id="heading_2">
                                                    <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapse_2" aria-expanded="false">collapse two </a>
                                                </div>
                                                <div id="collapse_2" class="panel-collapse collapse" role="tabpanel">
                                                    <div class="panel-body pa-15"> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, </div>
                                                </div>
                                            </div>
                                            <div class="panel panel-default">
                                                <div class="panel-heading" role="tab" id="heading_3">
                                                    <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapse_3" aria-expanded="false" >collapse three</a>
                                                </div>
                                                <div id="collapse_3" class="panel-collapse collapse" role="tabpanel">
                                                    <div class="panel-body pa-15"> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, inable VHS. </div>
                                                </div>
                                            </div>
                                            <div class="panel panel-default">
                                                <div class="panel-heading" role="tab" id="heading_4">
                                                    <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapse_4" aria-expanded="false"> collapse four</a>
                                                </div>
                                                <div id="collapse_4" class="panel-collapse collapse" role="tabpanel">
                                                    <div class="panel-body pa-15"> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, inable VHS. </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- show Ports -->
                    <div id="devicePanel"  class="panel-wrapper collapse in add-device-panel">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-12 col-xs-12">
                                    <div class="form-wrap">
                                        <form>
                                            <div class="form-group">
                                                <label class="control-label mb-10" for="exampleInputuname_1">Device Name</label>
                                                <div class="input-group">
                                                    <div class="input-group-addon"><i class="icon-user"></i></div>
                                                    <input type="text" class="form-control" id="deviceName" v-model="deviceName" placeholder="Device Name">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label mb-10" for="exampleInputEmail_1">Device IP</label>
                                                <div class="input-group">
                                                    <div class="input-group-addon"><i class="icon-envelope-open"></i></div>
                                                    <input type="email" class="form-control" id="exampleInputEmail_1" placeholder="Device IP">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="checkbox checkbox-success">
                                                    <input id="checkbox_1" type="checkbox">
                                                    <label for="checkbox_1">Enabled </label>
                                                </div>
                                            </div>
                                            <button type="submit" class="btn btn-success mr-10">Save</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="portPanel"  class="panel-wrapper collapse in add-device-panel">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-12 col-xs-12">
                                    <div class="form-wrap">
                                        <form>
                                            <div class="form-group">
                                                <label class="control-label mb-10" for="exampleInputuname_1">Add Port</label>
                                                <div class="input-group">
                                                    <div class="input-group-addon"><i class="icon-user"></i></div>
                                                    <input type="text" class="form-control" id="ports" v-model="ports" placeholder="PORT">
                                                </div>
                                            </div>
                                            <button @click="submit" type="submit" class="btn btn-success mr-10">Save</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- modal-content -->
        </div><!-- modal-dialog -->
    </div><!-- modal -->
</template>
<script>
    import mysql from 'mysql';
    import fs from 'fs-extra';
    export default {
        name: "Ayarlar.vue",
        data()  {
            return {
                userID:null,
                ports:null,
                deviceName:null
            }
        },
        methods: {
            openAddDevice() {
                $('#portPanel').css({
                    'display': 'none'
                });
                $('#portListPanel').css({
                    'display': 'none'
                });
                $('#devicePanel').css({
                    'display': 'block'
                });
                $('#deviceListPanel').css({
                    'display': 'block'
                });
            },
            openAddPorts() {
                $('#devicePanel').css({
                    'display': 'none'
                });
                $('#deviceListPanel').css({
                    'display': 'none'
                });
                $('#portPanel').css({
                    'display': 'block'
                });
                $('#portListPanel').css({
                    'display': 'block'
                });
            },
            submit() {
                var portNumbers = this.ports;
                fs.readFile('../my-todos/src/renderer/json/settings.json', 'utf8', (err, fileContents) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    try {
                        const data = JSON.parse(fileContents)
                        var splitPorts = portNumbers.split(',');
                        var jsonPOrt = data["Ports"][0];
                        var inputPort = this.ports.split(',');
                        jsonPOrt = inputPort;
                        swal("You added ports '"+jsonPOrt+"' successfully",  "success",{
                            button: false,
                        });
                    } catch (err) {
                        console.error(err)
                    }
                })
            }
        },
        mounted() {
            fs.readFile('../my-todos/src/renderer/json/settings.json', 'utf8', (err, fileContents) => {
                if (err) {
                    console.error(err)
                    return
                }
                try {
                    const data = JSON.parse(fileContents)
                    this.userID = data["Sources"][0]["id"];
                    var userID = this.userID;
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
                    connection.query('SELECT * FROM syslog  WHERE id = "' + userID + '" ', function (error, results, fields) {
                    });
                } catch (err) {
                    console.error(err)
                }
            })
        }
    }
</script>

<style scoped>
    /*******************************
    * MODAL AS LEFT/RIGHT SIDEBAR
    * Add "left" or "right" in modal parent div, after class="modal".
    * Get free snippets on bootpen.com
    *******************************/
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
    /*Left*/
    .modal.left.fade .modal-dialog{
        left: -320px;
        -webkit-transition: opacity 0.3s linear, left 0.3s ease-out;
        -moz-transition: opacity 0.3s linear, left 0.3s ease-out;
        -o-transition: opacity 0.3s linear, left 0.3s ease-out;
        transition: opacity 0.3s linear, left 0.3s ease-out;
    }
    .modal.left.fade.in .modal-dialog{
        left: 0;
    }
    /*Right*/
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
        border-bottom-color: #EEEEEE;
        background-color: #FAFAFA;
        text-align: center;
    }
    .add-device{

        width: 50%;
        height: 33%;
        margin-top: -6%;
        margin-left: -3%;
        color: #333;
        cursor: pointer;
    }
    .add-device h1 {
        text-align: center;
        font-size: 16pt;
        justify-content: center;
    }
    .add-port{
        width: 56%;
        height: 34%;
        margin-top: -7%;
        margin-left: 46%;
        color: #333;
        cursor: pointer;
    }
    .add-port h1 {
        text-align: center;
        font-size: 16pt;
        justify-content: center;

    }
    .add-device-panel{
        display: block;
    }
    #portPanel {
        display: none;
    }
    #portListPanel {
        display: none;
    }
</style>
