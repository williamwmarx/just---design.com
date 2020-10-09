import React from "react";
import "../sass/main.scss"

export default class CardStack extends React.Component {
  constructor(props) {
    super(props)
    this.state = { height: 500000 }
  }
                              
  update_cards_dims = () => {
    let margin_between_cards = 60
    let heights = Array.from(document.getElementById("card-stack").childNodes).map(c => c.offsetHeight)
    let total_height = heights.reduce((a, b) => a + b + margin_between_cards, 0)

    let height = 0
    if (window.innerWidth < 700) height = "auto"
    else if (window.innerWidth < 1100) height = Math.ceil(total_height / 2) + Math.max(...heights)
    else height = Math.ceil(total_height / 3) + Math.max(...heights)
    this.setState({ height: height })
  }

  componentDidMount() {
    this.update_cards_dims()
    setTimeout(() => { this.update_cards_dims() }, 50)
    window.addEventListener("resize", this.update_cards_dims.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.update_cards_dims.bind(this))
  }

  render() {
    return (
      <div id="card-stack" style={{height: this.state.height}}>
        {this.props.children}
      </div>
    )
  }
}
