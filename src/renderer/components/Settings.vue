<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h5 class="modal-title" id="exampleModalLabel1">Ayarlar</h5>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="recipient-name" class="control-label mb-10">Log Kayıt Yolu</label>
                            <input  type="text" name="log" class="form-control" v-model="logPath" id="logPath">
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="control-label mb-10">Arşiv Kayıt Yolu</label>
                            <input type="text" name="arsiv" class="form-control" v-model="arsivPath" id="arsivPath">
                        </div>
                        <li style="list-style: none;">
                            <div  class="form-group">
                                <label for="message-text" class="control-label mb-10">Source IP  </label>
                                <input type="text"  name="sourceIP" class="form-control" v-model="sourceIP" id="sourceIP">
                            </div>
                        </li>
                        <li style="list-style: none;">
                            <div  class="form-group">
                                <label for="message-text" class="control-label mb-10">Source IP  </label>
                                <input type="time"  name="sourceIP" class="form-control" v-model="timePicker" id="timePicker">
                            </div>
                        </li>
                    </form>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Kapat</button>
                    <button @click="submit" type="button" class="btn btn-primary">Kaydet</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mysql from 'mysql';
    import swal from 'sweetalert';
    import service from '../settings/service.js'
    export default {
        name: "Settings.vue",
        data() {
            return {
                logPath: null,
                arsivPath: null,
                sourceIP: null,
                lisansClient: null,
                timePicker:null
            }
        },
        mounted() {

        },
        methods: {

            submit() {
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
                    var ipSorgu = results["ipaddress"];
                    var lisansclientSorgu = results[0]["lisansclient"];
                    var isCreatedSorguSorgu = results["isCreated"];
                    var ip = sourceIpInp;
                    var splitIp = ip.split(',')
                    var countIP = splitIp.length;
                    console.log(countIP);
                    console.log(lisansclientSorgu);
                    if (countIP > lisansclientSorgu) {
                        swal("Hata!", "Lisans'ta belirlenen client sayısı kadar (" + lisansclientSorgu + ") adet Kaynak IP girebilirsiniz!", "error");
                    } else {
                        let sql = 'UPDATE syslog SET ipaddress = "'+ip+'", arsivDate = "'+timeArsiv+'" WHERE username = "' +usernameSessiona+ '" ' ;
                        connection.query(sql);
                        service.runServe();

                    }

                });


            }


        }
    }



</script>

<style scoped>

</style>
