
# Top Tidings

> Web app where user can get glimpse of some latest headlines with features like latest news from a particular source or category and from search. User can also bookmark and share news

  

## Table of contents

*  [Installation](#installation)

*  [Tech Stack](#tech-stack)

*  [Features](#feature)

*  [Routes](#server-routes)

*  [Screenshots](#screenshots)

  

## Installation

  


- Clone the repository using `git clone` and then change the directory to root of the project

```
git clone 
cd Top-Tidings
```
- Create database

```
> Log into https://firebase.google.com and create database
```

- Use npm to install dependencies for the project.

```
> npm install
```

- Create .env file in root folder and add necessary credentials with variables given below.

```bash

REACT_APP_GOOGLE_API_KEY = "google-api-key"
REACT_APP_FB_API = "from-firebase-config-fb-api"
REACT_APP_FB_AUTH_DOMAIN = "from-firebase-config-fb-auth-domain"
REACT_APP_FB_DATABASE_URL = "from-firebase-config-fb-db-url"
REACT_APP_FB_PROJECT_ID = "from-firebase-config-fb-proj-id"
REACT_APP_FB_STORAGE_BUCKET = "from-firebase-config-fb-strg-bkt"
REACT_APP_FB_MESSAGING_SENDER_ID = "from-firebase-config-fb-sender-id"
REACT_APP_FB_APP_ID = "from-firebase-config-fb-app-id"
REACT_APP_FB_MEASUREMENT_ID = "from-firebase-config-fb-measurement-id"

```
- For firebase auth service

```
 > for google, enable google auth sevice from firebase in authentication methods
 > for facebook, log into https://developers.facebook.com and create app then copy app id  and app secret to firebase auth service then enable facebook auth service from firebase
 in authentication method
```

- Run the program 

```
> npm start
```

- Now navigate to http://localhost:3000

***
  

## Tech Stack


| ![ReactJs](https://res.cloudinary.com/prvnbist/image/upload/c_scale,h_80/v1564054850/React.js_logo-512_bvpygm.png "ReactJs")        | ![Redux](https://res.cloudinary.com/prvnbist/image/upload/c_scale,h_65/v1564054926/logo_a1hglt.png "Redux")           | ![Firebase](https://res.cloudinary.com/prvnbist/image/upload/c_scale,h_80/v1564055091/firebase_logo_k3wraf.png "Firebase")  |
| ------------- |:-------------:| -----:|
| ReactJs | Redux(Thunk) | Firebase |


## Features

* Latest news from newsapi.

* Latest news from a particular source.

* Latest news from a particular category.

* Latest news related to your search.

* Flash messages and sweetalert.

* Firebase auth service

* User can add and remove news card as bookmark.

* User can share news link on single click. 


## ScreenShots


