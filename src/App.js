import React, { Component } from 'react'
import CryptoCard from './components/crypto-card'

class App extends Component {
  render() {
    return (
      <div>
        <CryptoCard name="Bitcoin" symbol="BTC" />
      </div>
    )
  }
}

export default App
