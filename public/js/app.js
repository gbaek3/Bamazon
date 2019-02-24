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
                // console.log(data);
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

        if ((numOrdered != "") && (numOrdered < product.stock_quantity)) {
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

    $('#movielist').on('click', '.btn-success', addToCart);
    $('#checkout').on('click', checkOut);
    $('#finalcheckout').on('click', getProducts);

});