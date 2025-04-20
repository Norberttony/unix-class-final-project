
# Set up
Setting up the project requires using docker compose. First, cd to the project directory, and then execute this command:

`docker compose up --build`

This will build the required services and immediately start them.

It is possible to scale up the number of web application containers using the --scale flag like this:

`docker compose up --build --scale webapp=3`

Where '3' can be replaced with a number of preferred web applications. The nginx container load balance the web servers.
