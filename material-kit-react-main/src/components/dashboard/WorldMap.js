import { useEffect, useState } from 'react';
import Slider from '@material-ui/core/Slider';
import {
  Box,
  Button,
  CardContent,
  Card,
  Divider,
  CardHeader
} from '@material-ui/core';
/* import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'; */
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ReactTooltip from 'react-tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Maps from './Mapa';
/* eslint react/prop-types: 0 */

const indicadores = [
  {
    nombre: 'noticias',
    titulo: 'SOPHIA2',
    yearMin: '2020',
    yearMax: '2020',
    dir: '/medios_caleuche.csv'
  },
  {
    nombre: 'vulne',
    titulo: 'VULNERABILIDAD',
    yearMin: '1995',
    yearMax: '2017',
    dir: '/vulnerability.csv'

  },
  {
    nombre: 'democracy',
    titulo: 'DEMOCRACIA',
    yearMin: '2020',
    yearMax: '2020',
    dir: '/democracy_index.csv'
  },
  {
    nombre: 'freedom',
    titulo: 'LIBERTAD DE PRENSA',
    yearMin: '2021',
    yearMax: '2021',
    dir: '/Freedom_2021.csv'
  },
  {
    nombre: 'desarrollo',
    titulo: 'DESARROLLO HUMANO',
    yearMin: '2019',
    yearMax: '2019',
    dir: '/HDR2019.json'
  }
];
const WorldMap = (
  {
    pais,
    year,
    indexx,
    setYear,
  }
) => {
  const [content, setContent] = useState('');
  const [country, setCountry] = useState('CHL');
  const [index, setIndex] = useState('noticias');
  const IndexHandleChange = (event) => {
    setIndex(event.target.value);
  };
  const YearHandleChange = (event) => {
    setYear(event.target.value);
  };
  useEffect(() => {
    console.log('render map component');
    pais(country);
    indexx(index);
  });
  return (
    <Card>
      <CardHeader
        action={(
          <FormControl style={{ minWidth: 200 }}>
            <InputLabel htmlFor="grouped-native-select">INDICADORES</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={index}
              onChange={IndexHandleChange}
            >
              {Object.entries(indicadores).map((s) => (
                <MenuItem value={s[1].nombre}>{s[1].titulo}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        title="MONITOR DE INDICADORES SOCIO-ECONOMICOS"
      />
      <Divider />
      <CardContent>
        {
          true ? (
            <Slider
              value={year}
              min={2010}
              max={2021}
              aria-labelledby="discrete-slider-always"
              step={1}
              marks
              valueLabelDisplay="on"
              onChange={YearHandleChange}
            />
          ) : null
        }
        <Box
          sx={{
            height: 450,
            position: 'relative',
            display: 'flex'
          }}
        >
          <Maps
            setCountry={setCountry}
            indicador={index}
            setTooltipContent={setContent}
            year={2000}
          />
          <ReactTooltip
            html="true"
          >
            {content}
          </ReactTooltip>

        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      />
      <Box>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

export default WorldMap;
