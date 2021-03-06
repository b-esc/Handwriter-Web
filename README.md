# Handwriter Web

Web application for QDA document analysis
- Allows uploads & minor image edits
- Displays results from Nick Berry's handwriter R package

R + Javascript

## Dependencies
- handwriter: https://github.com/CSAFE-ISU/handwriter
- rstudio, 
- mongodb, 
- nodejs/expressjs (npm install in this repo)

## Usage:

clone & install https://github.com/CSAFE-ISU/handwriter via r-studio

- checkout dev_master for access to plumber.R (master is cran compliant) 
- cd into handwriter
- pr <- plumber::plumb("./plumber.R") 
- pr$run(port = 7091)
- clone & cd into this repo
- start mongod
- nodemon / start the server
- visit localhost:8000
