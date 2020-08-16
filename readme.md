## Project Idea
My project Idea is to create a web application that allows a user to setup all the nessary documention needed to conduct a drone operation.In a drone operation,the drone operator is required to have a field Operations manual.This manual must contain the following.

- Copy of  RPA Pilot Licence
- Copy of the ROC and Opertations Specification
- Certificate of registration for each RPA in operation
- Copy of RLA(RPAS Letter of approval)
- Copy of user manual for the RPA and the remote pilot station
- Safety Briefing
- Flight Authorisation Sheet
- Flight Folio
- On site assessment
- On site Risk Assessment
- Pre site Assessment

My web application will provide the user the ability to search for a location and will then gather all the nessary information ,time, weather, emergency contact numbers.As well as allow the user to upload  documentation and download documentation.

During a operation the web application will allow the user to go through a preflight checklist of there own creation as well as post flight check.


# Functional Requirements
* Function to allow authorised login of user.
* Function to allow login using facebook and twitter.
* Function to allow user to signup.
* Function to create and store new users.
* Function to view all operations created by a user.
* Function to Edit a operation.
* Function to view details of a opertation.
* Function to delete a operation.
* Function to upload copies of the following documentation(pdf format only):
  * Copy of  RPA Pilot Licence.
  * Copy of the ROC and Opertations Specification.
  * Copy of Certificate of registration for each RPA in operation.
  * Copy of RLA(RPAS Letter of approval).
  * Copy of user manual for the RPA and the remote pilot station.
  * Safety Briefing.
  * Flight Authorisation Sheet.
  * Flight Folio.
  * On site assessment.
  * On site Risk Assessment.
  * Pre site Assessment.

* Function to download all uploaded documentation.
* Function to delete selected uploaded documentation.
* Function to limit amount of files a user may upload.
* Funciton to limit the size of file a user may upload.
* Function to generate a weather report base on location.
* Function to gather emgergency numbers of closest firestation,police station and hospital.
* Function to gather all data related to user from database.
* Function to create a checklist.
* Function to add items to checklist.
* Function to delete items from checlist.
* Funciton to delete checklist.
* Function for user to delete their account and all data associated with it.

# Non functional Requirements
* Express server must recover from crash.
* Web application must be responive .
* UI must be simple and intuitive .
* UI must be conistant. 
* User must know at all times where they are on the site.
* Application will be hosted on heroku.
* Applicaiton will be build using the MERN stack with additional libriaries.
* User information must be secure.
* User authorisation must be secure.


#  RPAS Flight Planning

MERN app that allows user to manage events and documentation related to commerial drone operation or for private individuals.

The app was deployed on heroku and is linked to my github for automatic builds
##### Live verion https://rpasflighplanner.herokuapp.com/
## Getting Started

### Installing Packages

Run `npm install` in the root of this folder. Once finished, cd into the `client` folder and run `npm install` again to install the client dependencies.

### Running App

cd back to the root of this folder and run `npm run dev` to run both `backend` and `client` at the same time with the package `concurrently`.

You can run them seperately by following these steps:

- In the root of the project folder run:
```
    npm start
```
- cd to the client folder and run:
```
    npm start
```

(Please note that you should have two terminals open if you are running them seperately)

### Prerequisite
>#### SERVER:

Please make sure you have a `config.env` file in the root folder to store the following enviromental variables:

```
PORT=8080
DATABASE=
JWT_SECRET=
WEATHER_API_KEY=
ARCGIS_CLIENT_ID=
ARCGIS_CLIENT_SECRET=


```

* `PORT` represents the PORT on which your server is listening on
* `DATABASE` represents the mongodb local or atlas URL, simple paste the string after the equal sign (=)
* `JWT_SECRET` represents our 'secret' for JWT, this can be filled with anything. Simply smash your hand on the keyboard to fill out some random characthers.
* `WEATHER_API_KEY` represents openweatherAPI key which you can register and get from https://openweathermap.org/api
* `ARCGIS_CLIENT_ID` represents the client ID of the app register on arcgis ,simply create a developer account ttps://www.arcgis.com/index.html# and create a geocoding app ,you can then get both the client id and client secret
* `ARCGIS_CLIENT_SECRET` details linked to the above explantion

>#### CLIENT:
Please make sure you have a `.env` file in the client folder to store the following enviromental variables:
```
REACT_APP_FACEBOOK_APP_ID=(Register and create app to get api key here https://developers.facebook.com/)
REACT_APP_WEATHER_KEY=(same as WEATHER_API_KEY)

```
* `REACT_APP_FACEBOOK_APP_ID` represents the facebook login app ID create a facebook developer account ,create an app and add the express server ip to appoved domain list  .User the link here to register https://developers.facebook.com/


