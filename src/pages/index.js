import React from "react";
import Helmet from "react-helmet";
import "../css/main.css";
import Emoji from "../components/Emoji";
import JustDesign from "../../static/images/just---design.png"

export default function Home() {
  return (
    <div className="root">
      <Helmet title="JUST DESIGN. THAT'S ALL IT TAKES." defer={false} />

      <img className="just-design" src={ JustDesign } alt="JUST DESIGN. THAT'S ALL IT TAKES."/>

      <div id="links">
        {/* MISSION */}
        <h3>
          <a id="mission-nav" className="OCP" href="mission">
            Mission <Emoji name="speech bubble" emoji="💬"/> →
          </a>
        </h3>

        {/* READINGS */}
        <h3>
          <a id="readings-nav" className="OCP" href="readings">
            Readings <Emoji name="open book" emoji="📖"/> →
          </a>
        </h3>

        {/* FILMS */}
        <h3>
          <a id="films-nav" className="OCP" href="films">
            Films <Emoji name="clapper board" emoji="🎬"/> →
          </a>
        </h3>

        {/* BIPOC PRAXES */}
        <h3>
          <a id="bipoc-praxes-nav" className="OCP" href="bipoc-praxes">
            BIPOC Praxes <Emoji name="triangular ruler" emoji="📐"/> →
          </a>
        </h3>

        {/* ONE CLICK ACTIVISM */}
        <h3>
          <a id="one-click-activism-nav" className="OCP" href="one-click-activism">
            One Click Activism <Emoji name="police car light" emoji="🚨"/> →
          </a>
        </h3>

        {/* Featured Designers */}
        <h3>
          <a id="featured-designers-nav" className="OCP" href="featured-designers">
            Featured Designers <Emoji name="bust in silhouette" emoji="👤"/> →
          </a>
        </h3>

        {/* Acknowledgments */}
        <h3>
          <a id="acknowledgments-nav" className="OCP" href="acknowledgments">
            Acknowledgments <Emoji name="folded hands" emoji="🙏"/> →
          </a>
        </h3>

        {/* Suggest an Addition */}
        <h3>
          <a id="suggest-an-addition-nav" className="OCP" href="mailto:marx@concurrent.studio?Subject=Suggest%20An%20Addition%20📨">
            Suggest an Addition <Emoji name="incoming envelope" emoji="📨"/> →
          </a>
        </h3>
      </div>
    </div>
  )
}
