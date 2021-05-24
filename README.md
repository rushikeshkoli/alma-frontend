# React Frontend for the Assignment
Three routes:
```
/
/newrecord
/leaderboard
```
'/leaderboard'
- To search a student enter name in search field and click search. To clear to search just clear the input.
- To sort click on column header that you want to sort.

##To run this project
### `npm install`
### `npm start`

You can also build this project using dockerfile but first you need to build the project using 
### `npm build`

### Current Deployment
- This application is deployed on kubernetes cluster(EKS). 
- Any commit to the repository starts the codepipline.
- The codebuild generates docker image and pushes it to the ECR. New image can be updated using deployment.spec in EKS.
- The service is exposed using load-balancer.

[Backend Repository](https://github.com/rushikeshkoli/alma-assignment)