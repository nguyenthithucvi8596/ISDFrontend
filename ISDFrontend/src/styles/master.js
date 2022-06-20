
import { createTheme } from '@material-ui/core/styles';

const customTheme = createTheme({
  breakpoints: {
    values: {
      mobile: 320,
      tablet: 650,
      desktop: 1024,
    },
  },
});

// ##############################
// // // Variables - Styles that are used on more than one component
// #############################


const container = {
  paddingRight: '15px',
  paddingLeft: '15px',
  marginRight: 'auto',
  marginLeft: 'auto',
  '@media (min-width: 768px)': {
    width: '750px',
  },
  '@media (min-width: 992px)': {
    width: '970px',
  },
  '@media (min-width: 1200px)': {
    width: '1170px',
  },
  '&:before,&:after': {
    display: 'table',
    content: '" "',
  },
  '&:after': {
    clear: 'both',
  },
};



export {

  container,

  customTheme

};
