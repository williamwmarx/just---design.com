import React from "react";
import "../css/main.css"

export default function Home() {
  return (
    <div className="root">
      <div className="just-design">
        <h1>JUST DESIGN.</h1>
        <h2>THAT&rsquo;S ALL IT TAKES.</h2>
      </div>

      <div id="links">
        {/* MISSION */}
        <h3>
          <a id="mission-nav" href="mission">
            Mission <span role="img" aria-label="speech bubble">💬</span> →
          </a>
        </h3>

        {/* READINGS */}
        <h3>
          <a id="readings-nav" href="readings">
            Readings <span role="img" aria-label="open book">📖</span> →
          </a>
        </h3>

        {/* FILMS */}
        <h3>
          <a id="films-nav" href="films">
            Films <span role="img" aria-label="clapper board">🎬</span> →
          </a>
        </h3>

        {/* BIPOC PRAXES */}
        <h3>
          <a id="bipoc-praxes-nav" href="bipoc-praxes">
            BIPOC Praxes <span role="img" aria-label="triangular ruler">📐</span> →
          </a>
        </h3>

        {/* ONE CLICK ACTIVISM */}
        <h3>
          <a id="one-click-activism-nav" href="one-click-activism">
            One Click Activism <span role="img" aria-label="police car light">🚨</span> →
          </a>
        </h3>

        {/* Featured Designers */}
        <h3>
          <a id="featured-designers-nav" href="featured-designers">
            Featured Designers <span role="img" aria-label="bust in silhouette">👤</span> →
          </a>
        </h3>

        {/* Acknowledgments */}
        <h3>
          <a id="acknowledgments-nav" href="acknowledgments">
            Acknowledgments <span role="img" aria-label="folded hands">🙏</span> →
          </a>
        </h3>

        {/* Suggest an Addition */}
        <h3>
          <a id="suggest-an-addition-nav" href="mailto:info@concurrent.studio?Subject=Suggest%20An%20Addition%20📨">
            Suggest an Addition <span role="img" aria-label="incoming envelope">📨</span> →
          </a>
        </h3>
      </div>
    </div>
  )
}
