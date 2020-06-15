import React from "react";
import { Helmet } from "react-helmet";
import { Apple_Touch_Icon } from "../../static/apple-touch-icon.png";
import "../css/main.css";

export default function Home() {
  return (
    <div style={{
      position: "absolute",
      textAlign: "center",
      width: "100vw",
      top: "50vh",
      transform: "translate(0%, -50%)"
    }}>
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
      <h1 style={{fontSize: "3vw"}}>
        <span role="img" aria-label="exclamation mark">&#10071;</span><span role="img" aria-label="exclamation mark">&#10071;</span>&nbsp;<span role="img" aria-label="keycap digit four">4️⃣</span>&nbsp;<span role="img" aria-label="keycap digit four">0️⃣</span>&nbsp;<span role="img" aria-label="keycap digit four">4️⃣</span>&nbsp;<span role="img" aria-label="exclamation mark">&#10071;</span><span role="img" aria-label="exclamation mark">&#10071;</span><br/><br/>
        <span role="img" aria-label="confused face">😕</span> we couldn't find your page <span role="img" aria-label="confused face">😕</span><br/>
        <span role="img" aria-label="house">🏠</span> <a style={{color: "white"}} href="https://just---design.com">return home</a> <span role="img" aria-label="house">🏠</span>s<br/><br/>
        <span role="img" aria-label="exclamation mark">&#10071;</span><span role="img" aria-label="exclamation mark">&#10071;</span>&nbsp;<span role="img" aria-label="keycap digit four">4️⃣</span>&nbsp;<span role="img" aria-label="keycap digit four">0️⃣</span>&nbsp;<span role="img" aria-label="keycap digit four">4️⃣</span>&nbsp;<span role="img" aria-label="exclamation mark">&#10071;</span><span role="img" aria-label="exclamation mark">&#10071;</span><br/><br/>
      </h1>
    </div>
  )
}