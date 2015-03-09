MVP Solo Project - Requirements

1. Have a server that can handle HTTP requests from the client for:
 - Account Sign-Up
 - Account Login
 - Switching Between Pages
 - Retrieve User's Friends
 - Retrieve List of Places for User's Friends
 - Add Places to User's Favorite Places List
 - Add Friends to User's Friends List

2. Have a client that can make requests to the server and to the Google Places API

3. Make requests to the Google Places API for place data
 - Text Search request
   - location: google.maps.LatLng(lat, lng)
   - radius: string
   - query: string (taken from input form)

 - Text Search response
   - returns results and passes along to a callback function
   - results is an array of PlaceResult objects
     - place_id is a unique ID that can be used in a Place Details request to retrieve information about the place

Flow:

- Each time that the sign-up page is loaded:
 - If the user submits a username and password
  - Check whether that account exists or not
  - If not then create account

- Each time that the login page is loaded:
- If the user submits a username and password
 - Check whether that account exists or not
 - If so then redirect to the home page for the user

- Each time that the home page is loaded:
 - Retrieve list of friends for user
 - Retrieve list of places from those friends
 - Display the list of places
 - If the user clicks on a place then send a Google Places request using place_id
 - Display the result on the Google Map

- Each time that the Friends page is loaded:
 - Retrieve list of friends for user
 - Display list of friends
 - If the user submits a new Friend name
   - Check whether the user exists, if so then add to Friends list

- Each time that the Places page is loaded:
 - Retrieve list of places for user
 - Display list of places
 - If the user submits a new Place name
   - Query the Google Places API
   - Display the result on the Google Map
   - Add the place to the Places list
