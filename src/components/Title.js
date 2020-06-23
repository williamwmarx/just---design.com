import React from "react";
import "../sass/title.component.sass"

export default class Title extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        first_load: true,
        underline_width: 0,
        underline_height: 0,
        underline_left: 0
      };
    }

    calculate_bar_dimensions() {
      let text = document.createElement("h2"); 
      document.body.appendChild(text); 
      text.style.position = "absolute"; 
      text.innerHTML = this.props.name;
      let width = Math.ceil(text.clientWidth); 
      text.innerHTML = "I";
      let height = Math.ceil(0.6 * text.clientWidth); 
      document.body.removeChild(text)
      this.setState({
          underline_width: width,
          underline_height: height,
          underline_left: (window.innerWidth / 2) - (width / 2)
      });
    }
  
    componentDidMount() {
      // Calculate initial gradient bar width, slightly off due to font load speed
      this.calculate_bar_dimensions();

      // Wait 10ms and do it again just to be more accurate
      this.timer = setInterval(
        () => this.calculate_bar_dimensions(),
        10,
      );
      // Bind window resize to creating new dimensions for the gradient bar
      window.addEventListener("resize", this.calculate_bar_dimensions.bind(this));
    }

    componentWillUnmount() {
      // Clear the timer, it's no longer necessary
      clearTimeout(this.timer);
      // Remove resize listener
      window.removeEventListener("resize", this.calculate_bar_dimensions.bind(this));
    }

    render() {
      // If applicable, render the horizontal bar with necessary dimensions
      let bar = null;
      if (!this.props.hide_bar) {
        bar = (
          <hr style={{
            position: "absolute", 
            height: `${this.state.underline_height}px`,
            width: `${this.state.underline_width}px`, 
            left: `${this.state.underline_left}px`
          }}/>
        )
      }
      return (
        <div style={{position: "relative", margin: "1.5em auto 0em auto"}}>
            <h1>JUST DESIGN.</h1>
            <h2>{this.props.name}</h2>
            {bar}
        </div>
      );
    }
  }