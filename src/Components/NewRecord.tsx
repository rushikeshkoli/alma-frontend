import React, { FormEvent, useState, ChangeEvent } from 'react';
import { Container, Input, TextField, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Link } from 'react-router-dom'
import axios from "axios";
// - Following inputs should be taken from the frontend:
// - Roll No
// - Name
// - Marks in Maths (out of 100)
// - Marks in Physics (out of 100)
// - Marks in Chemistry (out of 100)
// - Total (Automatically calculated)
// - Percentage (Automatically calculated)
// - Extra points for basic validation on the input fields

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }),
);

const NewRecord = () => {
  const classes = useStyles();

  const [rollNo, setRollNo] = useState<number>();
  const [name, setName] = useState<string>();
  const [total, setTotal] = useState<number>();
  const [percentage, setPercentage] = useState<number>();
  const [mathsScore, setMathsScore] = useState('' as string);
  const [physicsScore, setPhysicsScore] = useState('' as string);
  const [chemScore, setChemScore] = useState('' as string);
  const [errorField, setErrorFeild] = useState<string>('')


  const sendData = (e: FormEvent) => {
    e.preventDefault();
    console.log("submitted");
    axios.post(`${process.env.REMOTE_HOST}/api/result/`, {
      'roll_no': rollNo,
      'name': name,
      'maths': mathsScore,
      'physics': physicsScore,
      'chemistry': chemScore
    })
    let calcTotal = parseInt(mathsScore) + parseInt(physicsScore) + parseInt(chemScore);
    let calcPercen = calcTotal / 300 * 100
    setTotal(calcTotal)
    setPercentage(calcPercen)
  }

  const handleScoreChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, sub: any) => {
    let score = e.target.value;
    // if (!score) {
    //   return
    // }
    const int_score = parseInt(score)
    if (int_score < 0 || int_score > 100) {
      setErrorFeild(sub)
    } else {
      if (errorField === sub) {
        setErrorFeild('')
      }
    }
    // if (score)
    if (sub === 'maths') {
      setMathsScore(score)
    } else if (sub === 'physics') {
      setPhysicsScore(score)
    } else {
      setChemScore(score)
    }
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setName(e.target.value)
    }
  }

  const handleRollNoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setRollNo(parseInt(e.target.value))
    }
  }

  return (
    <div>
      <Container>
        <Link to="/">Home</Link>
        <form className={classes.root} onSubmit={sendData}>
          <TextField label="Roll Number" onChange={handleRollNoChange} />
          <TextField label="Name" onChange={handleNameChange} />
          <hr style={{ marginTop: '2rem' }} />
          <h2>Scores</h2>
          <TextField error={errorField === 'maths'} label="Maths" value={mathsScore} onChange={(val) => handleScoreChange(val, "maths")} />
          <TextField error={errorField === 'physics'} label="Physics" value={physicsScore} onChange={(val) => handleScoreChange(val, "physics")} />
          <TextField error={errorField === 'chem'} label="Chemistry" value={chemScore} onChange={(val) => handleScoreChange(val, "chem")} />
          <Button variant="contained" color="primary" type="submit">Submit</Button>
        </form>
        <div><h3>Total: {total}</h3></div>
        <div><h3>Percentage: {percentage?.toPrecision(4)}%</h3></div>
      </Container>
    </div>
  )
}

export default NewRecord;