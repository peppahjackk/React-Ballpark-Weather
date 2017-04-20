var primary = '#428640';
var secondary = '#477998';
var tertiary = '#931621';
var neutralLgt = '#FCF7F8';
var neutralDk = '#3C3744';
var greenDk = '#2F4D2E';

var styles = {
  app: {
    backgroundColor: '#C6E8FD'
  },
  fullGrid: {
    margin: '0px'
  },
  container: {
    height: '100vh'
  },
  bold: {
    fontWeight: 'bold'
  },
  skeleton: {
    minHeight: '250px'
  },
  infoHeader: {
    marginBottom: 0,
    color: neutralDk
  },
  headerImg: {
    width: '33.3333%',
    maxWidth: '500px',
    minWidth: '200px',
    padding: '.5rem'
  },
  infoSubHeader: {
    marginTop: 0,
    color: neutralDk
  },
  detailsContainer: {
    padding: ".5rem",
    border: "2.5px solid white",
    borderRadius: "4px",
    margin: '1em 0 0',
    backgroundColor: greenDk,
    position: 'relative'
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: '.5rem',
    borderStyle: 'solid',
    borderWidth: '2px 2px 0px 2px',
    borderColor: 'white'
  },
  highChance: {
    fontWeight: 'bold',
    fontSize: '1.25em',
    color: 'white'
  },
  lowChance: {
    columnCount: 2,
    WebkitColumnCount: 2,
    MozColumnCount: 2,
    columnGap: '4px',
    WebkitColumnGap: '4px',
    MozColumnGap: '4px',
    columnRule: '4px outset white',
    WebkitColumnRule:'4px outset white',
    MozColumnRule:'4px outset white',
    color: '#999'
  },
  details: {
    padding: '.5em'
  },
  detailsRow: {
    height: '100%'
  },
  ulGrass: {
    position: 'absolute',
    background: 'url(images/grass40lgt.png) repeat-x scroll 12% bottom',
    height: '40px',
    width: '100%',
    bottom: '0',
    left: '0'
  },
  listItem: {
    borderBottom: '2px solid white'
  }
};

module.exports = styles;