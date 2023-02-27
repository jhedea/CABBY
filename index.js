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


}
