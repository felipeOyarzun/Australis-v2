import React, { memo, useEffect, useState } from 'react';
import { csv, json } from 'd3-fetch';
import { scaleLinear } from 'd3-scale';
import {
  ComposableMap,
  Geographies,
  Geography,
  // Marker,
  ZoomableGroup
} from 'react-simple-maps';

/* const markers = [
  { markerOffset: -30, name: 'Buenos Aires', coordinates: [-58.3816, -34.6037] },
  { markerOffset: 5, name: 'La Paz', coordinates: [-68.1193, -16.4897] },
  { markerOffset: 15, name: 'Brasilia', coordinates: [-47.8825, -15.7942] },
  { markerOffset: 15, name: 'Santiago', coordinates: [-70.6693, -33.4489] },
  { markerOffset: 15, name: 'Bogota', coordinates: [-74.0721, 4.711] },
  { markerOffset: 15, name: 'Quito', coordinates: [-78.4678, -0.1807] },
  { markerOffset: 30, name: 'Madrid', coordinates: [-3.4678, 40.1807] }
]; */
const geoUrl = '/world-110m.json';

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(['#ffedea', '#ff5233']);

/*
const categoria = (valor) =>{
  if (valor > 0.8){return 1}
  else if (valor > 0.5){return(0.5)}
  else if (valor > 0.3){return(0.3)}
  else return 0.1
}
*/
const desarrollo = (valor) => {
  if (valor > 0.8) {
    return ('#003152');
  } if (valor > 0.7) {
    return ('#00726a');
  } if (valor > 0.55) {
    return ('#00bfad');
  } return ('#A8ECD5');
};
const democracyColor = (valor) => {
  if (valor > 90) {
    return ('#00681C');
  } if (valor > 80) {
    return ('#009859');
  } if (valor > 70) {
    return ('#5EBC6E');
  } if (valor > 60) {
    return ('#A3D879');
  } if (valor > 50) {
    return ('#FFDF96');
  } if (valor > 40) {
    return ('#FFAD6D');
  } if (valor > 30) {
    return ('#F86B4C');
  } if (valor > 20) {
    return ('#AC2324');
  } if (valor > 10) {
    return ('#680019');
  } return ('#A8ECD5');
};

const categoriafreedom = (valor) => {
  if (valor > 159) {
    return '#000000';
  } if (valor > 107) {
    return ('red');
  } if (valor > 48) {
    return ('orange');
  } return 'yellow';
};
/* variables para las leyendas */

