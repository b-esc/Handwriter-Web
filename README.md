# handwriter-web
web application for QDA document analysis, allows uploads & minor image edits, displaying results from Nick Berry's handwriter R package

R + Javascript

dependencies: handwriter, rstudio, mongodb, nodejs/expressjs (npm install in this repo)

handwriter: https://github.com/CSAFE-ISU/handwriter

usage:

clone & install https://github.com/CSAFE-ISU/handwriter via r-studio

  - checkout dev_master for access to plumber.R (master is cran compliant) 
  - cd into handwriter
  - pr <- plumber::plumb("./plumber.R") 
  - pr$run(port = 7091)
  - clone & cd into this repo
  - start mongod
  - nodemon / start the server
  - visit localhost:8000
  
contact if questions
