import React from "react";
import { Helmet } from "react-helmet";
import { Apple_Touch_Icon } from "../../static/apple-touch-icon.png";
import 'bootstrap/dist/css/bootstrap.css';
import { Card } from 'react-bootstrap';
import Petitions from "../../content/petitions.json"
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
        <h2 className="gradientText">ONE CLICK ACTIVISM.</h2>
      </div>

      <div className="text-content">
        <p className="OCP">
          Key:&nbsp;
          <span><span className="idEmoji" role="img" aria-label="balance scale">⚖️&nbsp;</span>Justice</span>,&nbsp;
          <span><span className="idEmoji" role="img" aria-label="fountain pen">🖋&nbsp;</span>Legislation</span>
        </p>
        <p>
          Note: Please do NOT donate to change.org– the money does not go to any causes, but rather the corporation itself.
        </p>
        <br/>
        <div className="cards">
          {Petitions.petitions.map((data, index) => {
            let emoji_html = null;
            let emoji_string = "";
            if (data.tag == "Justice") {
              emoji_string += "<span class=\"idEmoji\" role=\"img\" aria-label=\"balance scale\">⚖️&nbsp;</span>"
            }
            if (data.tag == "Legislation") {
              emoji_string += "<span class=\"idEmoji\" role=\"img\" aria-label=\"fountain pen\">🖋&nbsp;</span>"
            }
            if (emoji_string != "") {
              emoji_html = <div style={{paddingBottom: "0.5em"}} dangerouslySetInnerHTML={{__html: emoji_string}}></div>
            } else {
              emoji_html = <div style={{lineHeight: "185%"}}><br/></div>
            }
            return (
              <Card key={`content_item_${index}`} className="bg-dark">
                <Card.Body>
                  {emoji_html}
                  <Card.Title className="PoppinsMedium">{data.title}</Card.Title>
                  <Card.Text>{data.summary}</Card.Text>
                  <a className="gradient-button PoppinsMedium" rel="noreferrer" target="_blank" href={data.source_link}>Sign this petition ✍️ <span className="OCP">→</span></a><br />
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  )
}
