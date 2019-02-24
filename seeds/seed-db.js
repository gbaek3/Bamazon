const db = require("../models");
const movies = [
    {
        product_name: "21 Jump Street",
        department_name: "Comedy",
        price: 29.99,
        stock_quantity: 23
    },
    {
        product_name: "50 50",
        department_name: "Drama",
        price: 14.99,
        stock_quantity: 55
    },
    {
        product_name: "500 Days of Summer",
        department_name: "Rom Com",
        price: 27.77,
        stock_quantity: 22
    },
    {
        product_name: "Attack the Block",
        department_name: "Action",
        price: 12.99,
        stock_quantity: 710
    },
    {
        product_name: "Begin Again",
        department_name: "Drama",
        price: 13.50,
        stock_quantity: 4
    },
    {
        product_name: "Chef",
        department_name: "Comedy",
        price: 24.99,
        stock_quantity: 101
    },
    {
        product_name: "End of Watch",
        department_name: "Action",
        price: 44.00,
        stock_quantity: 202
    },
    {
        product_name: "Guardians of the Galaxy",
        department_name: "Action",
        price: 45.99,
        stock_quantity: 44
    },
    {
        product_name: "How To Train Your Dragon",
        department_name: "Animated",
        price: 87.89,
        stock_quantity: 13
    },
    {
        product_name: "Jumanji",
        department_name: "Action",
        price: 9.99,
        stock_quantity: 99
    }
];

db.sequelize.sync({ force: true }).then(function () {
    db.Product.bulkCreate(movies).then(function (rows) {
        console.log('Data successfully added!');
    }).catch(function (error) {
        console.log('Error', error)
    });
})