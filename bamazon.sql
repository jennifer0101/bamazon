DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR (100) NULL,
department_name VARCHAR (100) NULL,
price DECIMAL(10,2) NULL,
stock_quantity INT NULL,
PRIMARY KEY (id)
);


INSERT INTO products 
	(product_name, department_name, price, stock_quantity)
VALUES 
	("Greenworks Cordless Electric Lawnmower", "Garden and Outdoor", 279.99, 15),
	("Snow Joe Electric Cordless Snow Blower", "Garden and Outdoor", 299.99, 56),
	("Fiesta 16-Peice Dinnerware Set", "Home and Kitchen", 139.99, 68),
	("Lodge Cast Iron Skillet", "Home and Kitchen", 15.99, 211),
	("KitchenAid 5-QT Mixer", "Home and Kitchen", 299.00, 39),
	("Victrola Vintage Turntable", "Electronics", 45.99, 174),
	("TCL 50 inch 4K Smart TV", "Electronics", 259.99, 28),
	("Thinksport 17oz Water Bottle", "Home and Kitchen", 19.99, 5),
	("LEGO Classic Creative Brick Box 790 Pieces", "Toys", 49.99, 83),
	("Playmobil Playground Set", "Toys", 30.99, 41);
