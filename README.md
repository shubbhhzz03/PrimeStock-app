# PRIMESTOCK APP - Inventory Management System
Welcome to **PRIMESTOCK**, an intuitive and powerful inventory management system built using the MERN stack *(MongoDB, Express.js, React.js, and Node.js)*.
**PRIMESTOCK** is designed to help businesses efficiently manage their inventory, track stock levels, and streamline operations.
## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [License](#license)

## Project Overview

The project is a inventory management website using the MERN (MongoDB, Express.js, React.js, Node.js) stack. 
It incorporates various pages like a login page, register page, dashboard, forgot password page, edit profile page.
The website is accompanied by functionalities like registering to the site by making your account, accessing your profile after logging in, adding a product, editing your profile, submitting any queries experienced by the user.

## Features
- User authentication and authorization
- Manage products, companies, locations, and brands
- Track product history
- Dashboard with analytics
- Responsive design with Tailwind CSS

## Technologies
### Frontend
- React.js
- Bootstrap

### Backend
- Node.js
- Express.js
- MongoDB
## Usage
### To Run
- In the project directory, `npm install` to install all necessary dependencies
- `cd src` then `node server` to start the backend node server
- Go back to the root project directory, `npm start` to start the frontend React client

 ## Folder Structure

```plaintext
C:.
├───Backend
│   │   .env
│   │   .gitignore
│   │   server.js
│   │ package-lock.json
│   │   package.json
│   │   README.md
│   │
│   ├───controllers
│   │       contactController.js
│   │       productController.js
|   |       userController.js
│   │
│   ├───db
│   │       user_db.js
│   │
│   ├───middlewares
│   │      authMiddleware.js
|   |      errorMIddleware.js
│   │
│   ├───models
│   │       productModel.js
│   │       tokenModel.js
│   │       userModel.js
│   │
│   ├───routes
│   │       contactRoute.js
│   │       productRoute.js
│   │       userRoute.js
│   │
│   └───utils
│           fileUpload.js
|           sendEmail.js
│
└───Frontend
    │   .env
    │   .gitignore
    │   index.html
    │   package-lock.json
    │   package.json
    │   README.md
    │   .npmrc
    │
    ├───public
    │      favicon.ico
    |      index.html
    |      manifest.json
    |      robots.txt
    |      logo512.png
    |      logo192.png
    │
    └───src
        │   App.js
        │   index.css
        │   index.js
        │   
        │
        ├───assets
        │       inv-img.png
        |       loader.gif
        │
        ├───components
        │       card
        |       changePassword
        |       footer
        |       header
        |       infoBox
        |       layout
        |       loader
        |       product
        |       protect
        |       search
        |       sidebar
        └───customHook
        │       useRedirectedLoggedOutUser.js
        │
        ├──data
        │      sidebar.js
        |     
        ├───pages
        │      addProduct
        │      auth
        │      contact
        │      dashboard
        │      editProduct    
        │      Home    
        │      profile
        |    
        ├───redux
        |      features
        |      store.js   
        |         
        ├───services
        │       authService.js

```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

