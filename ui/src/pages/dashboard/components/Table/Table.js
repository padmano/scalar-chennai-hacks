import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip
} from "@material-ui/core";
import useStyles from "../../styles";
import { useHistory } from 'react-router-dom';

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data , click}) {
  const classes = useStyles();
  var keys = data ? Object.keys(data[0]) : [];
  keys.shift(); // delete "id" key

  const history = useHistory();
  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys && keys.length ? keys.map(key => (
            <TableCell key={key}>{key.toUpperCase()}</TableCell>
          )): <TableCell></TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {data && data.length ? data.map((model, index) => (
          <TableRow onClick={() => history.push({ 
            pathname: click,
            state: {tender: model}
           })}>
            {
              keys.map(key => (
                key === 'status' ? <TableCell><Chip label={model[key]} classes={{root: classes[states[model[key].toLowerCase()]]}}/></TableCell> :
                <TableCell>{model[key]}</TableCell>
              ))
            }
          </TableRow>
        )) : ''}
      </TableBody>
    </Table>
  );
}
