import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";

import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { dataColumn, dataPie, energyConsumption } from "../../Component/data";

import { scalePoint } from "d3-scale";
import {
  Animation,
  EventTracker,
  LineSeries,
  PieSeries,
  ArgumentScale,
} from "@devexpress/dx-react-chart";
import {
  Item,
  ItemList,
  Label,
  Line,
  StyledChart,
  Text,
  classes,
} from "../../Component/Style.js";
import Left from "../../Component/Left";
import Header from "../../Component/Header";

const DashBoard = () => {
  const [show, setShow] = useState(true);

  return (
    <Box sx={{ justifyContent: "center", minHeight: "100%" }}>
      <Stack direction="row">
        {show && <Left />}
        <Box sx={{ width: "100%" }}>
          <Header setShow={setShow} show={show} />
          <Box sx={{ width: "moz-fit-width", paddingLeft: 2, paddingRight: 2 }}>
            <Typography variant="h4" sx={{ paddingTop: 2 }}>
              Bảng điều khiển
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 1, sm: 8, md: 12 }}
              >
                <Grid xs={3}>
                  <ItemList>
                    <Typography>Doanh số</Typography>
                    <Typography variant="h3">1000</Typography>
                  </ItemList>
                </Grid>
                <Grid xs={3}>
                  <ItemList>
                    <Typography>Số lượng đơn hàng</Typography>
                    <Typography variant="h3">1000</Typography>
                  </ItemList>
                </Grid>
                <Grid xs={3}>
                  <ItemList>
                    <Typography>Số lượng đơn nhập</Typography>
                    <Typography variant="h3">1000</Typography>
                  </ItemList>
                </Grid>
                <Grid xs={3}>
                  <ItemList>
                    <Typography>Số lượng phản hồi</Typography>
                    <Typography variant="h3">1000</Typography>
                  </ItemList>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Stack
            direction="row"
            sx={{
              marginTop: 2,
              gap: 5,
              marginLeft: 2,
              marginRight: 2,
            }}
          >
            <Paper sx={{ flex: 1, backgroundColor: "white" }}>
              <Chart data={dataPie} height={400}>
                <PieSeries
                  valueField="val"
                  argumentField="region"
                  innerRadius={0.6}
                />
                <Title text="Số lượng bán" />
                <Animation />
                <EventTracker />
                <Tooltip />
                <Legend position={"bottom"} itemComponent={Item} />
              </Chart>
            </Paper>
            <Box sx={{ flex: 1, height: 100 }}>
              <Paper>
                <StyledChart
                  height={400}
                  width={500}
                  data={energyConsumption}
                  className={classes.chart}
                >
                  <ArgumentScale factory={scalePoint} />
                  <ArgumentAxis />
                  <ValueAxis />

                  <LineSeries
                    name="Mua trực tiếp"
                    valueField="hydro"
                    argumentField="country"
                    seriesComponent={Line}
                  />
                  <LineSeries
                    name="Mua Online"
                    valueField="oil"
                    argumentField="country"
                    seriesComponent={Line}
                  />

                  <Legend
                    position="bottom"
                    itemComponent={Item}
                    labelComponent={Label}
                  />
                  <Title
                    text="Số lượng bán qua các năm (2010 - 2015)"
                    textComponent={Text}
                  />
                  <Animation />
                </StyledChart>
              </Paper>
            </Box>
            <Box sx={{ flex: 1, height: 100, backgroundColor: "red" }}>
              <Paper>
                <Chart data={dataColumn} height={400} width={400}>
                  <ArgumentAxis />
                  <ValueAxis />
                  <BarSeries valueField="population" argumentField="year" />
                  <Title text="Doanh thu qua các năm" />
                  <EventTracker />
                  <Tooltip />
                </Chart>
              </Paper>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default DashBoard;
