// targeting add to cart buttons
let cart = document.querySelectorAll('.add-cart');
// array of product objects
let products = [
    {
        name: 'Beats Studio 3',
        price: 799,
        inCart: 0
    },
    {
        name: 'Beats Pill',
        price: 999,
        inCart: 0
    },
    {
        name: 'Apple Airpods',
        price: 1299,
        inCart: 0
    },
    {
        name: 'Apple Airpods Pro',
        price: 1999,
        inCart: 0
    },
    {
        name: 'Galaxy Buds Plus',
        price: 1699,
        inCart: 0
    }
]

// forLoop to loop through array
for(let i = 0; i < cart.length; i++) {
    cart[i].addEventListener('click', () => {
        let cartCost = localStorage.getItem('totalCost');
        alert(`Your current cart total before this entry is R${cartCost}`);
        // run cartNumbers function
        cartItems(products[i]);
        // run totalCost function
        totalCost(products[i]);
    });
}

// function cartItems for items in cart
function cartItems(products) {
    // use of localStorage to getItems
    let productItems = localStorage.getItem('cartItems');
    // parseInt to get numerical value, otherwise it is a string
    productItems = parseInt(productItems);

    // if statement 
    if(productItems) {
        localStorage.setItem('cartItems', productItems + 1);
    } else {
        localStorage.setItem('cartItems', 1);
    }
    // calling bellow setItems function 
    setItems(products);
    
}

function  setItems(products) {
    let items = localStorage.getItem('productsInCart');
    // items parsed to become js objects in destination page
    items = JSON.parse(items);

    //if statement to see if something exists in setItems
    if (items != null) {
        // if to check if product in setItems is equal to items in cart
        if(items[products.name] == undefined){
            items = {
                // grab what was in cart before using rest operator
                ...items,
                [products.name]: products
            }
        }
        items[products.name].inCart += 1;
    } else { //if clicked on product for first time, set inCart to 1
        products.inCart = 1;
        items = {
            [products.name]: products
    }
}
    // productsInCart set to JSON stringify format to move between pages
    localStorage.setItem('productsInCart', JSON.stringify(items));
}

// function for cart total
function totalCost(products) {
    let cartCost = localStorage.getItem('totalCost');
    
    //if statement
    if(cartCost != null) {
        // parse to int to show int and not NaN
        cartCost = parseInt(cartCost);
        // save to local storage
        localStorage.setItem('totalCost', cartCost + products.price);
    } else {
        // initial product.price set to local storage
        localStorage.setItem('totalCost', products.price);
    }
}

function displayCart() {
    let items = localStorage.getItem('productsInCart');
    items = JSON.parse(items);
    let productContainer = document.querySelector('.products');
    let cartCost = localStorage.getItem('totalCost');

    if(items && productContainer) {
        productContainer.innerHTML = '';
        Object.values(items).map(products => {
            productContainer.innerHTML += `<div class="products">${products.name}</div>
            <div class"price">R${products.price},00</div>
            <div class="quantity">${products.inCart}</div>
            <div class="total">R${products.inCart * products.price},00</div>`
            ;
            
        })

        productContainer.innerHTML += `
            <div class="cartTotalContainer">
            <h5 class="cartSubTotalTitle">
                Sub-Total
            </h5>
            <h5 class="cartSubTotal">
                R${cartCost}
            </h5> 
            <h6 class="VatTitle">
                VAT 15%
            </h6>
            <h5 class="cartTotalTitle">
                Total
            </h5>         
            <h5 class="cartTotal">
                R${(cartCost * 1.15).toFixed(2)}
            </h5>          
        `
        ;
    }
   
}


// display cart page on page load
displayCart();

// jQuery

// performed order ref number with jquery function 
$('#confirm-order').click(function() {
    // generate 6 numbers
    let ref = (Math. floor(100000 + Math. random() * 900000));
    alert('Success! You have just bought some sweet products! \n Your ref number is: ' + ref)
});

// on homepage, the Deelz logo in the body has the following animation
$('.homepagelogo').fadeOut(3000).fadeIn(3000).fadeOut(3000).fadeIn(3000).fadeOut(3000).fadeIn(3000).fadeOut(3000).fadeIn(3000);

// all h1's on all page with below specified class will have the following chained effect when page loads
$('.pageHeader').ready(function() {
    $('.pageHeader').fadeOut(3000).fadeIn(3000).fadeOut().fadeIn('slow');
});

