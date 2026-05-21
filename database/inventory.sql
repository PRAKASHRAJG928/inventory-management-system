CREATE DATABASE IF NOT EXISTS inventory_db;
USE inventory_db;

-- Item Types
CREATE TABLE IF NOT EXISTS item_types (
  id INT PRIMARY KEY AUTO_INCREMENT,
  type_name VARCHAR(100) NOT NULL
);

INSERT INTO item_types(type_name)
VALUES
('Electronics'),
('Furniture'),
('Clothing'),
('Books'),
('Sports');

-- Items
CREATE TABLE IF NOT EXISTS items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  purchase_date DATE NOT NULL,
  stock_available BOOLEAN DEFAULT FALSE,
  item_type_id INT,
  FOREIGN KEY (item_type_id)
    REFERENCES item_types(id)
    ON DELETE CASCADE
);

