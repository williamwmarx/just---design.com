import React from "react";
import { Helmet } from "react-helmet";
import { Apple_Touch_Icon } from "../../static/apple-touch-icon.png";
import 'bootstrap/dist/css/bootstrap.css';
import { Card } from 'react-bootstrap';
import BIPOC_praxes from "../../content/bipoc_praxes.json"
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
        <h2 className="gradientText">BIPOC PRAXES.</h2>
      </div>

      <div className="text-content">
        <p className="OCP">
          Key:&nbsp;
          <span><span className="idEmoji" role="img" aria-label="red circle">🔴&nbsp;</span>Black Owned</span>,&nbsp;
          <span><span className="idEmoji" role="img" aria-label="orange circle">🟠&nbsp;</span>Indigenous Owned</span>,&nbsp;
          <span><span className="idEmoji" role="img" aria-label="yellow circle">🟡&nbsp;</span>Women Owned</span>,&nbsp;
          <span><span className="idEmoji" role="img" aria-label="green circle">🟢&nbsp;</span>Non-Binary Owned</span>,&nbsp;
          <span><span className="idEmoji" role="img" aria-label="blue circle">🔵&nbsp;</span>Hiring</span>,&nbsp;
          <span><span className="idEmoji" role="img" aria-label="blue circle">🟣&nbsp;</span>Looking for Collaborators</span>,&nbsp;
        </p>
        <p>
          Please note: emoji colors have no meaning or correlation to their catagories. The order of these categories was inherited from the original document.<br/>
          Immense credit to <a rel="noreferrer" target="_blank" href="https://www.instagram.com/dongpingwong/">Dong-Ping Wong</a> &amp; Associates for the creation of this database on the <a rel="noreferrer" target="_blank" href="https://docs.google.com/spreadsheets/u/0/d/1ZiWjlfqc02OeWL4hTNZymVT_kyNnO42xG-hucO3rC0E/htmlview">BIPOC Studios Google Doc</a>.
        </p>
        
        <div className="cards">
          {BIPOC_praxes.bipoc_praxes.map((data, index) => {
            let emoji_html = null;
            let emoji_string = "";
            if (data.black_owned) {
              emoji_string += "<span class=\"idEmoji\" role=\"img\" aria-label=\"red circle\">🔴&nbsp;</span>"
            }
            if (data.indigenous_owned) {
              emoji_string += "<span class=\"idEmoji\" role=\"img\" aria-label=\"orange circle\">🟠&nbsp;</span>"
            }
            if (data.women_owned) {
              emoji_string += "<span class=\"idEmoji\" role=\"img\" aria-label=\"yellow circle\">🟡&nbsp;</span>"
            }
            if (data.non_binary_owned) {
              emoji_string += "<span class=\"idEmoji\" role=\"img\" aria-label=\"green circle\">🟢&nbsp;</span>"
            }
            if (data.hiring) {
              emoji_string += "<span class=\"idEmoji\" role=\"img\" aria-label=\"blue circle\">🔵&nbsp;</span>"
            }
            if (data.looking_for_collaborators) {
              emoji_string += "<span class=\"idEmoji\" role=\"img\" aria-label=\"blue circle\">🟣&nbsp;</span>"
            }
            if (emoji_string != "") {
              emoji_html = <div style={{paddingBottom: "0.5em"}} dangerouslySetInnerHTML={{__html: emoji_string}}></div>
            } else {
              emoji_html = <div style={{lineHeight: "185%"}}><br/></div>
            }

            let ig_break = null;
            
            let link = <br/>
            if (data.contact[0]["email"] != null) {
              let contact_name = null;
              if (data.contact[0]["name"] != null) {
                contact_name = data.contact[0]["name"]
              } else {
                contact_name = data["studio_name"]
              }
              let url = data.contact[0]["email"]
              if (url.includes("@")) {
                link = <span><a className="gradient-button PoppinsMedium" href={`mailto:${url}?body=${contact_name},`}>{contact_name} 📨 <span className="OCP">→</span></a><br/></span>
              } else {
                link = <span><a className="gradient-button PoppinsMedium" rel="noreferrer" target="_blank" href={url}>{contact_name} 🌐 <span className="OCP">→</span></a><br/></span>
              }
              ig_break = <br/>
            }

            return (
              <Card key={`content_item_${index}`} className="bg-dark">
                <Card.Body>
                  {emoji_html}
                  <Card.Title className="PoppinsMedium">{data.studio_name}</Card.Title>
                  <Card.Subtitle>
                    {data.type.map((type, type_index) => {
                      let t = type;
                      if (type_index > 0) {
                        t = " | " + type
                      }
                      return(
                        <span>{t}</span>
                      );
                    })}
                  </Card.Subtitle><br/>
                  <Card.Subtitle>
                    {data.location.map((location, location_index) => {
                      let loc = location;
                      if (location_index > 0) {
                        loc = " | " + location
                      }
                      return(
                        <span> {loc}</span>
                      );
                    })}
                  </Card.Subtitle>
                  <Card.Text>{data.summary}</Card.Text>
                  <span>
                    {data.instagram.map((ig, ig_index) => {
                      let spacing = null;
                      if (ig_index > 0) {
                        spacing = <br/>
                      }
                      return (
                        <span>
                          <a key={`ig_item_${ig_index}`} className="gradient-button PoppinsMedium" rel="noreferrer" target="_blank" href={`https://instagram.com/${ig}`} style={{marginBottom: "0.5em"}}>
                            @{ig} 📸 <span className="OCP">→</span>
                          </a>
                          {ig_break}
                        </span>
                      );
                    })}
                  </span>
                  {link}
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  )
}
