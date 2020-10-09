/* Import React */
import React from "react"
/* Import Components */
import Emoji from "../components/Emoji.js"
import Root from "../components/Root.js"
/* Import Styles */
import "../sass/main.scss";
/* Import Data */
import Index from "../../static/json/index.json"

export default function Home() {
  return (
    <Root page="That's All It Takes.">
      <p id="our-mission">
        For far too long, the worlds of architecture and design have been a plutocracy intent on social atomization and oppression of the Other. This website is intended as an evolving, community-run, open access resource for the democratization of knowledge surrounding architecture, design and any tangential fields.
      </p>
      <ul id="nav-links">
        {Index.navigation.map((data, index) => {
          return (
            <li key={`link_${index}`}>
              <a href={data.link}> {data.title} <Emoji emoji={data.emoji}/> →</a>
            </li>
          );
        })}
      </ul>
    </Root>
  )
}
