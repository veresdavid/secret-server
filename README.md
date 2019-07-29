# Secret Server API
A small REST API that you can use to store and retreive your secrets. I made my implementation based on the task created by [ngabesz-wse](https://github.com/ngabesz-wse) . You can view the full task specification in the following GitHub repository: [secret-server-task](https://github.com/ngabesz-wse/secret-server-task) .

## Tech Stack
I used the following technologies to implement the server:
* NodeJS
* TypeScript
* Express
* MongoDB (and MongoDB Atlas)
* Heroku

## Live demo
I deployed the server to Heroku cloud. You can check it out in the following URL: [https://secret-api-vd.herokuapp.com/](https://secret-api-vd.herokuapp.com/) .

## Endpoints
The base path to the REST API is `/v1` . Under this, theres a subpath for `/secret` , which you can use to save and retreive your secrets. There are currently two main endpoints in the app (under `/secret`):
* `POST: /` : to save a new secret
* `GET: /<hash>` : to retreive your previously saved secret with the corresponding hash value, given as a path paramater

For more information about the API, check out this Swagger YAML file: [swagger.yaml](https://github.com/ngabesz-wse/secret-server-task/blob/master/swagger.yaml) .