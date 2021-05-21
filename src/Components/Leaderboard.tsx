import { Container, TableBody, TableCell, TableContainer, TableHead, TableRow, Table } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

interface HeadCell {
  id: number,
  disablePadding: boolean;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 1, numeric: false, disablePadding: true, label: "Name" },
  { id: 2, numeric: true, disablePadding: false, label: "Total" },
  { id: 3, numeric: true, disablePadding: false, label: "Percentage" }
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
              {data.map((student) => (
                <TableRow>
                  <TableCell>
                    {student.name}
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