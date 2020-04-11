# Vopak
This repository has 2 endpoints only, and doesn't do much except for the fact
that it queries the weather in Covilha, Portugal, and also aggregates the
average temperature in Sfax, Tunisia in June.

## Dependencies
It includes the following:
* `express`: a web framework that handle routes and requests/responses
* `mongoose`: a library to access MongoDB database
* [openweathermap](https://openweathermap/org): a website with weather
information that provides HTTP API endpoints.

## Entrypoints
The endpoints are not the cleanest REST API ever, but they are as follows:

| Method | Endpoints             | Description                         |
|--------|-----------------------|-------------------------------------|
| GET    | /currenttempincovilha | Current temperature in Covilha      |
| GET    | /avgtempinsfax        | Average temperature in Sfax in June |

The first one retrieves the temperature (and other info that are not shown)
from the weather API provided over HTTP, saves the result with the current
timestamp (sever timestamp, not the browser) in the MongoDB database, and
return the result back to the client.

And the second endpoint aggregates the average temperature from the MongoDB
database. So this requires that some data should be populated prior to request.
One may use the data provided in the file [sample.json](./sample.json).

It is also possible to retrieve the monthly weather info from the
[HTTP API](CHANGE-ME), but that requires paid subscription.


## Configuration
There's a [.env](./.env) file which is responsible for environmental variables
used throughout the application, 2 of which should be initialized before
starting the server:
* API_KEY_VALUE
* MONGODB_URI

These 2 are self-explanatory, but the first one can be fetched from
[here](https://openweathermap.org/appid). You can use
[MongoDB Atlas](https://cloud.mongodb.com/) or even a local MongoDB Database
for the second.

## Initialize
A simple `npm install` would install all the required dependencies.

## Deploy
To start the application, there are 2 options:

### Development
```bash
npm run dev
```

### Production
```bash
npm run prod
```

A simple application like this is not gonna be deployed as `production` but
it's nice to avoid hanging the terminal.
