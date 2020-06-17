import React from "react";
import Emoji from "../components/Emoji.js"
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
          <span><Emoji name="balance scale" emoji="⚖️"/>&nbsp;Justice</span>,&nbsp;
          <span><Emoji name="fountain pen" emoji="🖋"/>&nbsp;Legislation</span>
        </p>
        <p>
          Note: Please do NOT donate to change.org– the money does not go to any causes, but rather the corporation itself.
        </p>
        <br/>
        <div className="cards">
          {Petitions.petitions.map((data, index) => {
            let emoji_html = null;
            if (data.tag === "Justice") {
              emoji_html = <a><Emoji name="balance scale" emoji="⚖️"/></a>
            }
            if (data.tag === "Legislation") {
              emoji_html = <a><Emoji name="fountain pen" emoji="🖋"/></a>
            }
            return (
              <div key={`content_item_${index}`} className="card">
                  <div className="card-bg">
                    <div className="card-header">
                      <p className="card-subtitle-p" style={{marginBottom: "0.75em"}}>{emoji_html}</p>
                      <p className="card-title">{data.title}</p>
                    </div>
                    <div className="card-body">
                      <p className="card-text">{data.summary}</p>
                      <a className="gradient-button card-text" rel="noreferrer" target="_blank" href={data.source_link}>Sign this petition <Emoji name="writing hand" emoji="✍️"/> <span className="OCP">→</span></a><br />
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
