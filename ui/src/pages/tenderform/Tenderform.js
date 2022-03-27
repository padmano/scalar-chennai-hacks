import React from "react";
import { Grid } from "@material-ui/core";
import {FormBuilder} from 'react-formio';

import "../../pages/assets/bootstrap.css";
// import "../../pages/assets/font-awesome.min.css";
// import "../../pages/assets/formio.css";


// styles
// import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import { SettingsSystemDaydreamTwoTone } from "@material-ui/icons";

const Tenderform = props => {

  const onFormSumitted = (event) => {
    console.log('----------', event);

  };

  return (
    <>
      <PageTitle title="Tender Info" />
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Widget title="Tender Form" disableWidgetMenu>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
export default Tenderform;
