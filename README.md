# Explantation
This repository includes two .Net 6 projects. 

One project is a simple api gateway which handles the authorisation and authentication.

The second project is a simple authentication service, which includes the following end points:
1. Authenticate => this endpoint will return a JWT if the correct login credentials are given
2. Get permission-route1 => If you have the role claim 1 you will recieve a response with => You have permission for route 1
3. Get permission-route2 => If you have the role claim 2 you will recieve a response with => You have permission for route 2
4. Get permission-route3 => If you have the role claim 3 you will recieve a response with => You have permission for route 3

# Read the code in VSCode online
[VSCode](https://github1s.com/default-kaas/Simple-api-gateway-structure/tree/main)

# Installation
## .Net 6 SDK
[SDK location](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
## Visual studio 2022
[Visual studio 2022](https://visualstudio.microsoft.com/downloads/)
## Postman
[Postman](https://www.postman.com/downloads/)

# Setup
1. Import the postman JSON API end-points into postman
2. Import the postman JSON ENV values into postman
3. Run both applications
4. Send a get request to Permission route1 => should receive a 401
5. Send a  post request to Authenticate => should receive a 200
7. Send a get request to Permission route1 => should receive a 200
8. Send a get request to Permission route3 => should receive a 403
