import { Grid } from "@material-ui/core";
import {Form} from 'react-formio';
import React, { useEffect,useState } from "react";
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

import "../../pages/assets/bootstrap.css";
// import "../../pages/assets/font-awesome.min.css";
// import "../../pages/assets/formio.css";


// styles
// import useStyles from "./styles";
import TableNew from "../tables";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import { SettingsSystemDaydreamTwoTone } from "@material-ui/icons";

const Tenderformview = props => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onFormSumitted = (event) => {
    console.log('----------', event);

  };
  const [itemsList,setitemsList] = useState([]);

  useEffect(() => {
  // Your code here
  // fetch(
  //           "https://jsonplaceholder.typicode.com/users")
  //                       .then((res) => res.json())
  //                       .then((json) => {
  //                           setitemsList(json);
  //                       });
}, [itemsList]);

  return (
    <>
      <PageTitle title="Tender Info" />
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Widget title="Tender Form View" disableWidgetMenu>
           {itemsList.length> 0 ? <TableNew data={itemsList}/> : <p>dddddd</p>}
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
export default Tenderformview;
