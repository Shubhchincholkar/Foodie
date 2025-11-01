
use railway;
CREATE DATABASE foodie_orders;

USE foodie_order;
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(50),
  middleName VARCHAR(50),
  lastName VARCHAR(50),
  phone VARCHAR(15),
  email VARCHAR(100),
  address TEXT,
  foodItem VARCHAR(50),
  quantity INT,
  unitPrice DECIMAL(10,2),
  totalPrice DECIMAL(10,2),
  instructions TEXT,
  orderTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from orders;
commit
