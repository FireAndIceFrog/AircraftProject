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

