var primary = '#428640';
var secondary = '#477998';
var tertiary = '#931621';
var neutralLgt = '#FCF7F8';
var neutralDk = '#3C3744';
var greenDk = '#2F4D2E';
var white = '#EDEDED';

var styles = {
  app: {
    backgroundColor: '#C6E8FD'
  },
  fullGrid: {
    margin: '0px auto',
    maxWidth: '1500px'
  },
  container: {
    paddingBottom: '4rem'
  },
  bold: {
    fontWeight: 'bold'
  },
  skeleton: {
    minHeight: '250px'
  },
  infoHeader: {
    marginBottom: 0,
    color: 'white',
    fontFamily: 'Roboto, sans-serif'
  },
  infoSubHeader: {
    marginBottom: 0,
    color: 'white',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '400'
  },
  headerImg: {
    width: '33.3333%',
    width: '300px',
    padding: '0 .5rem'
  },
  detailsContainer: {
    padding: ".5rem",
    border: "6px solid white",
    borderRadius: "4px",
    margin: '1.5rem 0 1rem',
    background: '#436040', /* Old browsers */
    background: '-moz-linear-gradient(top, #436040 0%, #2f4d2e 100%)', /* FF3.6-15 */
    background: '-webkit-linear-gradient(top, #436040 0%,#2f4d2e 100%)', /* Chrome10-25,Safari5.1-6 */
    background: 'linear-gradient(to bottom, #436040 0%,#2f4d2e 100%)', /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#436040', endColorstr='#2f4d2e',GradientType=0 )", /* IE6-9 */
    position: 'relative'
  },
  precipTable: {
    background: 'none',
    color: white,
    border: '1px solid ' + white,
    fontFamily: 'Roboto, sans-serif'
  },
  precipTHead: {
    background: 'none',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
    fontFamily: 'Roboto, sans-serif'
  },
  highChance: {
    fontSize: '1.25em',
    color: white
  },
  highChanceItem: {
    padding: '0.25rem 0'
  },
  noHighChanceHeader: {
    padding: '1rem 0.5rem 0'  
  },
  lowChance: {
    columnCount: 2,
    WebkitColumnCount: 2,
    MozColumnCount: 2,
    columnGap: '4px',
    WebkitColumnGap: '4px',
    MozColumnGap: '4px',
    color: 'rgb(167,167,167)',
    margin: '.5rem 0',
    fontSize: '0.95rem'
  },
  details: {
    padding: '.5em'
  },
  detailsRow: {
    height: '100%',
    padding: '0 0 .5rem',
    zIndex: 2
  },
  ulGrass: {
    position: 'absolute',
    background: 'url(images/grass40lgt.png) repeat-x scroll 12% bottom',
    height: '40px',
    width: '100%',
    bottom: '0',
    left: '0'
  },
  noMarginTop: {
    marginTop: 0
  }
};

module.exports = styles;