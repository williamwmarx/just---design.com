import React from "react";
import { Helmet } from "react-helmet";
import { Apple_Touch_Icon } from "../../static/apple-touch-icon.png";
import "../css/main.css"

export default function Home() {
  return (
    <div className="root">
      <Helmet>
        {/* META TAGS */}
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="description" content="Just Design. That's All It Takes."/>
        <meta name="robots" content="index,follow"/>
        <meta name="googlebot" content="index,follow"/>
        <meta name="google" content="nositelinkssearchbox"/>
        <meta name="google" content="notranslate"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>

        {/* FACEBOOK OPEN GRAPH */}
        <meta property="og:url" content="https://just---design.com"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="Just Design. That's All It Takes."/>
        {/* <meta property="og:image" content=""/> */}
        <meta property="og:image:alt" content="Just Design. That's All It Takes."/>
        <meta property="og:description" content="Just Design. That's All It Takes."/>
        <meta property="og:site_name" content="https://just---design.com"/>
        <meta property="og:locale" content="en_US"></meta>

        {/* TWITTER CARD */}
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:url" content="https://just---design.com"/>
        <meta name="twitter:title" content="Just Design. That's All It Takes."/>
        <meta name="twitter:description" content="Just Design. That's All It Takes."/>
        {/* <meta name="twitter:image" content=""/> */}
        <meta name="twitter:image:alt" content="Just Design. That's All It Takes."/>

        {/* SCHEMA */}
        {`<script type="application/ld+json">
            {
                "@context": "http://schema.org",
                "@id": "https://just---design.com",
                "@type": "WebPage",
                "url": "https://just---design.com",
                "name": "Just Design. That's All It Takes."
            }
        </script>
        <script type="application/ld+json">
            {
                "@context": "http://schema.org",
                "@id": "https://just---design.com",
                "@type": "WebSite",
                "url": "https://just---design.com",
                "name": "Just Design. That's All It Takes."
            }
        </script>`}

        {/* Global site tag (gtag.js) - Google Analytics */}
        {`<script async src="https://www.googletagmanager.com/gtag/js?id=UA-169387993-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-169387993-1');
        </script>`}

        {/* TITLE, STYLES, FAVICON */}
        <title>Just Design. That's All It Takes.</title>
        <link rel="apple-touch-icon" href={Apple_Touch_Icon}/>
      </Helmet>

      <div className="just-design">
        <h1>JUST DESIGN.</h1>
        <h2>THAT&rsquo;S ALL IT TAKES.</h2>
      </div>

      <div id="links">
        {/* MISSION */}
        <h3>
          <a id="mission-nav" className="OCP" href="mission">
            Mission <span role="img" aria-label="speech bubble">💬</span> →
          </a>
        </h3>

        {/* READINGS */}
        <h3>
          <a id="readings-nav" className="OCP" href="readings">
            Readings <span role="img" aria-label="open book">📖</span> →
          </a>
        </h3>

        {/* FILMS */}
        <h3>
          <a id="films-nav" className="OCP" href="films">
            Films <span role="img" aria-label="clapper board">🎬</span> →
          </a>
        </h3>

        {/* BIPOC PRAXES */}
        <h3>
          <a id="bipoc-praxes-nav" className="OCP" href="bipoc-praxes">
            BIPOC Praxes <span role="img" aria-label="triangular ruler">📐</span> →
          </a>
        </h3>

        {/* ONE CLICK ACTIVISM */}
        <h3>
          <a id="one-click-activism-nav" className="OCP" href="one-click-activism">
            One Click Activism <span role="img" aria-label="police car light">🚨</span> →
          </a>
        </h3>

        {/* Featured Designers */}
        <h3>
          <a id="featured-designers-nav" className="OCP" href="featured-designers">
            Featured Designers <span role="img" aria-label="bust in silhouette">👤</span> →
          </a>
        </h3>

        {/* Acknowledgments */}
        <h3>
          <a id="acknowledgments-nav" className="OCP" href="acknowledgments">
            Acknowledgments <span role="img" aria-label="folded hands">🙏</span> →
          </a>
        </h3>

        {/* Suggest an Addition */}
        <h3>
          <a id="suggest-an-addition-nav" className="OCP" href="mailto:marx@concurrent.studio?Subject=Suggest%20An%20Addition%20📨">
            Suggest an Addition <span role="img" aria-label="incoming envelope">📨</span> →
          </a>
        </h3>
      </div>
    </div>
  )
}
