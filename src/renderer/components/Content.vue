<template>
    <div class="page-wrapper">
        <!-- SettingsModel -->

        <left-side-panel></left-side-panel>
        <right-side-panel></right-side-panel>
        <!-- SettingsModel -->
        <div class="container-fluid">
            <!-- Title -->
            <div class="row heading-bg">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">flot chart</h5>
                </div>

                <!-- Breadcrumb -->
                <div class="col-lg-9 col-sm-8 col-md-8 col-xs-12">
                    <ol class="breadcrumb">
                        <li><a href="index.html">Dashboard</a></li>
                        <li><a href="#">charts</a></li>
                        <li class="active"><span>flot chart</span></li>
                    </ol>
                </div>
                <!-- /Breadcrumb -->

            </div>
            <!-- /Title -->
            <div class="panel panel-default card-view">
                <div class="panel-heading">
                    <div class="pull-left">
                        <h6 class="panel-title txt-dark">bar Chart</h6>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="panel-wrapper collapse in">
                    <div class="panel-body">
                        <div class="flot-container" style="height:200px">
                        </div>
                    </div>
                </div>
            </div>
            <el-table
                    :data="tableData"
                    :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="Date"
                        sortable
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="Name"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="Address"
                        :formatter="formatter">
                </el-table-column>
            </el-table>



        </div>
        <!-- Footer -->
        <footer class="footer container-fluid pl-30 pr-30">
            <div class="row">
                <div class="col-sm-12">
                    <p>2018 &copy; Goofy. Pampered by Hencework</p>
                </div>
            </div>
        </footer>
        <!-- /Footer -->
    </div>
</template>
<script>
    import Settings from './Settings';
    import RightSidePanel from  './RightSidePanel';
    import LeftSidePanel from './LeftSidePanel';
    var fl = require('node-filelist');
    import db from '../settings/db';
    import dataTablesdata from '../assets/dist/js/dataTables-data.js';
    import dataTables from '../vendors/bower_components/datatables/media/js/jquery.dataTables.min.js';




    export default {
        name: "Content.vue",
        data()  {
            return {
                filesDir:[],
                filePath:"C:\\test\\logs\\10.10.10.1\\2019-06-15.log",
                sqlIP:null,
                tableData: [{
                    date: '2016-05-03',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles'
                }, {
                    date: '2016-05-02',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles'
                }, {
                    date: '2016-05-04',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles'
                }, {
                    date: '2016-05-01',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles'
                }]
            }
        },

        components : {
            Settings,
            RightSidePanel,
            LeftSidePanel
        },

        methods: {
            formatter(row, column) {
                return row.address;
            }
        },
        mounted() {

            var ip = this.$cookie.get('splitIP');



            var fs = require('fs'); // native fs module
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
                        else {
                            // Let async know this file is done
                            callback();
                        }
                    },
                    function(err) { //This is only called after all files have fired their 'callback'



                    });
            });
            this.filesDir = manifest.files;
        }



    }
</script>
<style scoped>


</style>
