/* Import React */
import React from "react";
/* Import Components */
import Emoji from "../components/Emoji";
import Head from "../components/Head";
import Title from "../components/Title";
/* Import Styles */
import "../sass/index.component.sass";
/* Import Data */
import Index from "../../static/json/index.json"
/* HELPER FUNCTIONS FOR GENERATING COLOR GRADIENT FOR NAV LINKS */
function rgb_to_hex(color) {
  let hex = Number(Math.floor(color)).toString(16);  // Convert int RGB to Hex code
  return (hex.length < 2) ? "0" + hex : hex; // Return Hex code, prepending zero if necessary
}

function calculate_color(index, count) {
  let color = [0, 0, 0]; // Output color
  let gc_1 = [99, 177, 223]; // Gradient color 1
  let gc_2 = [148, 151, 199]; // Gradient color 2
  let gc_3 = [239, 81, 157]; // Gradient color 3

  // Calculate RGB Colors based on index
  let ratio = index / (count - 1);
  if (ratio === 0) {
    color = gc_1;
  } else if (ratio === 0.5) {
    color = gc_2;
  } else if (ratio === 1) {
    color = gc_3;
  } else if (ratio < 0.5) {
    ratio *= 2; // Adjust for 1st gradient
    color = [
      (ratio * (gc_2[0] - gc_1[0])) + gc_1[0], 
      (ratio * (gc_2[1] - gc_1[1])) + gc_1[1], 
      (ratio * (gc_2[2] - gc_1[2])) + gc_1[2]
    ]
  } else {
    ratio = 2 * (ratio - 0.5); // Adjust ratio for 2nd gradient
    color = [
      (ratio * (gc_3[0] - gc_2[0])) + gc_2[0], 
      (ratio * (gc_3[1] - gc_2[1])) + gc_2[1], 
      (ratio * (gc_3[2] - gc_2[2])) + gc_2[2]
    ]
  }
  return "#" + rgb_to_hex(color[0]) + rgb_to_hex(color[1]) + rgb_to_hex(color[2]); // Convert RGB to Hex
}

class HomeLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        href: null
    }
  }

  async handle_link(link) {
      if (link.includes("mailto:")) {
        return "mailto:" + encodeURIComponent(link.split("mailto:")[1]);
      } else if (navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
          if (link.includes("instagram.com/p/")) {
              let response = await fetch("https://api.instagram.com/oembed/?url=" + link);
              if (response.status === 200) {
                  let result = await response.json();
                  return "instagram://media?id=" + result["media_id"]
              } else {
                  return link
              }
          } else if (link.includes("instagram.com/")) {
              let pathname = new URL(link).pathname.split("/")[1];
              return "instagram://user?username=" + pathname;
          }
      } else {
        return link
      }
  }

  componentDidMount() {
      this.setState({ href: this.props.href })
      if (this.props.href) {
          if (this.props.href.toLowerCase().includes("instagram") || this.props.href.toLowerCase().includes("mailto:")) {
            this.handle_link(this.props.href).then((result) => this.setState({ href: result }))
          } 
      }
  }
  
  render() {
    return (
      <a href={this.state.href} style={{
        color: this.props.nav_color,
        borderBottomColor: this.props.nav_color
      }}>
        {this.props.children}
      </a>
    )
  }
}

export default function Home() {
  return (
    <div className="root">
      <Head title="JUST DESIGN. THAT'S ALL IT TAKES."/>
      <Title name="THAT'S ALL IT TAKES." hide_bar={true}/>
      <div id="our-mission">
        <p>
          For far too long, the worlds of architecture and design have been a plutocracy intent on social atomization and oppression of the Other. This website is intended as an evolving, community-run, open access resource for the democratization of knowledge surrounding architecture, design and any tangential fields.
        </p>
      </div>

      <div>
        {Index.navigation.map((data, index) => {
          let nav_color = calculate_color(index, Index.navigation.length); // Calculate nav link color
          return (
            <h3 key={`link_${index}`}>
              <HomeLink href={data.link} nav_color={nav_color}>
                {data.title} <Emoji name={data.emoji_name} emoji={data.emoji}/> →
              </HomeLink>
            </h3>
          );
        })}
      </div>
    </div>
  )
}
