import React from "react";
import "../sass/cardstack.component.sass"

export default class CardStack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 500000,
            width: 100000
        };
    }
                                
    update_cards_dims = () => {
        let total_height = 0; 
        let average_height = 0; 
        let max_height = 0;
        let cards = document.getElementById("card-stack").childNodes;
        for (let i = 0; i < cards.length; i++) {
            let card_height = cards[i].offsetHeight+parseInt(20)
            total_height += card_height;
            if (card_height > max_height) max_height = card_height;
        }
        if (window.innerWidth < 700) {
            this.setState({
                height: "auto",
                width: window.innerWidth
            })

        } else {
            if (window.innerWidth < 1100) {
                average_height = total_height/2;
            } else {
                average_height = total_height/3;
            }
            this.setState({
                height: Math.ceil(average_height + max_height),
                width: window.innerWidth
            })
        }
    }
  
    componentDidMount() {
        // Calculate initial gradient bar width, slightly off due to font load speed
      this.update_cards_dims();

      // Wait 10ms and do it again just to be more accurate
      this.timer = setInterval(
        () => this.update_cards_dims(),
        10,
      );
      // Bind window resize to creating new dimensions for the gradient bar
      window.addEventListener("resize", this.update_cards_dims.bind(this));
    }

    componentWillUnmount() {
        // Remove resize listener
        window.removeEventListener("resize", this.update_cards_dims.bind(this));
      }
  
    render() {
        return (
            <div id="card-stack" style={{height: this.state.height}}>
                {this.props.children}
            </div>
        )
    }
}
  
