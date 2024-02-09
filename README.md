# identify_duplicate_users

ENVIRO
## To run locally
- Open terminal and use node v18 
- Start server using $ npm start
- Server will start on endpoint
- To hit the identity service send a POST request with the following body to http://localhost:3001/api/identify endpoint 
###Request Body

{
 "email":"vikash1@gmail.com",
 "phoneNumber":"456245"
}

## To Run the remote endpoint deployed on render.com
-  To hit the identity service remote url deployed on render.com send a POST request with the following endpoint to https://identify-duplicate-users-bs.onrender.com/api/identify 
###Request Body
{
 "email":"vikash1@gmail.com",
 "phoneNumber":"456245"
}
