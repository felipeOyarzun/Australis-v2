import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import LatestOrders from 'src/components/dashboard//LatestOrders';
import WorldMap from 'src/components/dashboard//WorldMap';
// import BiasIndicator from 'src/components/dashboard//BiasIndicator';
import CountryInformation from 'src/components/dashboard/CountryInformation';

const Dashboard = () => {
  /* eslint-disable no-unused-vars */
  // pais año indice escogidos
  const [pais, setPais] = useState('Chile');
  const [year, setYear] = useState('2018');
  const [indice, setIndice] = useState('noticias');
  const [numero, setNumero] = useState('23');
  /* eslint-disable no-unused-vars */
  useEffect(() => {
    console.log('Render Dashboard');
    console.log(pais);
    console.log(indice);
    console.log(year);
  }, []);
  console.log('render dashboard 2');
  return (
    <>
      <Helmet>
        <title>Australis | Sophia2 </title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <WorldMap
                pais={setPais}
                year={year}
                setYear={setYear}
                indexx={setIndice}
                setNumero={setNumero}
              />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <CountryInformation
                sx={{ height: '100%' }}
                pais={pais}
                indice={indice}
                year={year}
                numero={numero}
              />
              <LatestOrders />
            </Grid>
            {/* <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <BiasIndicator sx={{ height: '100%' }} />
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
