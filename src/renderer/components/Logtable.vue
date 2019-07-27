<template>

    <el-tabs type="border-card">
        <el-collapse style="background-color: #0fc5bb;"  v-for="(item,index) in name" accordion>
            <el-collapse-item :title="item.sourceIP" name="1">
                <b-table  striped hover :items="files"></b-table>
            </el-collapse-item>
        </el-collapse>
        <el-tab-pane style="height: 500px;" label="Logs">

        </el-tab-pane>
        <el-tab-pane style="height: 500px;" label="Archives">Archives</el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        props:["name","jsonData"],
        name: "logtable.vue",
        data(){
            return {
                files:'',

            }
        },
        mounted() {
            console.log(this.name);
            var vm = this;
            // Import the module
            var readdirp = require('readdirp');

            var settings = {
                root: 'C:\\test\\logs\\10.10.10.1',
                entryType: 'all'
            };

// In this example, this variable will store all the paths of the files and directories inside the providen path
            var allFilePaths = [];

// Iterate recursively through a folder
            readdirp(settings)
                .on('data', function (entry) {
                    // execute everytime a file is found in the providen directory

                    // Store the fullPath of the file/directory in our custom array
                    allFilePaths.push(
                        {name: entry.name, path: entry.fullPath ,size:entry.stat.size,date:entry.stat.atime}
                    );
                })
                .on('warn', function(warn){
                    console.log("Warn: ", warn);
                })
                .on('error', function(err){
                    console.log("Error: ", err);
                })
                .on('end', function(){

                    console.log(allFilePaths);
                    vm.files=allFilePaths;
                    // ["c:/file.txt","c:/other-file.txt" ...]
                })
            ;
        }
    }
</script>

<style scoped>

</style>