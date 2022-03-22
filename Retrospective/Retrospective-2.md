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
- Total points committed vs done: 31/31
- Nr of hours planned vs spent (as a team): 98h30m / 91h30m

**Remember**  a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed


### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |    6    |    -   |     33h    |     25h      |
|  7     |    6    |    8   |     13h30m |     12h      |   
|  8     |    4    |    2   |     18h    |     21h      | 
|  9     |    5    |    8   |     23h    |     23h30m   |
|  10     |    1    |    5   |     0h     |     0h       | 
|  11     |    1    |    3   |     0h     |     0h       |
|  12     |    4    |    5   |     11h    |     10h      | 



- Hours per task (average, standard deviation) 
    average = 91h30m / 31 =  2h57m
    standard deviation = 367,8m
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table = 98h30m / 91h30m = 1,07

  
## QUALITY MEASURES 

- Unit Testing
  - Total hours estimated: 31h
  - Total hours spent: 29h30m
  - Nr of automated unit test cases: 65
  - Coverage: 50.3% 
- E2E testing
  - Total hours estimated: 12h
  - Total hours spent: 9h
- Code review 
  - Total hours estimated: 3h
  - Total hours spent: 3h
- Technical Debt management
  - Total hours estimated 6h
  - Total hours spent 5h
  - Hours estimated for remediation by SonarQube 30m
  - Hours estimated for remediation by SonarQube only for the selected and planned issues 1m
  - Hours spent on remediation 1m
  - debt ratio (as reported by SonarQube under "Measures-Maintainability") 0.2%
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability )
    - reliability: A
    - security: A
    - security review: A
    - maintainability: A
  


## ASSESSMENT

- What caused your errors in estimation (if any)? This time we overestimated some horizontal tasks. We were wrong dividing them equally beacuse some team members did not have to do some tasks related to, for istance, e2e testing or technical debt. 

- What lessons did you learn (both positive and negative) in this sprint? We learnt we must improve how to test our application.

- Which improvement goals set in the previous retrospective were you able to achieve? Reduce the number of committed stories and better organize the testing. 
  
- Which ones you were not able to achieve? Why? Improve the coverage: achieve 80%.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.) Try to keep a costant overview of the development of the application, never forget about the techinical debt. We wiil start from the issues highlighted by SonarCloud. 

- One thing you are proud of as a Team! Zero bugs by SonarCloud. 