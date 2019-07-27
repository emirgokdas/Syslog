exports.runServe = function () {
    var Service = require('node-windows').Service;
    var svc = new Service({
        name:'Subgate Syslog',
        script: require('path').join(__dirname,'server.js')
    });
    svc.on('install', function () {
        svc.start();
    });
    svc.install();
};
