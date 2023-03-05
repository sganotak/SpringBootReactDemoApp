CREATE TABLE IF NOT EXISTS users (
                       id INT PRIMARY KEY,
                       name VARCHAR(50),
                       surname VARCHAR(50),
                       gender CHAR(1),
                       birthdate VARCHAR(50),
                       home_address_id INT,
                       work_address_id INT
);

CREATE TABLE IF NOT EXISTS addresses (
                        id INT PRIMARY KEY,
                        street VARCHAR(255) NOT NULL,
                        city VARCHAR(255) NOT NULL,
                        zipcode VARCHAR(255) NOT NULL
    );

INSERT INTO users (id,name, surname, gender, birthdate, home_address_id, work_address_id)
VALUES
    (1,'Sam', 'Doe', 'M', '01/01/1990', NULL, NULL),
    (2,'Jane', 'Doe', 'F', '01/01/1992', NULL, NULL),
    (3,'Bob', 'Smith', 'M', '01/02/1985', 1, 2);

INSERT INTO addresses (id, street, city, zipcode)
VALUES
    (1, '123 Main St', 'Anytown', '12345'),
    (2, '456 Second St', 'Othertown', '67890');