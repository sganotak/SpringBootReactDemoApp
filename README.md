# SpringBootReactDemoApp

This is a simple web api demo project that emulates a Full-Stack user registration system. It uses the following tech stack

- Frontend: React.js
- Backend: SpringBoot 3.0
- DBMS: MySQL


## Prerequisites

Before you begin, ensure you have met the following requirements:

- Java 17 or later installed
- Maven 3.6.3 or later installed

## Installation

To install and run the project, follow these steps:

1. Clone the repository and navigate to the project root directory.

2. On your terminal build the project using Maven by running `mvn clean install` or if you are a Windows Powershell user run `./mvnw clean install`

3. Navigate to the target directory with `cd target`

4. Start the server by running `java -jar demo-0.0.1-SNAPSHOT.jar`

5. The server will start and be available at `http://localhost:8080`.

## Usage

1. In the User Registration page you can register a new user to the database.
2. The Display Users page has a list with all registered users, by clicking on any user's name you will be directed to his/her profile page.
3. In the User Profile page you can update the user's profile or delete the user's account.

