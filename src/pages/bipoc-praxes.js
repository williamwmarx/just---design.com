import React from "react";
import Helmet from "react-helmet";
import Emoji from "../components/Emoji.js"
import BIPOC_praxes from "../../content/bipoc_praxes.json"
import "../css/main.css";
import JustDesignBIPOCPraxes from "../../static/images/just---bipoc-praxes.png"

export default function Home() {
  return (
    <div className="root">
      <Helmet title="JUST DESIGN. BIPOC PRAXES." defer={false} />

      <img className="just-design" src={ JustDesignBIPOCPraxes } alt="JUST DESIGN. BIPOC PRAXES."/>

      <div className="card-content">
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
            if (emoji_string !== "") {
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
                link = <span><a className="gradient-button card-text" href={`mailto:${url}?body=${contact_name},`}>{contact_name} <Emoji name="incoming envelope" emoji="📨"/> <span className="OCP">→</span></a><br/></span>
              } else {
                link = <span><a className="gradient-button card-text" rel="noreferrer" target="_blank" href={url}>{contact_name} <Emoji name="globe with meridians" emoji="🌐"/> <span className="OCP">→</span></a><br/></span>
              }
              ig_break = <br/>
            }

            return (
              <div key={`content_item_${index}`} className="card">
                <div className="card-bg">
                  <div className="card-header">
                    {/* <p className="card-subtitle-p">{emoji_html}</p> */}
                    <p className="card-title">{data.studio_name}</p>
                    <p className="card-subtitle-p">
                      {data.type.map((type, type_index) => {
                        let t = type;
                        if (type_index > 0) {
                          t = ", " + type
                        }
                        return(
                          <span>{t}</span>
                        );
                      })}
                    </p>
                    <p className="card-subtitle-p-2">
                      {data.location.map((location, location_index) => {
                        let loc = location;
                        if (location_index > 0) {
                          loc = ", " + location
                        }
                        return(
                          <span>{loc}</span>
                        );
                      })}
                    </p>
                  </div>
                  <div className="card-body">
                    <span>
                      {data.instagram.map((ig, ig_index) => {        
                        return (
                          <span className="card-text-p">
                            <a key={`ig_item_${ig_index}`} className="gradient-button card-text" rel="noreferrer" target="_blank" href={`https://instagram.com/${ig}`} style={{marginBottom: "0.5em"}}>
                              @{ig} 📸 <span className="OCP">→</span>
                            </a>
                            {ig_break}
                          </span>
                        );
                      })}
                    </span>
                    {link}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
