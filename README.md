First of all, I would like to thank you for giving me this coding challenge. I have deployed my solution on to a heroku cloud. Please find the demo link here: https://scrapasite.herokuapp.com/ 

You can find my node module named as ```webscrapper```and you can find its source files inside webscrapper folder.

Please follow the below steps to run my solution on your localmachine. 
Step #1: Pre-request must be installed on your local system (Node js).
Step #2: ```npm install -g grunt-cli``` (In case you haven't installed grunt task runner on your system).
Step #3: ```npm install``` this read the package.json file and download required libs files. 
Step #4: webscrapper module, You need to manually link my webscrapper module since, it isn't published in NPM registry org. So, please run this command ```npm link webscrapper``` as this will install locally. 
Step #5: Starting your local development run ```node server.js``` from your terminal. 
Step #6: You can monitor your file changes which is inside ```client/src/**/*``` 
         by running ```grunt watch```
Step #7: ```grunt``` command will automatically optimize JS and CSS files and move it to ```public``` folder.
