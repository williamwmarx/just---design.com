import React from "react";
import "../sass/title.component.sass"

export default class Title extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        first_load: true,
        underline_width: 0,
        underline_height: 0,
        underline_left: 0,
        title: this.props.name 
      };
    }

    calculate_bar_dimensions() {
      const that = this
      const fl = that.state.first_load 
      that.setState({first_load: false})
      const windowsize = typeof window !== 'undefined' && window
      let text = document.createElement("h2"); 
      document.body.appendChild(text); 
      text.style.position = "absolute"; 
      text.innerHTML = that.state.title;
      let width = Math.ceil(text.clientWidth); 
      if (width >= windowsize.innerWidth * 0.95 && windowsize.innerWidth < 700 && that.state.title.split(" ").length > 1) {
        this.setState({"title": that.state.title.split(" ")[that.state.title.split(" ").length - 1]});
        if (fl) that.calculate_bar_dimensions()
      } 
      text.innerHTML = "I";
      let height = Math.ceil(0.6 * text.clientWidth); 
      document.body.removeChild(text)
      that.setState({
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
      let title = this.props.name
      let w = this.state.underline_width
      let l = this.state.underline_left
      if (!this.props.hide_bar) {
        bar = (
          <hr style={{
            position: "absolute", 
            height: `${this.state.underline_height}px`,
            width: `${w}px`, 
            left: `${l}px`
          }}/>
        )
      }
      return (
        <div style={{position: "relative", margin: "1.5em auto 0em auto"}}>
            <h1><a style={{textDecoration: "none"}} href="https://just---design.com">JUST DESIGN.</a></h1>
            <h2>{this.state.title}</h2>
            {bar}
        </div>
      );
    }
  }
