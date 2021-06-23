--CREATE DATABASE--

CREATE DATABASE products;
USE product;

--CREATE TABLES--

CREATE TABLE product (
id SERIAL,
name VARCHAR(50),
slogan VARCHAR(150),
description VARCHAR(500),
category VARCHAR(30),
default_price VARCHAR(10),
PRIMARY KEY (id)
);

CREATE TABLE features (
id SERIAL,
product_id INT,
feature VARCHAR(100),
value VARCHAR(100),
PRIMARY KEY (id)
);

CREATE TABLE related (
id SERIAL,
current_product_id INT,
related_product_id INT,
PRIMARY KEY (id)
);

CREATE TABLE styles (
id SERIAL,
product_id INT,
name VARCHAR(100),
sale_price VARCHAR(10),
original VARCHAR(10),
default_style INT,
PRIMARY KEY (id)
);

CREATE TABLE skus (
id SERIAL,
style_id INT,
size VARCHAR(10),
quantity INT,
PRIMARY KEY (id)
);

CREATE TABLE photos (
id SERIAL,
style_id INT,
url TEXT,
thumbnail_url TEXT,
PRIMARY KEY (id)
);

--IMPORT DATA--
--change the directory accordingly

COPY product
FROM '/home/luka/Downloads/product.csv'
DELIMITER ','
CSV HEADER;

COPY features
FROM '/home/luka/Downloads/features.csv'
DELIMITER ','
CSV HEADER;

COPY related
FROM '/home/luka/Downloads/related.csv'
DELIMITER ','
CSV HEADER;

COPY styles
FROM '/home/luka/Downloads/styles.csv'
DELIMITER ','
CSV HEADER;

COPY skus
FROM '/home/luka/Downloads/skus.csv'
DELIMITER ','
CSV HEADER;

COPY photos
FROM '/home/luka/Downloads/photos.csv'
DELIMITER ','
CSV HEADER;





