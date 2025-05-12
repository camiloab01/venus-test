# Venus - Full-stack Technical Test

## Introduction

This challenge is divided into two parts: one for the backend and one for the frontend. We recommend starting with the backend, where you'll build a simple API that will be consumed by the UI. The goal of this exercise is to showcase your skills and demonstrate how you approach problem-solving.

## Resources

Please use [Docker](https://www.docker.com/) to start the containers required for this technical test.

By running `docker compose up`, Docker will build the containers, seed the database with data and start the dev servers.

Frontend should be located at `http://localhost:5173`
Backend should be located at `http://localhost:8181`

For more details and the expected outcomes, refer to the README files in the backend and frontend folders.

## Exercise

Your goal is to integrate the backend and frontend, using this opportunity to demonstrate your full-stack development skills. To begin, fork this repository to your GitHub account. Once the test is complete, please send the URL of your public repository to maxime@venus.io and gleiser@venus.io.

Good luck!

## SOLUTION ☕️

### BACKEND 🧮

Implemented the API following a 'Modular' architecture.
You will see a 'Market' module that has the service, route, model and controller for this module. The endpoint `/api/v1/markets/tvl` fetches the 'MarketTVL' for all markets. It also accepts a query param as `/api/v1/markets/tvl?chainId=1` that filters by chainId.

I also added tests that validate the API is returning the data correctly.

### FRONTEND 🎨

Implemented the FE following the Figma design provided, all the responsive screens were implemented as well. I used TailwindCSS for styling.
The app on start fetched the API created, and also fetches the `balanceOf` for the smart contract. I'm using Wagmi, Viem, tanstack-query.

### Containers 🐳

I also had to modify the Docker container file for the FE, because the libraries were not being deployed.
