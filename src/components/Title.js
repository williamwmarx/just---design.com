import React from "react";
import "../sass/main.sass"

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
        // Account for slow loading of Carrie
        if (this.state.first_load) {
          width = Math.ceil(width * 0.77);
          height = Math.ceil(height * 0.77);
          this.setState({
              first_load: false
          })
      }
        this.setState({
            underline_width: width,
            underline_height: height,
            underline_left: (window.innerWidth / 2) - (width / 2)
        });
    }
  
    componentDidMount() {
        this.calculate_bar_dimensions();
        window.addEventListener("resize", this.calculate_bar_dimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.calculate_bar_dimensions.bind(this));
      }

    render() {
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
        <div className="page-header">
            <h1>JUST DESIGN.</h1>
            <h2>{this.props.name}</h2>
            {bar}
        </div>
      );
    }
  }