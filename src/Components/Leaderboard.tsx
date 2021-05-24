import { Container, TableBody, TableCell, Button, TableContainer, TableHead, TableRow, Table, TableSortLabel, ButtonBase, Box, Icon, Input, OutlinedInput } from "@material-ui/core";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


interface HeadCell {
  id: string,
  disablePadding: boolean;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'name', numeric: false, disablePadding: true, label: "Name" },
  { id: 'maths', numeric: false, disablePadding: true, label: "Maths" },
  { id: 'physics', numeric: false, disablePadding: true, label: "Physics" },
  { id: 'chemistry', numeric: false, disablePadding: true, label: "Chemistry" },
  { id: 'total', numeric: true, disablePadding: true, label: "Total" },
  { id: 'percentage', numeric: true, disablePadding: true, label: "Percentage" }
];

const data = [
  {
    name: "a",
    total: 10,
    percentage: 80
  },
  {
    name: "b",
    total: 50,
    percentage: 30
  },
  {
    name: "c",
    total: 70,
    percentage: 15
  },
  {
    name: "d",
    total: 40,
    percentage: 12
  }
];

function descendingComparator(a: any, b: any, orderBy: any) {
  console.log(a[orderBy])
  console.log(b[orderBy])
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array: any, order: any, orderBy: any) {
  const stabilizedThis = array.map((el: any, index: any) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    console.log(a[0])
    let temp
    if (order === 'desc') {
      temp = descendingComparator(a[0], b[0], orderBy)
    } else {
      temp = -descendingComparator(a[0], b[0], orderBy)
    }
    if (temp !== 0) return temp;
    return a[1] - b[1];
  });
  console.log(stabilizedThis)
  return stabilizedThis.map((el: any) => el[0]);
}

// {stableSort(rows, getComparator(order, orderBy))
//   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//   .map((row, index) => {
//     const isItemSelected = isSelected(row.name);
//     const labelId = `enhanced-table-checkbox-${index}`;

//     return (
//       <TableRow
//         key={row.name}
//       >
//         <TableCell
//           component="th"
//           id={labelId}
//           scope="row"
//           padding="none"
//         >
//           {row.name}
//         </TableCell>
//         <TableCell align="right">{row.calories}</TableCell>
//         <TableCell align="right">{row.fat}</TableCell>
//         <TableCell align="right">{row.carbs}</TableCell>
//         <TableCell align="right">{row.protein}</TableCell>
//       </TableRow>
//     );
//   })}

const Leaderboard = () => {
  const [students, setStudents] = useState<any>([])
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState<string>('percentage');
  const [searchVal, setSearchVal] = useState<string>('')

  const handleSearchButtonClick = () => {
    const data: any = []
    localStorage.setItem('students', JSON.stringify(students))
    students.map((student: any) => {
      if (student.name.search(searchVal) !== -1) {
        console.log(student)
        data.push(student)
      }
    })
    console.log(data)
    setStudents(data)
  }

  const handleSearchValChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value)
    if (!e.target.value) {
      // fetchdata()
      const temp = localStorage.getItem('students')
      if (temp) {
        setStudents(JSON.parse(temp))
        console.log(JSON.parse(temp))
      }
    }
  }

  async function fetchdata() {
    const res = await axios.get(`${process.env.REMOTE_HOST}/api/leaderboard/`)
    console.log(res.data.scoreboard)
    setStudents(res.data.scoreboard)
  }

  const handleSortClick = (sortBy: any) => {
    if (orderBy === sortBy) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    } else {
      setOrder('asc')
      setOrderBy(sortBy)
    }
  }

  useEffect(() => {
    const data = stableSort(students, order, orderBy)
    console.log(data)
    setStudents(data)
  }, [order, orderBy])

  useEffect(() => {
    fetchdata()
  }, [])

  return (
    <div>
      <Container>
        <Link to="/">Home</Link>
        <div>
          <OutlinedInput placeholder="Search" onChange={handleSearchValChange} />
          <Button style={{ marginLeft: '1rem' }} color='primary' variant="outlined" onClick={handleSearchButtonClick}>Search</Button>
          {/* <OutlinedInput id="outlined-basic" placeholder="Search Branch" onChange={handleBranchChange} value={branchName} /> */}
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                  >
                    <ButtonBase style={{ width: '100%', borderRight: '2px solid #eee' }} onClick={() => handleSortClick(headCell.id)}>
                      {headCell.label}
                      {orderBy === headCell.id && (order === 'asc' ? <ArrowUpwardIcon fontSize='small' /> : <ArrowDownwardIcon fontSize='small' />)}

                    </ButtonBase>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student: any) => (
                <TableRow key={student.roll_no}>
                  <TableCell>
                    {student.name}
                  </TableCell>
                  <TableCell align='right'>
                    {student.maths}
                  </TableCell>
                  <TableCell align='right'>
                    {student.physics}
                  </TableCell>
                  <TableCell align='right'>
                    {student.chemistry}
                  </TableCell>
                  <TableCell align='right'>
                    {student.total}
                  </TableCell>
                  <TableCell align='right'>
                    {student.percentage}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Container>
    </div>
  );
};

export default Leaderboard;