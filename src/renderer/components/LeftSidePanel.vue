<template>
    <div class="modal left fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Devices</h4>
                </div>
                <div class="modal-body">
                    <!-- show Devices -->
                    <div  v-for="(item,index) in object.Sources" id="deviceListPanel" class="row">
                        <div class="col-md-12">
                            <div class="panel panel-default card-view">
                                <div class="panel-wrapper collapse in">
                                    <div  class="panel-body">
                                        <div  class="panel-group accordion-struct" id="accordion_1" role="tablist" aria-multiselectable="true">
                                            <div  class="panel panel-default"  >
                                                <div class="panel-heading activestate" role="tab" id="heading_1">
                                                    <a  role="button" data-toggle="collapse" data-parent="#accordion_1" v-model="item.sourceIP" @click="showItem(index)" href="#collapse_1" aria-expanded="true">{{item.displayName}} : {{item.sourceIP}}</a>
                                                </div>
                                                <div id="collapse_1" class="panel-collapse collapse in" role="tabpanel">
                                                    <div class="panel-body pa-15">
                                                        <ul  class="left-style-none">
                                                            <li v-if="show"   class="item-list-style-none panel-li">
                                                                <div  id="devicePanel"  class="panel-wrapper collapse in add-device-panel">
                                                                    <div  class="panel-body">
                                                                        <div class="row">
                                                                            <div class="col-sm-12 col-xs-12">
                                                                                <div  class="form-wrap">
                                                                                    <form>
                                                                                        <div class="form-group">
                                                                                            <label class="control-label mb-10" >Device Name</label>
                                                                                            <div class="input-group">
                                                                                                <div class="input-group-addon"><i class="icon-user"></i></div>
                                                                                                <input v-model="item.displayName" type="text" class="form-control"  id="item.id" placeholder="Device Name">
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="form-group">
                                                                                            <label class="control-label mb-10" >Device IP : </label>
                                                                                            <div class="input-group">
                                                                                                <div class="input-group-addon"><i class="icon-envelope-open"></i></div>
                                                                                                <input v-model="item.sourceIP" type="email" class="form-control" id="deviceIP" placeholder="Device IP">
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="form-group">
                                                                                            <label class="control-label mb-10">PORT</label>
                                                                                            <div class="input-group">
                                                                                                <div class="input-group-addon"><i class="icon-envelope-open"></i></div>
                                                                                                <input type="text" v-model="item.port" class="form-control" id="item.port"  placeholder="Port">
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="form-group">
                                                                                            <div class="checkbox checkbox-success">
                                                                                                <input  v-model="item.enabled" id="item.enabled" type="checkbox">
                                                                                                <label>Enabled </label>
                                                                                            </div>
                                                                                        </div>
                                                                                        <button @click="save(index)" type="submit" class="btn btn-success mr-10">Save</button>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
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
                    <!-- show Ports -->
                </div>
            </div><!-- modal-content -->
        </div><!-- modal-dialog -->
    </div><!-- modal -->
</template>
<script>

    import fs from 'fs-extra';
    import db from '../settings/db';
    import object from '../json/settings.json';
    import swal from 'sweetalert';
    import router from '../router';
    const updateJsonFile = require('update-json-file')


    export default
    {
        name: "LeftSidePanel.vue",
        data()  {
            return {
                show:false,
                object,
                pathJson: "./src/renderer/json/settings.json"
            }
        },
        methods:
            {
            showItem()
            {
                this.show = true;

            },
                save(index)
                {
                    const filePath = ''+this.pathJson+'';
                    updateJsonFile(filePath, (data) =>
                    {



                            data.Sources[index].sourceIP = object.Sources[index].sourceIP;
                            data.Sources[index].displayName = object.Sources[index].displayName;
                            data.Sources[index].port = object.Sources[index].port;
                            data.Sources[index].enabled = object.Sources[index].enabled;
                            return data;
                    })

                 alert("başarılı");


                }
        },
        mounted()
        {

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
        border-bottom-color: #ffffff;
        background-color: #0fc5bb;
        text-align: center;
        color: #fff;
        font-weight: 700;
    }
    .add-device{

        color: rgba(255,255,255,0.9);
        cursor: pointer;
        float: left;
        background-color: #4ab4c3;
        width: 49%;
        border-radius: 4px;
    }
    .add-device h1 {
        text-align: center;
        font-size: 16pt;
        justify-content: center;
    }
    .add-port{
        color: rgba(255,255,255,0.9);
        cursor: pointer;
        float: right;
        background-color: #4ab4c3;
        width: 49%;
        border-radius: 4px;
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
