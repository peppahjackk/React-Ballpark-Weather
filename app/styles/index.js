var primary = '#428640';
var secondary = '#477998';
var tertiary = '#931621';
var neutralLgt = '#FCF7F8';
var neutralDk = '#3C3744';

var styles = {
  fullGrid: {
    height: '100vh',
    margin: '0px'
  },
  bold: {
    fontWeight: 'bold'
  },
  infoHeader: {
    marginBottom: 0,
    color: neutralDk
  },
  infoSubHeader: {
    marginTop: 0,
    color: neutralDk
  },
  list: {
    listStyleType: 'none',
    padding: ".5rem .5rem 2.5rem",
    border: "2.5px solid" + neutralDk,
    borderRadius: "4px",
    margin: '1em 1em 0',
    background: 'url("images/grass40.png") repeat-x scroll left bottom transparent',
    backgroundColor: neutralLgt,
    position: 'relative'
  },
  details: {
    padding: '.5em'
  },
  ulGrass: {
    position: 'absolute',
    background: 'url(images/grass40lgt.png) repeat-x scroll 12% bottom',
    height: '40px',
    width: '100%',
    bottom: '0',
    left: '0'
  }
};

module.exports = styles;