
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://yelp-camp-z1g5.onrender.com/">
    <img src="https://res.cloudinary.com/dipjyyshp/image/upload/v1706954591/android-chrome-512x512_fr3bp9.png" alt="Logo" width="80" height="80">
  </a>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

YelpCamp, a comprehensive web application, allows users to both create and review campgrounds. To engage in reviewing or creating a campground, an account is required. This endeavor is a component of Colt Steele's web development bootcamp course on Udemy.

Constructed with Node.js, Express, MongoDB, and Bootstrap, the project employs Passport.js for authentication purposes.

> Home page
![Home Page](https://res.cloudinary.com/dipjyyshp/image/upload/v1706956161/home-desktop_amftyk.png)


> All campgrounds
![All campgrounds](https://res.cloudinary.com/dipjyyshp/image/upload/v1706956423/Screenshot_2024-02-03_at_11.33.19_oremdd.png)


> One campground view page
![One campground view page](https://res.cloudinary.com/dipjyyshp/image/upload/v1706957113/Group_1_1_y7jz8j.png)


> Register and login pages
![Register and Login pages](https://res.cloudinary.com/dipjyyshp/image/upload/v1706958588/Group_2_qktpet.png)



### Built With

This section shows main frameworks/libraries used to build this project.


> [Express JS](https://expressjs.com/) - is used for web development, RESTful APIs, middleware integration and routing.

> [EJS](https://ejs.co/) - allows to embed JavaScript code directly into HTML templates, making it easier to inject dynamic data into the markup.

> [Mongoose](https://mongoosejs.com/) - provides a straight-forward, schema-based solution to model application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

> [Bootstrap](https://getbootstrap.com/) - is a free and open-source front-end framework developed by Twitter. Helps to create simple and responsive design.

> [Passport](https://www.passportjs.org/) - is authentication middleware for Node.js. Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more.

> [MapBox](https://www.mapbox.com/) - AI-powered location technology for automakers, mobile app developers, and logistics services.

> [Cloudinary](https://cloudinary.com/) - is a cloud-based service that provides end-to-end image and video management solutions. It offers a comprehensive set of tools and services for storing, managing, optimizing, and delivering media files in the cloud.


<!-- GETTING STARTED -->

## Getting Started
This guide will help you set up and install the required dependencies to run YelpCamp on your local machine. Ensure that you have Node.js and npm (Node Package Manager) installed before proceeding.

### Prerequisites
- Node.js (version 18.19.0 or higher)
- npm (Node Package Manager)

### Installation 

1. Clone the Repository:
```sh
 git clone https://github.com/aberllin/YelpCamp.git
```

2. Navigate to the Project Directory:
```sh
  cd YelpCamp
```

3. Install Dependencies:
```sh
  npm install
```

4. Set Up Environment Variables:
  - Create a .env file in the project root.
  - Add the following environment variables and replace the values with your own credentials:
```sh
  CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
  CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
  CLOUDINARY_SECRET=YOUR_CLOUDINARY_SECRET
  MAPBOX_TOKEN=YOUR_MAPBOX_TOKEN
  API_ENDPOINT=YOUR_API_ENDPOINT
  SESSION_SECRET=YOUR_SESSION_SECRET
  STORE_SECRET=YOUR_STORE_SECRET
```

5. Start the application:
```sh
npm start
```
This command will start the application, and you should see a message indicating that the server is running.

6. Access YelpCamp in Your Browser:
Open your web browser and navigate to http://localhost:3000.

Congratulations! You have successfully installed and set up YelpCamp on your local machine.

<!-- ROADMAP -->

## Roadmap

- [ ] Proper auth form validation
- [ ] Change the UI of removing images
- [ ] Integrate React 

See the [open issues](https://github.com/aberllin/YelpCamp/issues) for a full list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- CONTACT -->

## Contact

- [Personal Website](https://aberllin-dev.vercel.app/)
- [LinkedIn](https://www.linkedin.com/in/anastasia-kozluk-3949301b1/)
- [YelpCamp](https://github.com/aberllin/YelpCamp)

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

- [Web Developer Bootcamp 2024](https://www.udemy.com/course/the-web-developer-bootcamp/)
- [Multer](https://github.com/expressjs/multer)
- [Connect flash](https://github.com/jaredhanson/connect-flash#readme)
- [Joi validation](https://joi.dev/)
  


<br /><br />
**Thanks [othneildrew](https://github.com/othneildrew) for creating this amazing README template.**
<a href="#readme-top">Back to top</a>
