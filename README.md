# Project 3 - Good News, Everyone!
## https://shrouded-cove-05719.herokuapp.com/

## Technologies Used
### Front-End
Create-react-app was used to generate our staring code, we then took the reigns with React, Materialize's CSS Framework, Axios, and eventually Google Maps.

### Back-End
Express, Node, bcrypt, express-sessions, CORS, dotenv, and the MVC Design pattern were used server side with Mongo/Mongoose and MongoDB Atlas Cloud DB as data storage. Express, Node, bcrypt, express-sessions, CORS, Mongoose, Atlas, and dotenv were used to implement user creation and authorization, while Mongoose and Atlas managed data hanlding and delivery. A custom Express API was implemented using various controllers to deliver data based on routes. 

### Deployment
Back-End: Cloud DB hosted in MongoDB Atlas, Express server hosted on Heroku
Front-End: React App hosted on Heroku

## Approach
We worked together pretty much the entire time, starting with wireframing and following a mobile-first strategy. We utilized agile development methodologies such as daily stand-ups and work sprints. We started with basic CRUD server functionality and a simple card structure on the front end before building more complex functionality. We focused on content and functionality creation over styling for the majority of the project time, and spent our final day tying up loose ends and polishing layouts and styling across the app.

## Unsolved Problems
Sessions authorization was causing some strange issues on final implementation, so we opted to not load any data until the session was created, and to remove the data upon session destruction, effectively handling authorization without checking on each request. We recognize this is sub-optimal, but it's what worked in the time we had.

We had to severely hack React to implement Google Maps without using TypeScript. It would be nice to come back once we have the necessary skills and properly implement, but again, it's what worked with the time we had.

## User Stories
I want to see where other Futurama fans are in the world!

I can't remember Leela's first name!

I want a short description of every episode of Futurama!

## Other Notes and Future Improvements
Sessions and Google Maps
We had an idea of implementing a global chat with socket.io, but did not have time to even begin serious research with the Google Maps fiasco
