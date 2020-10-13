This is a readme to initialize / run the assignment.


Run on windows 10 (not tested for apple, should be the same)
dev start:
1.) start cmd.exe @cmd /k "cd backend & nodemon start"  | start cmd.exe @cmd /k "cd frontend & npm start"

Easy way - run these two commands in the root folder (windows console):
1.) start  cmd.exe @cmd /k "cd backend & npm install & exit"  | start cmd.exe @cmd /k "cd frontend & npm install & exit" 
2.) start cmd.exe @cmd /k "cd backend & npm start"  | start cmd.exe @cmd /k "cd frontend & npm start"
3.) relax and enjoy as the react script opens the website for you :)


Hard way:
1.) Using XAMPP put the parent folder into the HTDOCS file, this will expose the php on the xamp server.
2.) Install node
3.) go to the backend folder 
4.) Create a command prompt and make sure the path is pointing to the current folder
5.) Run "npm install" - this will install all dependancies
6.) Run "npm Start" - this will start the server on localhost:3001  - this is the location of the backend server

7.) Navigate to the frontend folder
8.) Create a command prompt and make sure the path is pointing to current folder
9.) Run "npm install" 
10.) run "Npm start"
12.) Connect to server on localhost:3000

PRO TIP: 
The title and home button returns you to the home screen (two wings)

Core Requirements of the Assignment:
A suitable database for storing the relevant information. A startup SQL script is given
that will create two simple tables for describing the aircraft types and the destinations.
You need to decide what additional tables are needed and how they are related. In
particular you will need a table to list the actual scheduled flights according to their
departure dates, together with a means of populating this table.

-This is created in the sql file attached, there are a series of tables relationally linked to each other along with a function which makes new flights over a time period


• A landing page, index.html, that functions as the entry point for your application

-React handles the index.html. I could have made one using npm build but then the marking would have been very hard.
-The landing page is essentially a login page. Feel free to register if you so choose.
-All passwords are stored as encrypted hashes on the server (good luck getting the salt from express js)
-All queries are prepared + excecuted by javascript mysql which stops sql injections automatically


• The ability for a user to “conveniently” browse the database for any desired flights.

Once the user logs in, they can click new flights. Select a start/end start/stop location and time and you will have a list of all flights for the following two weeks 

• A service to allow a user to select a scheduled flight and make a booking. The user
should be provided with a unique booking reference. A booking should not allowed on
scheduled flights that are full up. On making a booking, the user should be presented
with an invoice page summarizing the details of the flight, ie price departure date and
time, arrival time, etc.

-Booking reference is saved on the server and the client has no real access to it (it is inferred via their accounts login)
-Bookings are not allowed on flights which are full, they do not show up on the "new flights" tab.


• The capability for a user to cancel a booking.

-The historic page acts as three features in one. It shows all active flights, including the upcoming booked flights.
This has the price, time, start and stop locations and it provides all flights in a neat and orderly fashion
-The historic upcoming flights also provide functionality to cancel a flight. When a user clicks this the booking is deleted and the seat is empty.
-The Historic past flights are a historic reference to the flights which were booked. This shows past flights.


• Output presented to the user in a neatly formatted manner.

-Hope you enjoy the pictures :)

• Add custom features
 - the historic past flights are an interesting feature. 

Im not very creative so i thought it would be sufficient to show my creativity in the languages I chose. React and Express are used to create the webservice. 
- Express is a rest API acting as a middleware between the sql server and the website
- React and React's Material UI act as the frontend providing functional components to the frontend (its not purely functional though because there are side effects in the way of the provider states used)


