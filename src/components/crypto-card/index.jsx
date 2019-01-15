import React, { Component } from 'react'
import './styles.css'
import fetch from 'isomorphic-fetch'

export class CryptoCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.name,
      symbol: props.symbol,
      price: null,
      lastPrice: null,
    }
  }

  pollPrice = () => {
    console.log('polling for new price..')
    const { symbol } = this.state
    fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=${symbol},GBP`
    )
      .then(response => response.json())
      .then(json => {
        this.setState(prevState => ({
          price: json.GBP,
          lastPrice:
            prevState.price !== json.GBP
              ? prevState.price
              : prevState.lastPrice,
        }))
      })
      .catch(error => console.log(error))
  }

  priceChange = (lastPrice, price) => {
    const differenceBetweenPrices = lastPrice - price
    const changeInPrices = differenceBetweenPrices / lastPrice
    return (changeInPrices * 100).toFixed(3)
  }

  componentDidMount() {
    this.pollPrice()
    setInterval(this.pollPrice, 10000)
  }

  render() {
    const { name, symbol, price, lastPrice } = this.state
    return (
      <div className="card">
        <div className="name">
          {name}
          <span>({symbol})</span>
        </div>
        <div className="percent-change">{this.priceChange(lastPrice, price) + `%`}</div>
        <div className="logo">{symbol}</div>
        <div className="price">{`${price} GBP`}</div>
      </div>
    )
  }
}

export default CryptoCard
