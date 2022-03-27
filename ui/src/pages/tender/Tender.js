import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";


const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Tables(props) {
  const classes = useStyles();
  const datamock = mock[props.tablename];
  const location  = useLocation();
  let tenderData;
  let title = props.title;

  if (location.state) {
    tenderData = location.state.tender;
    if (tenderData) {
      title += tenderData.project;
    }
  }
  
  return (
    <>
      <PageTitle title={title} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="Tender" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            <Table data={datamock} click={props.click} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
