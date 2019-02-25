$(function () {
    let totalCost = 0;
    let itemsInCart = [];

    const render = function (movieList) {
        clearDiv();
        $('#movielist').empty();
        $('#cartlist').empty();
        $('.totalcost').empty();
        totalCost = 0;
        itemsInCart = [];

        for (let i = 0; i < movieList.length; i++) {
            $('#movielist').append(`<tr><td><input class = "inputbox qty${movieList[i].id}" ></td><td>${movieList[i].product_name}</td><td>${movieList[i].stock_quantity}</td><td>$${movieList[i].price}</td><td><button class = "btn btn-success" data-id=${movieList[i].id}">Add to Cart</button></td></tr>`);
        }
    }

    const getProducts = function () {
        $.get('/api/products')
            .then(function (data) {
                render(data);
            });
    };

    const clearDiv = function () {
        $('#response').empty();
    };

    const updateCartModal = function (qty, product) {
        product.stock_quantity -= qty;

        const lineTotal = product.price * qty;
        totalCost += lineTotal;

        itemsInCart.push(product);

        $('#cartlist').append(`<tr><td>${qty}</td><td>${product.product_name}</td><td>$${product.price}</td><td>$${lineTotal.toFixed(2)}</td></tr>`);
        $('.totalcost').text(`$${totalCost.toFixed(2)}`)
    }

    const addToCart = function () {
        clearDiv();
        const id = $(this).attr('data-id');
        $.get(`/api/products/${id}`).then(updateCart);
    };

    const updateCart = function (product) {
        const numOrdered = $(`.qty${product.id}`).val();

        if ((numOrdered != "") && (numOrdered <= product.stock_quantity)) {
            updateCartModal(numOrdered, product);
            $('#response').text("Your cart has been updated");
            $(`.qty${product.id}`).val('');
        }
        else if (numOrdered > product.stock_quantity) {
            $('#response').text("Sorry, we do not have that many in stock.");
        }
    };

    const checkOut = function () {
        $('#finaltotal').text(`$${totalCost.toFixed(2)}`);

        itemsInCart.forEach(function (data) {
            $.ajax({
                method: 'PUT',
                url: `/api/products/${data.id}`,
                data: data
            });
        });
    };

    getProducts();

    //mgr view//
    $('section').hide();
    const renderInv = function (movieList) {
        $('section').hide();
        $('#inventorypage').show();
        $('#movielistmgr').empty();

        for (let i = 0; i < movieList.length; i++) {
            $('#movielistmgr').append(`<tr><td>${movieList[i].id}</td><td>${movieList[i].product_name}</td><td>${movieList[i].stock_quantity}</td><td>$${movieList[i].price}</td></tr>`);
        }
    }

    const showInventory = function () {
        $.get('/api/products')
            .then(function (data) {
                renderInv(data);
            });
    };

    const renderLowInv = function (movieList) {
        $('section').hide();
        $('#lowinventory').show();
        $('#movielistlow').empty();

        for (let i = 0; i < movieList.length; i++) {
            if (movieList[i].stock_quantity <= 5) {
                $('#movielistlow').append(`<tr><td>${movieList[i].id}</td><td>${movieList[i].product_name}</td><td>${movieList[i].stock_quantity}</td><td>$${movieList[i].price}</td></tr>`);
            }
        };

    };

    const showLowInventory = function () {
        $.get('/api/products')
            .then(function (data) {
                renderLowInv(data);
            });
    };

    const getInventoryList = function () {
        $('section').hide();
        $.get('/api/products')
            .then(function (data) {
                for (let i = 0; i < data.length; i++) {
                    $('#productlist').append(`<option value = "${data[i].id}"> ${data[i].product_name}</option>`);
                }
            });
        $('#addtoinventory').show();
    };
    const addtoInventory = function () {
        const id = $('#productlist').val();
        const newStock = parseInt($('.addId').val());
        console.log(newStock);
        let newArray = [];
        $.get(`/api/products/${id}`).then(function (data) {
            newArray.push(data);
            console.log(newArray);
            newArray[0].stock_quantity += newStock;

            newArray.forEach(function (data) {
                $.ajax({
                    method: 'PUT',
                    url: `/api/products/${data.id}`,
                    data: data
                });
            });
        });
        alert("Items succesfully added to inventory!")
        $('.addId').val('');
        $('#productlist').val('');
    };
    const showNewProduct = function () {
        $('section').hide();
        $('#addnewproduct').show();
    }

    const captureInputs = function () {
        const newProduct = {
            product_name: $('.inputmovie').val().trim(),
            department_name: $('.inputgenre').val().trim(),
            price: $('.inputprice').val().trim(),
            stock_quantity: $('.inputamount').val().trim()
        };

        $.post('/api/products', newProduct)
            .then(function (data) {
                alert("New product added to Bamazon!")
                $('.inputmovie').val('');
                $('.inputgenre').val('');
                $('.inputprice').val('');
                $('.inputamount').val('');
            });
    };

    //home listeners//
    $('#movielist').on('click', '.btn-success', addToCart);
    $('#checkout').on('click', checkOut);
    $('#finalcheckout').on('click', getProducts);

    //mgr listeners//
    $('#viewitems').on('click', showInventory);
    $('#viewlow').on('click', showLowInventory);
    $('#refillstock').on('click', getInventoryList);
    $('#addtostock').on('click', '.btn-warning', addtoInventory);
    $('#addnew').on('click', showNewProduct);
    $('#addnewbtn').on('click', '.btn-danger', captureInputs);
});