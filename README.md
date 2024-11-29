# TaskFlow-MVP
git clone repository
run command npm i
create .env file and create PORT=3000 in .env file
command node index.js for running server

ApiList
POST API - localhost:3000/api/v1/tasks -> body: { "title": "phone repair","description": "battery checkup"}
GET API - localhost:3000/api/v1/tasks
PUT API - localhost:3000/api/v1/tasks/:id -> body: { "status": "completed" }
DELETE API - localhost:3000/api/v1/tasks/:id 
FILTER Api - localhost:3000/api/v1/tasks/status/:status 

Any other Apis will give invalidRoute Error
Data stored in db/tasks.json file
