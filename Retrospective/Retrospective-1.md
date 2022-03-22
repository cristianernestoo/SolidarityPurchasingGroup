TEMPLATE FOR RETROSPECTIVE (Team 05)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs done: 6/6
- Total points committed vs done: 29/29
- Nr of hours planned vs spent (as a team): 94h / 95h30m  


**Remember**  a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed


### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |    8    |    -   |     31h    |      24h     |
|  1     |    7    |    7   |     19h    |      21h     |   
|  2     |    3    |    3   |      9h    |    8h30m     | 
|  3     |    2    |    5   |     10h    |    14h5m     |
|  4     |    4    |    3   |      7h    |    8h50m     | 
|  5     |    4    |    5   |     10h    |    10h30m    |
|  6     |    5    |    5   |      8h    |    8h35m     | 



- Hours per task (average, standard deviation) 
    average = 95h30m / 33 = 2h53m  
    standard deviation = 356.16m
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table = 94h / 95h30m = 0,83

  
## QUALITY MEASURES 

- Unit Testing
  - Total hours estimated: 14h
  - Total hours spent: 17h20m
  - Nr of automated unit test cases: 45
  - Coverage: 44.4% 
- E2E testing
  - Total hours estimated: 0h
  - Total hours spent: 0h
- Code review 
  - Total hours estimated: 3h
  - Total hours spent: 3h
- Technical Debt management
  - Total hours estimated 
  - Total hours spent
  - Hours estimated for remediation by SonarQube
  - Hours estimated for remediation by SonarQube only for the selected and planned issues 
  - Hours spent on remediation 
  - debt ratio (as reported by SonarQube under "Measures-Maintainability")
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability )
  


## ASSESSMENT

- What caused your errors in estimation (if any)? This time we better estimate the total hours. There were some overestimations in some tasks that did not require that much time, but they balanced some other tasks that required more time than expected. 

- What lessons did you learn (both positive and negative) in this sprint? We learnt we must improve how to test our application.  

- Which improvement goals set in the previous retrospective were you able to achieve? We better analyze stories and better estimate the total hours of work because this time we took in account some correlated tasks that were necessary for the stories to be completed. 
  
- Which ones you were not able to achieve? Why? A total testing of the application (low coverage).

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.) Try to keep a costant overview of the development of the application, never forget about the techinical debt. We wiil start from the issues highlighted by SonarCloud 

- One thing you are proud of as a Team! ZERO DEFECTS FOUNDED BY THE OTHER TEAM.
