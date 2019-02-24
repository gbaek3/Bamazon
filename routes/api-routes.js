const db = require("../models");

module.exports = function (app) {
    app.get('/api/products', function (req, res) {
        db.Product.findAll({}).then(function (movies) {
            res.json(movies);
        }).catch(function (err) {
            res.json({ err: err });
        });
    });

    app.get('/api/products/:id', function (req, res) {
        db.Product.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (movies) {
            res.json(movies);
        }).catch(function (err) {
            res.json({ err: err });
        });
    });

    app.put('/api/products/:id', function (req, res) {
        db.Product.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }).then(function (data) {
                res.json({ success: true, data: data });
            }).catch(function (err) {
                res.json({ success: false, error: err });
            });
    });

};
