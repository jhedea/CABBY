-- Table for the customers
CREATE TABLE customers (
  customer_id INT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  address VARCHAR(200) NOT NULL,
  city VARCHAR(50) NOT NULL,
  state VARCHAR(50) NOT NULL,
  zip_code VARCHAR(10) NOT NULL,
  country VARCHAR(50) NOT NULL
);

-- Table for the cars
CREATE TABLE cars (
  car_id INT PRIMARY KEY,
  make VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  year INT NOT NULL,
  color VARCHAR(50) NOT NULL,
  transmission VARCHAR(20) NOT NULL,
  fuel_type VARCHAR(20) NOT NULL,
  daily_rate DECIMAL(10, 2) NOT NULL,
  available BOOLEAN NOT NULL
);

-- Table for the rentals
CREATE TABLE rentals (
  rental_id INT PRIMARY KEY,
  customer_id INT NOT NULL,
  car_id INT NOT NULL,
  rental_start_date DATE NOT NULL,
  rental_end_date DATE NOT NULL,
  total_cost DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers (customer_id),
  FOREIGN KEY (car_id) REFERENCES cars (car_id)
);
