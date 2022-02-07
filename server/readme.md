#### Installation

(all from ./server)

`yarn install`


#### Setup

1. `cp .env.sample .env`
1. Update variables to appropriate values in .env

#### Run Dev

`yarn dev_start`

Get `http://localhost:<port>/ping`

Post `http://localhost:<port>/`
with `code` and `address` in body


#### Run Prod

`yarn start`