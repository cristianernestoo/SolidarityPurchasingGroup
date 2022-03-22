# SolidarityPurchasingGroup

Repository of the group P05 for the project "Solidarity Purchasing Group" of the course Software Engineering 2 2021

# Team 
1. Catalano Sofia
2. Ernesto Cristian
3. Policastro Francesco
4. Vejar Pablo
5. Di Mauro Andrea
6. Inglese Lucio Rocco

# Testing

1. Install Maven
2. Go with a terminal to your project path (the one with this README file)
3. Setup SONAR_TOKEN env variable with:

Linux/Mac
```
export SONAR_TOKEN=value
```
Windows
```
setx SONAR_TOKEN value
```

4. Execute the following command:
```
mvn verify org.sonarsource.scanner.maven:sonar-maven-plugin:sonar -Dsonar.projectKey=sofia-catalano_SolidarityPurchasingGroup
```

# SonarCloud statistics

Upload code statistics on Sonar consists of 2 main processes:

### 1) Execute Jest tests
A node packet called ```jest-sonar-reporter``` should already be installed in your repo. If no execute
``` npm install ```. <br><br>```jest-sonar-reporter``` allow to execute Jest tests and create as output statistics file which Sonar can read

Run the following command inside client folder:
```
CI=true npm test -- --coverage --testResultsProcessor=jest-sonar-reporter
```

### 2) Upload results on SonarCloud

1. Install Sonar Scanner from the following [link](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/)

2. Get your SONAR_TOKEN (go to SPG sonar site > Administration > Analysis Method > Manual > Maven)

3. Set the SONAR_TOKEN env variable on your system as explained in Testing section

4. Execute ```sonar-scanner``` inside client folder (sonar properties file should be present there)

```
NOTE: coverage and .scannerwork folders created by jest and sonar-scanner are not synchronized as they are added to the .gitignore
```

# Docker image

To get docker image of our project you can type the following command:

```
sudo docker pull francescoplc/solidarity_purchasing_group_p05:final
```

Run with:
```
docker run -it -p 3000:3000 francescoplc/solidarity_purchasing_group_p05:final
```

On your browser go to localhost:3000 page to navigate our app

# Credentials
farmer:
- email: mariamarroni@gmail.com
- password: mariamarroni

shop employee:
- email: mariorossi@gmail.com
- password: mariorossi

client: 
- email: isabellaverdi@gmail.com
- password: isabellaverdi
