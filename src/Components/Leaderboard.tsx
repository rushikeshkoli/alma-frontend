import { Container, TableBody, TableCell, TableContainer, TableHead, TableRow, Table } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface HeadCell {
  id: number,
  disablePadding: boolean;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 1, numeric: false, disablePadding: true, label: "Name" },
  { id: 2, numeric: false, disablePadding: true, label: "Maths" },
  { id: 3, numeric: false, disablePadding: true, label: "Physics" },
  { id: 4, numeric: false, disablePadding: true, label: "Chemistry" },
  { id: 5, numeric: true, disablePadding: false, label: "Total" },
  { id: 6, numeric: true, disablePadding: false, label: "Percentage" }
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

const Leaderboard = () => {
  const [students, setStudents] = useState<any>([])

  useEffect(() => {
    async function fetchdata() {
      const res = await axios.get('http://localhost:8000/api/leaderboard/')
      console.log(res)
      setStudents(res.data.scoreboard)
    }
    fetchdata()
  }, [])

  return (
    <div>
      <Container>
        <Link to="/">Home</Link>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student: any) => (
                <TableRow>
                  <TableCell>
                    {student.name}
                  </TableCell>
                  <TableCell>
                    {student.maths}
                  </TableCell>
                  <TableCell>
                    {student.physics}
                  </TableCell>
                  <TableCell>
                    {student.chemistry}
                  </TableCell>
                  <TableCell>
                    {student.total}
                  </TableCell>
                  <TableCell>
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