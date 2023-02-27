// Get references to relevant elements
const searchForm = document.querySelector('#search-form');
const searchButton = document.querySelector('#search-button');
const resultsContainer = document.querySelector('#results-container');

// Listen for form submission
searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload

    // Get form data
    const pickupDate = document.querySelector('#pickup-date').value;
    const returnDate = document.querySelector('#return-date').value;
    const location = document.querySelector('#location').value;

    // Make API request to get available cars
    const url = `https://cabby.github.io.com/api/cars?pickupDate=${pickupDate}&returnDate=${returnDate}&location=${location}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Clear previous results
            resultsContainer.innerHTML = '';

            // Display results
            data.forEach(car => {
                const carCard = document.createElement('div');
                carCard.classList.add('car-card');
                carCard.innerHTML = `
          <img src="${car.imageUrl}" alt="${car.make} ${car.model}">
          <h3>${car.make} ${car.model}</h3>
          <p>Price per day: ${car.price}</p>
          <button class="rent-button">Rent Now</button>
        `;
                resultsContainer.appendChild(carCard);

                // Listen for rent button click
                const rentButton = carCard.querySelector('.rent-button');
                rentButton.addEventListener('click', function() {
                    rentCar(car.id, pickupDate, returnDate, location);
                });
            });
        })
        .catch(error => {
            console.error(error);
            resultsContainer.innerHTML = '<p>Error fetching cars. Please try again later.</p>';
        });
});

// Function to rent a car
function rentCar(carId, pickupDate, returnDate, location) {
    // Make API request to rent car
    const url = 'https://cabby.github.io.com/api/rent';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            carId: carId,
            pickupDate: pickupDate,
            returnDate: returnDate,
            location: location
        })
    };
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            alert('Car rented successfully!');
        })
        .catch(error => {
            console.error(error);
            alert('Error renting car. Please try again later.');
        });
}

// Get references to relevant elements
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const signInForm = document.querySelector('#sign-in-form');

// Listen for form submission
signInForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload

    // Get form data
    const email = emailInput.value;
    const password = passwordInput.value;

    // Make API request to sign in user
    const url = 'https://cabby.github.io.com/api/signin';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    };
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            // Save user data to local storage
            localStorage.setItem('user', JSON.stringify(data));

            // Redirect to home page
            window.location.href = 'https://cabby.github.io.com/home';
        })
        .catch(error => {
            console.error(error);
            alert('Invalid email or password. Please try again.');
        });
});


// Get references to relevant elements
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartIcon = document.querySelector('#cart-icon');
const cartCount = document.querySelector('#cart-count');
const cartItemsList = document.querySelector('#cart-items');

// Initialize cart
let cart = [];
loadCart();

// Listen for add to cart button clicks
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const carId = button.getAttribute('data-car-id');
        addToCart(carId);
    });
});

// Add a car to the cart with the given ID
function addToCart(carId) {
    // Find car in cart, or add it if it's not already there
    const cartItem = cart.find(item => item.carId === carId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            carId: carId,
            quantity: 1
        });
    }

    // Save cart to local storage and update UI
    saveCart();
    updateCartUI();
}

// Remove a car from the cart with the given ID
function removeFromCart(carId) {
    // Find car in cart and remove it
    const cartItemIndex = cart.findIndex(item => item.carId === carId);
    if (cartItemIndex !== -1) {
        cart.splice(cartItemIndex, 1);
    }

    // Save cart to local storage and update UI
    saveCart();
    updateCartUI();
}

// Save the current cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load the current cart from local storage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartUI();
}

// Update the cart UI with the current cart contents
function updateCartUI() {
    // Update cart count in header
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = cartItemCount;

    // Update cart icon in header
    if (cartItemCount > 0) {
        cartIcon.classList.add('has-items');
    } else {
        cartIcon.classList.remove('has-items');
    }

    // Update cart items list
    cartItemsList.innerHTML = ''; // Clear previous cart items
    cart.forEach(item => {
        const car = getCarById(item.carId);
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
      <span>${car.make} ${car.model}</span>
      <span>${car.pricePerDay} per day</span>
      <span>${item.quantity} x</span>
      <button class="remove-from-cart" data-car-id="${car.id}">Remove</button>
    `;
        cartItemsList.appendChild(cartItem);
    });

    // Listen for remove from cart button clicks
    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
    removeFromCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const carId = button.getAttribute('data-car-id');
            removeFromCart(carId);
        });
    });
}

// Get car data by ID from server
function getCarById(carId) {
    // Make API request to get car data
    const url = `https://cabby.github.io.com/api/cars/${carId}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error(error);
            alert('Error getting car data.')
        })

}


}
