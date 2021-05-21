import React from 'react';
import {useHistory} from 'react-router-dom'
import { Button, Container } from '@material-ui/core';

const Homepage = () => {
  let history = useHistory();
  return (
    <div>
      <Container style={{border: "2px solid red", textAlign:"center", margin: "10px auto"}}>
        <Button onClick={() => history.push('/newrecord')}>Enter Marks</Button>
        <Button onClick={() => history.push('/leaderboard')}>View Leaderboard</Button>
      </Container>
    </div>
    )
}

export default Homepage