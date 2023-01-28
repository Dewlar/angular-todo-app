# Angular To-Do app            
 
### Quick start
#### clone the repo
Go to your developer folder
Clone this project repository to your local machine

#### change into the repo directory
`cd tech-test`

#### install
`npm install`

#### serve
`npm run server`                   
`npm run start`

#### Running unit tests
`npm run test`

##### Other
`used node 14.21.2`

It's have a mock local server.              

GET  from http://localhost:3000/tasks ← list all todo items                 
GET /1 ← view detail of a specific todo item, where id = 1                  
POST ← creates a new todo item (as long as it has an available id)                 
PATCH /1 ← edits the todo item with id = 1             
DELETE /1 ← deletes the todo item, with id = 1   
