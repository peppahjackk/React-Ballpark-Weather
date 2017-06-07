import React from 'react'

export default class extends React.Component {
  render() {
    return(
      <footer>
        Weather Data <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a> | Game Data <a href="http://www.mlb.com">from MLB.com</a>
      </footer>
    )
  }
}