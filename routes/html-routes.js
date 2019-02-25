const path = require('path');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    app.get('/managerpage', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/manager.html'));
    });

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
}