# Updates to MVP Solo Project #

## Clean-up ##

DONE - Remove any extraneous code
- Break out backend into a structure with routers, controllers, models
- Use Q library for promises rather than relying on callbacks
- Modify db connection to connect to either remote db or local db
- Break out frontend into a structure with app, controllers, utility methods


## Fixes ##

- Do not send updated vote count from client
- Have backend receive request to update vote count and call methods to update it
DONE - Have markers appear each time that the page is refreshed


## Updates ##

- Sort the list of places by vote count

## Tests ##

- Write backend tests using mocha, chai, and supertest


## Deployment ##

- Integrate with a CI program
- Deploy using Heroku