import React from "react";
import Emoji from "../components/Emoji.js"
import "../css/main.css";
import Readings from "../../content/readings.json"
import JustDesignReadings from "../../static/images/just---readings.png"

export default function Home() {
  return (
    <div className="root">
      <img className="just-design" src={ JustDesignReadings } alt="JUST DESIGN. READINGS."/>

      <div className="card-content">
        <div className="cards">
          {Readings.readings.map((data, index) => {
            return (
              <div key={`content_item_${index}`} className="card">
                <p className="card-title">{data.title}</p>
                <p className="card-subtitle-p">
                  by&nbsp;
                  {data.authors.map((author, a_index) => {
                    if (a_index == 0) {
                      return (
                        <a key={`author_item_${a_index}`} className="card-subtitle-a" rel="noreferrer" target="_blank" href={author.link} style={{color: "#6c757d !important"}}>{author.name}</a>                        
                      );
                    } else if (a_index > 0) {
                      return (
                        <span>&nbsp;and&nbsp;<a key={`author_item_${a_index}`} className="card-subtitle-a" rel="noreferrer" target="_blank" href={author.link}>{author.name}</a></span>                  
                      );
                    }
                  })}
                </p>
                <p>{data.summary}</p>
                <p><a rel="noreferrer" target="_blank" href={data.summary_source_link}>summary c/o {data.summary_source}</a></p>
                <a className="gradient-button PoppinsMedium" rel="noreferrer" target="_blank" href={data.source_link}>Read this text <Emoji name="books" emoji="📚"/> <span className="OCP">→</span></a><br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
