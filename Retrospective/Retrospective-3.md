TEMPLATE FOR RETROSPECTIVE (Team 05)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs done: 6/5
- Total points committed vs done: 34/21
- Nr of hours planned vs spent (as a team): 97h30m / 95h30m 
**Remember**  a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed


### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |    6    |    -   |     30h    |     28h30m   |
|  13    |    0    |    5   |      0h    |     0h       |
|  14    |    4    |    5   |     11h    |     9h       |
|  15    |    2    |    5   |     8h     |     8h       |
|  16    |    4    |    3   |     10h    |     11h      |    
|  17    |    7    |    13  |     27h30m |     27h      | 
|  18    |    4    |    3   |     11h    |     9h       | 



- Hours per task (average, standard deviation) 
    average = 95h30m / 27 =  3h32m
    standard deviation = 585,21m 
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table = 97h30m / 95h30m = 1,021

  
## QUALITY MEASURES 

- Unit Testing
  - Total hours estimated: 29h
  - Total hours spent: 25h
  - Nr of automated unit test cases: 145
  - Coverage: 53,2%
- E2E testing
  - Total hours estimated: 9h
  - Total hours spent: 7h30m
- Code review 
  - Total hours estimated: 3h
  - Total hours spent: 3h
- Technical Debt management
  - Total hours estimated 14h
  - Total hours spent 13h
  - Hours estimated for remediation by SonarQube 5m
  - Hours estimated for remediation by SonarQube only for the selected and planned issues 5m
  - Hours spent on remediation 5m
  - debt ratio (as reported by SonarQube under "Measures-Maintainability") 0.2%
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability )
    - reliability: C
    - security: A
    - security review: A
    - maintainability: A
  


## ASSESSMENT

- What caused your errors in estimation (if any)? This time we had no major issues estimating tasks, but the only problem was related to the story 14, that although we estimated 13 points it requires a lot more time.

- What lessons did you learn (both positive and negative) in this sprint? We need to improve our actual virtual clock.

- Which improvement goals set in the previous retrospective were you able to achieve? We increased the number of testing and reduced the number of bugs given by sonar. 
  
- Which ones you were not able to achieve? Why? Improve the coverage: achieve 80%.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.) 
We need to improve our implementation of the virtual clock.

- One thing you are proud of as a Team! We are proud of the team work and collaboration with ourselves.