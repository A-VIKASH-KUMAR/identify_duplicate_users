# identify_duplicate_users
## Overview
This project implements an identity service that identifies duplicate users based on their email and phone number. It provides both a local development server and a remote endpoint deployed on Render.com.

## Local Development

### Prerequisites
- Node.js version 18 or higher installed on your machine.

### Setup
1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.

### Running Locally
1. Start the server by running the command:
- npm install
- npm start

## To run locally
2. The server will start running locally on `http://localhost:3001`.

### Sending Requests
To hit the identity service locally, send a POST request with the following JSON body to the `/api/identify` endpoint:

**Request Body**
```json
{
"email": "example@gmail.com",
"phoneNumber": "1234567890"
}
```
# Remote Endpoint on Render.com
- To hit the identity service deployed on Render.com, send a POST request with the same JSON body to the endpoint
- `https://identify-duplicate-users-bs.onrender.com/api/identify`
- You can use some tools like curl or Postman to send HTTP POST request to the remote endpoint.
- Import identity.postman_collection.json file for the endpoint collection 
**Request Body**

```json
{
"email": "example@gmail.com",
"phoneNumber": "1234567890"
}
```
