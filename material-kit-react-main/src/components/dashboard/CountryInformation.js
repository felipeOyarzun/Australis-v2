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
import { useEffect, useState } from 'react';
import { csv, json } from 'd3-fetch';

/* eslint react/prop-types: 0 */

const CountryInformation = ({
  sx,
  pais,
  indice,
  year,
  /* eslint-disable no-unused-vars */
  numero
}) => {
  /* eslint-disable no-unused-vars */
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [loaded, setLoaded] = useState(false);
  /* eslint-disable no-unused-vars */

  useEffect(() => {
    console.log('render info paises');
    csv('/vulnerability.csv').then((d) => {
      setData(d);
      setLoaded(false);
    });
    csv('/medios_caleuche.csv').then((d) => { setData1(d); });
    json('/HDR2019.json').then((d) => { setData2(Object.values(d)[0]); });
    csv('/Freedom_2021.csv').then((d) => { setData3(d); });
    csv('/democracy_index.csv').then((d) => { setData4(d); });
  }, []);
  console.log('Render  indfo paices 2');
  const devices = [
    {
      title: 'Vulnerabilidad',
      value: 63,
      icon: LaptopMacIcon,
      color: colors.indigo[500]
    },
    {
      title: 'Desarrollo',
      value: 23,
      icon: PhoneIcon,
      color: colors.red[600]
    },
    {
      title: 'Libertad',
      value: 23,
      icon: PhoneIcon,
      color: colors.red[600]
    },
    {
      title: 'Democracia',
      value: 23,
      icon: PhoneIcon,
      color: colors.red[600]
    }
  ];

  return (
    <Card {...sx}>
      <CardHeader title="INFORMACION DE PAISES" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            position: 'relative',
            textAlign: 'center'
          }}
        >
          <Typography
            color="textPrimary"
            variant="h1"
          >
            {pais}
          </Typography>
          <Typography
            color="textPrimary"
            variant="body1"
          >
            {indice}
            {' '}
            {year}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h2"
          >
            {loaded ? Math.trunc(data?.filter((a) => a.Name === 'CHL')[0][year] * 1000) / 1000 : 'loading...'}
          </Typography>
        </Box>
        <Box
          border={1}
          justifyContent="flex-end"
          flexWrap="wrap"
          display="block"
          m={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              border={1}
              justifyContent="flex-end"
              flexWrap="wrap"
              key={title}
              display="block"
              m={3}
              sx={{
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
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

export default CountryInformation;
