import React from "react";
import { Helmet } from "react-helmet";
import { Apple_Touch_Icon } from "../../static/apple-touch-icon.png";
import "../css/main.css";

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
        <h1 className="pinkText">JUST DESIGN.</h1>
        <h2 className="gradientText">ACKNOWLEDGMENTS.</h2>
      </div>
        
      <div className="text-content">
        <h3>Graphic Design Elements</h3>
          <p>Typefaces:</p>
          <ul>
            <li><a rel="noreferrer" target="_blank" href="https://www.vocaltype.co/history-of/the-neue-black">The Neue Black</a> c/o <a rel="noreferrer" target="_blank" href="https://www.vocaltype.co/">Vocal Type</a></li>
            <li><a rel="noreferrer" target="_blank" href="https://github.com/nathco/Office-Code-Pro">Office Code Pro D</a> c/o <a rel="noreferrer" target="_blank" href="https://nath.co/">Nathan Rutzky</a></li>
            <li><a rel="noreferrer" target="_blank" href="https://github.com/itfoundry/Poppins">Poppins</a> c/o <a rel="noreferrer" target="_blank" href="https://www.indiantypefoundry.com/">Indian Type Foundry</a></li>
          </ul>
          <p>Color Scheme:</p>
          <ul>
            <li>Background: </li>
            <li>HEX: #111111, RGB: (17, 17, 17), CMYK: (0%, 0%, 0%, 93%)</li>
            <li>Gradient:</li>
            <li>HEX: #63b1df, #9497c7, #ef519d</li>
            <li>RGB: (99, 177, 223), (148, 151, 199), (239, 81, 157)</li>
            <li>Gradient Color 1 Origin: <a rel="noreferrer" target="_blank" href="https://www.penguinrandomhouse.com/books/612188/this-is-what-i-know-about-art-by-kimberly-drew-illustrated-by-ashley-lukashevsky/">&ldquo;This Is What I Know About Art&rdquo;</a> Cover c/o <a rel="noreferrer" target="_blank" href="https://www.instagram.com/museummammy">Kimberly Drew</a></li>
            <li>Gradient Color 2 Origin: <a rel="noreferrer" target="_blank" href="https://www.instagram.com/p/B6niRV0JE4S/">One Drop Can Make a Rainbow</a> c/o <a rel="noreferrer" target="_blank" href="https://www.instagram.com/alaska___alaska/">Alaska-Alaska</a></li>
            <li>Gradient Color 3 Origin: <a rel="noreferrer" target="_blank" href="https://www.instagram.com/p/BknjgrFg0Cj/">Seriously Fun Light Study</a> c/o <a rel="noreferrer" target="_blank" href="http://oanas.net/">Oana Stănescu</a> and <a rel="noreferrer" target="_blank" href="http://akanemoriyama.com/">Akane Moriyama</a></li>
          </ul>
      </div>
    </div>
  )
}
