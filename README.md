# handwriter_webapp
web application for QDA document analysis

dependencies: handwriter, rstudio, mongodb, nodejs/expressjs (npm install in this repo)

usage:

clone & install https://github.com/CSAFE-ISU/handwriter via r-studio

(i'll write a docker or sh file next semester to do this)

  - checkout dev_master for access to plumber.R (master is cran compliant) 
  - cd into handwriter
  - pr <- plumber::plumb("./plumber.R") 
  - pr$run(port = 7091)
  - clone & cd into this repo
  - start mongod
  - nodemon / start the server
  - visit localhost:8000
  
  
if you have any issues let me know
