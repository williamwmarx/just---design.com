import React from "react";
import Petitions from "../../content/petitions.json"
import "../css/main.css";
import JustDesignOCA from "../../static/images/just---one-click-activism.png"

export default function Home() {
  return (
    <div className="root">
      <img id="just-oca" src={ JustDesignOCA } alt="JUST DESIGN. ONE CLICK ACTIVISM."/>

      <div className="card-content">
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
              <div key={`content_item_${index}`} className="card">
                {emoji_html}
                <p className="card-title">{data.title}</p>
                <p>{data.summary}</p>
                <a className="gradient-button PoppinsMedium" rel="noreferrer" target="_blank" href={data.source_link}>Sign this petition ✍️ <span className="OCP">→</span></a><br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