/* let c1 = 'green';
let t1 = 'TEXT';
let c2 = 'green';
let t2 = 'TEXT';
let c3 = 'green';
let t3 = 'TEXT';
let c4 = 'green';
let t4 = 'TEXT'; */
/* eslint react/prop-types: 0 */
const Maps = (props) => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  //  const [center, setCenter] = useState([20, 0]);
  //  const [zooom, setZoom] = useState(1);
  const [year, setYear] = useState('2017');

  useEffect(() => {
    csv('/vulnerability.csv').then((d) => { setData(d); });
    csv('/medios_caleuche.csv').then((d) => { setData1(d); });
    json('/HDR2019.json').then((d) => { setData2(Object.values(d)[0]); });
    csv('/Freedom_2021.csv').then((d) => { setData3(d); });
    csv('/democracy_index.csv').then((d) => { setData4(d); });
    setYear(props.year);
  }, []);
  return (
    <ComposableMap
      width="1000"
      height="600"
      data-tip=""
      projectionConfig={{ scale: 230 }}
      style={{
        background: '#99ccff'
      }}
    >
      <ZoomableGroup zoom={1} center={[20, 0]}>
        <Geographies geography={geoUrl}>
          {({ geographies }) => geographies.map((geo) => {
            const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);
            const d1 = data1.find((s) => s.ISO3 === geo.properties.ISO_A3);
            const d2 = Object.keys(data2).find((s) => s === geo.properties.ISO_A3);
            const d3 = data3.find((s) => s.ISO3 === geo.properties.ISO_A3);
            const d4 = data4.find((s) => s.ISO3.toUpperCase() === geo.properties.ISO_A3);
            let color = '#000000';
            switch (props.indicador) {
              case 'desarrollo':
                color = d2 ? desarrollo(data2[d2]['137506'][2019]) : '#000000';
                //  t1 = 'ALTO'; t2 = 'MEDIO'; t3 = 'BAJO'; t4 = 'MUY BAJO';
                //  c1 = '#003152'; c2 = '#00726a'; c3 = '#00bfad'; c4 = '#A8ECD5';
                break;
              case 'freedom':
                color = d3 ? categoriafreedom(d3['2021']) : '#000000';
                //  t1 = 'BUENO'; t2 = 'PROBLEMATICO'; t3 = 'DICIFIL'; t4 = 'MUY SERIO';
                //  c1 = 'yellow'; c2 = 'orange'; c3 = 'red'; c4 = 'black';
                break;
              case 'vulne':
                color = d ? colorScale(d[year]) : '#ffffff';
                //  t1 = 'ALTO'; t2 = 'MEDIO'; t3 = 'BAJO'; t4 = 'MUY BAJO';
                break;
              case 'noticias':
                color = d1 ? '#2cff08' : 'grey';
                break;
              case 'democracy':
                color = d4 ? democracyColor(d4['2020']) : '#000000';

                break;
              default:
                    // code block
            }
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={color}
                stroke="white"
                strokeWidth={1}
                style={{
                  background: 'red',
                  hover: {
                    outline: 'none',
                    strokeWidth: '2',
                    stroke: '#000000',
                    cursor: 'pointer'
                  }
                }}
                onMouseEnter={() => {
                  const { NAME } = geo.properties;
                  props.setTooltipContent(`${NAME}`);
                }}
                onClick={() => {
                  const { NAME } = geo.properties;
                  props.setCountry(`${NAME}`);
                  console.log(geo.properties);
                }}
                onMouseLeave={() => {
                  props.setTooltipContent('');
                }}
              />
            );
          })}
        </Geographies>
        {/* {markers.map(({ name, coordinates, markerOffset }) => (
          <Marker key={name} coordinates={coordinates}>
            <g
              fill="red"
              stroke="#000000"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-12, -24)"
            >
              <circle cx="12" cy="10" r="3" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
            </g>
            <text
              textAnchor="middle"
              y={markerOffset}
              style={{ fontFamily: 'system-ui', fill: 'black' }}
            >
              {name}
            </text>
          </Marker>
        ))} */}
      </ZoomableGroup>
      {/*
      <svg>
        <rect
          x="1"
          y="20"
          width="30"
          height="30"
          fill="grey"
          stroke="white"
          strokeWidth={1}
          onClick={() => {
            setZoom(2);
          }}
        />
        <rect
          x="1"
          y="80"
          width="30"
          height="30"
          fill="grey"
          onClick={() => {
            setZoom(1);
            setCenter([0, 0]);
          }}
        />
        <rect
          x="1"
          y="330"
          width="120"
          height="200"
          fillOpacity="0.4"
          fill="grey"
        />
        <rect
          x="5"
          y="350"
          width="20"
          height="20"
          fill={c1}
        />
        <text
          x="30"
          y="370"
          style={{
            fontFamily: 'system-ui', fill: 'black',
          }}
        >
          {t1}
        </text>
        <rect
          x="5"
          y="400"
          width="20"
          height="20"
          fill={c2}
        />
        <text
          x="30"
          y="420"
          style={{
            fontFamily: 'system-ui', fill: 'black',
          }}
        >
          {t2}
        </text>
        <rect
          x="5"
          y="450"
          width="20"
          height="20"
          fill={c3}
        />
        <text
          x="30"
          y="470"
          style={{
            fontFamily: 'system-ui', fill: 'black',
          }}
        >
          {t3}
        </text>
        <rect
          x="5"
          y="500"
          width="20"
          height="20"
          fill={c4}
        />
        <text
          x="30"
          y="520"
          style={{
            fontFamily: 'system-ui', fill: 'black',
          }}
        >
          {t4}
        </text>
      </svg>
        */}
    </ComposableMap>
  );
};
export default memo(Maps);
