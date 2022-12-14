### The frontend was created with [Create React App](https://github.com/facebook/create-react-app).
### The backend was created with [Spring Boot](https://start.spring.io/)

## Setup

In backend/src/main/resources create a file called application.properties and add the 
following properties: 

`spring.datasource.url=****`

`spring.jpa.hibernate.ddl-auto=update`

`spring.datasource.username=****`

`spring.datasource.password=****`

`spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect`

`fourm.app.jwtSecret=****`

`fourm.app.jwtExpirationMs=****`

`security.user.name=****`

`security.user.password=****`

`security.user.role=****`

`spring.mail.host=smtp.gmail.com`

`spring.mail.port=587`

`spring.mail.username=*******@gmail.com`

`spring.mail.password=****************`

`spring.mail.properties.mail.smtp.auth=true`

`spring.mail.properties.mail.smtp.starttls.enable=true`

`spring.mail.properties.mail.smtp.starttls.required=true`


Replace the asterisks with required information




Requires Node.JS installed

Preferred IDE is IntelliJ, runs on VS Code, haven't tested on Visual Studio

Open terminal in project location

### `cd .\frontend\`

### `npm install`

to install dependencies

## Frontend

To run the frontend use

### `npm run start` with your location at `frontend` in terminal

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Backend

Run /backend/src/main/java/com/fourm/backend/BackendApplication.java
to run backend