* `REACT_APP_WEATHER_KEY` same at the WEATHER_API_KEY

>Example:

### Authorized JavaScript origins
```
http://localhost:3000
```

### Authorized redirect URIs
```
http://localhost:3000
```




>### Usage
```
1.Register
```
On the home page click on the register button.This will direct to you a register page.Once on the register page enter your details and hit submit.
When a notification will popup and tell you where to go.


```
1.Login
```

Click on Login from the home page.This will take you to the login section.You an either sign in with your details you used to create and account or sign in with facebook

```
Dashboard
```
Once you are signed in ,You will be on the home page. Here you can do the following:
* Access your account details.
* Sign out.
* Check weather at your location.
* View Event cards.
* Delete Event cards.
* Click on an event card to edit it.

```
Manage Field OPS
```
A FieldOPS is all the documentation a user may need when planning a flight,once you click on manage field ops from main and it is open you can do the following:
* Select a fields ops to edit
* Delete a selected field OPS
* Update and preview a pdf in a Document catergory
* Load and view stored pdfs in a selected Document category 
* Upload a pdf from a selected Document catergory

```
Create Event
```
Allows a user to create a event card that is displayed on the main dashboard.The following details are captured in order to create an event card
* Location of the flight
* Search the weather at the flight location
* Select a Field OPs to use for the flight
* Enter a short description of the type of flight 
* Enter a  description of the type of flight 
* Select a data and time of the flight
* Enter verious emergency numbers 
* Create a Total of 3 checklist 

```
Create Field OPs 
```
Allows user to create a Field OPS with a name of their choosing

```
Account
```
A user can view there current username and email address and delete their account.
When user deletes their account all details linked to them eg. profile,event cards and uploaded documents are deleted from the database.

```
Admin
```
In order to access the admin features you must have registered and logged in with an account.
Once this is complete you must change the role status of the account you want to have access to Admin.
Simpily open mongodb compass ,connect to your database, view user collections,find the user document of the account you want to change and change role from `user` to `admin`.
Once this is complete login in again.You should see a admin button on the far left.



## Application & Testing

The following routes are defined on the server:

- `/api/signup`
- `/api/signin`
- `/api/facebook-loggin`
- `/api/admin/accounts`
- `/api/admin/update`
- `/api/documents/view`
- `/api/documents/upload`
- `/api/documents/update`
- `/api/documents/delete`
- `/api/documents/deleteFieldOPS`
- `/api/documents/fieldOPSDOCS`
- `/api/events/create`
- `/api/events/update`
- `/api/events/view`
- `/api/events/delete`
- `/api/user/update_fieldOPS`
- `/api/user/latest_data`
- `/api/user/location`
- `/api/user/deleteAccount`

In postman, you can do the following tests:

>1: Register:

You would first need to register as a user

##### POST http://localhost:8080/api/signup
##### Content-Type: application/json
```
{
    "name": "Liam",
    "email": "liamkeatonhendricks@gmail.com",
    "password": "test123"
    "password2": "test123"
    
}   
```

>2: Login:

After registering, you can now succesfully login.

In the response, you should get a token. Copy that token, we will use it for the next step!

##### POST http://localhost:8080/api/signin
##### Content-Type: application/json

```
{
    "email": "liamkeatonhendricks@gmail.com",
    "password": "test123"
}
```


After copying the token gotten from the previous step. In postman, go to the authorization tab, under "Type", select "Bearer Token".
You should then see a input field on the right section where it ask you to paste a token. Paste the copied token here.

>2: Admin View User Amounts:

After registering, you can now succesfully login.

In the response, you should get a token. Copy that token, we will use it for the next step!

##### GET http://localhost:8080/api/admin/accounts
##### Content-Type: application/json


```
{
 
}
```

you should get an array of user accounts

>3: Admin Update User account:
##### PUT http://localhost:8080/api/admin/update
##### Content-Type: application/json
{
  
  "name" :"Username",
  "email":"users email",
  "password":"passord ",
  "id":"database id of the user", 
  "role":"user"
}

response should be a message saying the user has been updated

>4: Admin Update User account:
##### PUT http://localhost:8080/api/admin/update
##### Content-Type: application/json
{
  
  "name" :"Username",
  "email":"users email",
  "password":"passord ",
  "id":"database id of the user", 
  "role":"user"
}


>5: updateFieldOps
##### PUT http://localhost:8080/api//user/update_fieldOPS
##### Content-Type: application/json
{
  
  
}
>6: Latest user data
##### PUT http://localhost:8080/api/user/latest_data
##### Content-Type: application/json
{
  
  
}
>7: Latest user data
##### PUT http://localhost:8080/api/user/latest_data
##### Content-Type: application/json
{
  
  
}




 



