import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const rows = [
  {
    id: 1, ISO3: 'USA', country: 'estadosunidos', media_outlet: 'npenews', count: 107406
  },
  {
    id: 2, ISO3: 'ESP', country: 'espana', media_outlet: 'okdiario', count: 100742
  },
  {
    id: 3, ISO3: 'ESP', country: 'espana', media_outlet: 'antena3', count: 99950
  },
  {
    id: 4, ISO3: 'ESP', country: 'espana', media_outlet: 'elespanol', count: 98094
  },
  {
    id: 5, ISO3: 'AUS', country: 'australia', media_outlet: 'sbsnewsau', count: 93561
  },
  {
    id: 6, ISO3: 'ESP', country: 'espana', media_outlet: 'publico', count: 76236
  },
  {
    id: 7, ISO3: 'CHL', country: 'chile', media_outlet: 'biobiochile', count: 66862
  },
  {
    id: 8, ISO3: 'CHL', country: 'chile', media_outlet: 'horas24', count: 65471
  },
  {
    id: 9, ISO3: 'USA', country: 'estadosunidos', media_outlet: 'washingtonpost', count: 29931
  },
  {
    id: 10, ISO3: 'ESP', country: 'espana', media_outlet: 'elcorreoespana', count: 27215
  },
  {
    id: 11, ISO3: 'ESP', country: 'espana', media_outlet: 'larazon', count: 21655
  },
  {
    id: 12, ISO3: 'CHN', country: 'china', media_outlet: 'chinadaily', count: 13482
  },
  {
    id: 13, ISO3: 'ESP', country: 'espana', media_outlet: 'abcespana', count: 9717
  },
  {
    id: 14, ISO3: 'CAN', country: 'canada ', media_outlet: 'tvanouvelles', count: 9390
  },
  {
    id: 15, ISO3: 'BRA', country: 'brasil', media_outlet: 'bandnews', count: 7589
  },
  {
    id: 16, ISO3: 'AUS', country: 'australia', media_outlet: 'news7', count: 2976
  }
];

const LatestOrders = (props) => {
  console.log('Render tabla');
  const result = rows.filter((row) => row.country === 'espana');
  console.log(result);
  return (
    <Card {...props}>
      <CardHeader title="LISTA DE PRINCIPALES MEDIOS" />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell size="small" width="10%">
                  NOMBRE
                </TableCell>
                <TableCell width="10%">
                  NUMERO DE NOTICIAS
                </TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      PAIS
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="left" size="small">
                    {row.media_outlet}
                  </TableCell>
                  <TableCell align="left">{row.count}</TableCell>
                  <TableCell align="left">{row.country}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

export default LatestOrders;
