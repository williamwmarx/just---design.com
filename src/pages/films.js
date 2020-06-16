import React from "react";
import Films from "../../content/films.json"
import "../css/main.css";
import JustDesignFilms from "../../static/images/just---films.png"

export default function Home() {
  return (
    <div className="root">
      <img className="just-design" src={ JustDesignFilms } alt="JUST DESIGN. FILMS."/>

      <div className="card-content">
        <div className="cards">
          {Films.films.map((data, index) => {
            let source = null;
            if (data.summary_source != null) {
              source = <span className="card-text"><a className="card-text-a" rel="noreferrer" target="_blank" href={data.summary_source_link}><br/>Summary c/o {data.summary_source}</a></span>
            }

            return (
              <div key={`content_item_${index}`} className="card">
                <div className="card-bg">
                  <div className="card-header">
                    <p className="card-title">{data.title}</p>
                    <p className="card-subtitle-p">
                      {data.creators.map((creators, c_index) => {
                        let creator = ""
                        if (c_index === 0) {
                            creator = <a key={`creator_item_${c_index}`} className="card-subtitle-a" rel="noreferrer" target="_blank" href={creators.link} style={{color: "#6c757d !important"}}>{creators.name}</a>                        
                        } else if (c_index > 0) {
                            creator = <span>&nbsp;and&nbsp;<a key={`creator_item_${c_index}`} className="card-subtitle-a" rel="noreferrer" target="_blank" href={creators.link}>{creators.name}</a></span>                  
                        }
                        return creator;
                      })}
                    </p>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{data.summary}{source}</p>
                    <a className="gradient-button card-text" rel="noreferrer" target="_blank" href={data.source_link}>View this film 🎞 <span className="OCP">→</span></a><br />
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