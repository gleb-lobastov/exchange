import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  fontFamily: [
    'Roboto',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Arial',
    'sans-serif',
  ].join(','),
  palette: {
    primary: {
      main: '#4caf50',
      contrastText: '#ffffff',
    },
    background: {
      paper: '#fafafa',
      default: '#d3d3d3',
      card: '#c8e6c9',
    },
  },
  typography: {
    useNextVariants: true,
  },
});
