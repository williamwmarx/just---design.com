import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Card } from 'react-bootstrap';
import BIPOC_praxes from "../../content/bipoc_praxes.json"
import "../css/main.css";

export default function Home() {
  return (
    <div className="root">
      <div className="just-design">
        <h1 className="pinkText">JUST DESIGN.</h1>
        <h2 className="gradientText">BIPOC PRAXES.</h2>
      </div>

      <div className="text-content">
        <p className="OCP">
          Key:&nbsp;
          <span><span className="idEmoji" role="img" aria-label="red circle">🔴</span>Black Owned</span>,&nbsp;
          <span><span className="idEmoji" role="img" aria-label="orange circle">🟠</span>Indigenous Owned</span>,&nbsp;
          <span><span className="idEmoji" role="img" aria-label="yellow circle">🟡</span>Women Owned</span>,&nbsp;
          <span><span className="idEmoji" role="img" aria-label="green circle">🟢</span>Non-Binary Owned</span>,&nbsp;
          <span><span className="idEmoji" role="img" aria-label="blue circle">🔵</span>Hiring</span>,&nbsp;
          <span><span className="idEmoji" role="img" aria-label="blue circle">🟣</span>Looking for Collaborators</span>,&nbsp;
          <span><span className="idEmoji" role="img" aria-label="construction">🚧</span>Taken from BIPOC Studios Doc</span>
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
              emoji_string += "<span class=\"idEmoji\" role=\"img\" aria-label=\"red circle\">🔴</span>"
            }
            if (data.indigenous_owned) {
              emoji_string += "<span class=\"idEmoji\" role=\"img\" aria-label=\"orange circle\">🟠</span>"
            }
            if (data.women_owned) {
              emoji_string += "<span class=\"idEmoji\" role=\"img\" aria-label=\"yellow circle\">🟡</span>"
            }
            if (data.non_binary_owned) {
              emoji_string += "<span class=\"idEmoji\" role=\"img\" aria-label=\"green circle\">🟢</span>"
            }
            if (data.hiring) {
              emoji_string += "<span class=\"idEmoji\" role=\"img\" aria-label=\"blue circle\">🔵</span>"
            }
            if (data.looking_for_collaborators) {
              emoji_string += "<span class=\"idEmoji\" role=\"img\" aria-label=\"blue circle\">🟣</span>"
            }
            if (data.taken_from == "BIPOC Studios c/o Dong-Ping Wong") {
              emoji_string += "<span class=\"idEmoji\" role=\"img\" aria-label=\"white circle\">🚧</span>"
            }
            if (emoji_string != "") {
              emoji_html = <div style={{paddingBottom: "0.5em"}} dangerouslySetInnerHTML={{__html: emoji_string}}></div>
            }
            
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
                link = <span><a className="gradient-button PoppinsMedium" href={`mailto:${url}`}>{contact_name} 📨 <span className="OCP">→</span></a><br/></span>
              } else {
                link = <span><a className="gradient-button PoppinsMedium" rel="noreferrer" target="_blank" href={url}>{contact_name} 🌐 <span className="OCP">→</span></a><br/></span>
              }
              
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
                        <span>{loc}</span>
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
                          <br/>
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
