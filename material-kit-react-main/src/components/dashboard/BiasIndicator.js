import { useEffect, useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { arc } from 'd3-shape';
import * as d3 from 'd3';

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';

const fifty = 50;
const large = (-Math.PI / 2) + (Math.PI * fifty) / 100;
const arco = arc()
  .innerRadius(25)
  .outerRadius(110)
  .startAngle(-Math.PI / 2)
  .endAngle(large);
const arco2 = arc()
  .innerRadius(25)
  .outerRadius(110)
  .startAngle(large)
  .endAngle(Math.PI / 2);

const BiasIndicator = (props) => {
  const devices = [
    {
      title: 'Grupo 1',
      value: 63,
      icon: LaptopMacIcon,
      color: colors.red[600]
    },
    {
      title: 'Grupo 2',
      value: 23,
      icon: PhoneIcon,
      color: colors.indigo[500]
    }
  ];
  const [angulo, setAngulo] = useState(0);
  const d3Chart = useRef();

  useEffect(() => {
    const margin = {
      top: 20,
      right: 30,
      bottom: 30,
      left: 30
    };
    const width = parseInt(d3.select('#d3demo').style('width'), 10) - margin.left - margin.right;
    const height = parseInt(d3.select('#d3demo').style('height'), 10) - margin.top - margin.bottom;

    const svg = d3.select(d3Chart.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
    svg
      .attr('height', height + margin.top + margin.bottom);

    svg
      .select('#aguja')
      .attr('transform', `rotate( ${(angulo * 1.8 - 90)} 0 0)`);
    setAngulo(180);
  }, []);

  return (
    <Card {...props}>
      <CardHeader title="SESGOS DE GRUPOS" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 150,
            position: 'relative'
          }}
        >
          <div id="d3demo">
            <Grid container>
              <Box
                sx={{
                  height: 200,
                  position: 'relative'
                }}
              >
                <svg
                  ref={d3Chart}
                  viewBox="400 400 500 500'"
                >
                  <g
                    transform="translate(145 150)"
                  >
                    <path
                      d={arco()}
                      fill={colors.red[600]}
                    />
                    <path
                      d={arco2()}
                      fill={colors.indigo[500]}
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r="2"
                      fill="white"
                    />
                    <path
                      id="aguja"
                      d="M-20 0 L20 0 L0 -110 Z"
                      stroke="black"
                      fill="red"
                      transform=" rotate(45 0 0)"
                    />
                  </g>
                </svg>
              </Box>
            </Grid>
          </div>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BiasIndicator;
