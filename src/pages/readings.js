import React from "react";
import Helmet from "react-helmet";
import Emoji from "../components/Emoji.js"
import Title from "../components/Title.js"
import "../sass/main.sass";
import ReadingsData from "../../content/readings.json"

export default class Readings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 500000
    };
  }
  
  get_cards_height() {
    let total_height = 0; 
    let average_height = 0; 
    let max_height = 0;
    let cards = document.getElementsByClassName("card")
    for (let i = 0; i < cards.length; i++) {
      let card_height = cards[i].offsetHeight+parseInt(20)
      total_height += card_height;
      if (card_height > max_height) {
        max_height = card_height;
      }
    }
    if (window.innerWidth < 1100) {
      average_height = total_height/2;
    } else {
      average_height = total_height/3;
    }
    return Math.ceil(average_height + max_height);
  }

  componentDidMount() {
    this.setState({
      height: this.get_cards_height()
    })
  }

  render() {
    return (
      <div className="root">
        <Helmet title="JUST DESIGN. READINGS." defer={false} />

        <Title name="READINGS."/>

        <div className="card-content">
          <div className="cards" style={{height: this.state.height}}>
            {ReadingsData.readings.map((data, index) => {
              let summary = null;

              if (data.summary != null) {
                if (data.summary_source != null) {
                  summary = <p className="card-text">{data.summary}<span className="card-text"><a className="card-text-a" rel="noreferrer" target="_blank" href={data.summary_source_link}><br/>Summary c/o {data.summary_source}</a></span></p>
                } else {
                  summary = <p className="card-text">{data.summary}</p>
                }
              }

              return (
                <div key={`content_item_${index}`} className="card">
                  <div className="card-bg">
                    <div className="card-header">
                      <p className="card-title">{data.title}</p>
                      <p className="card-subtitle-p">
                        {data.authors.map((author, a_index) => {
                          let author_name = "";
                          if (a_index === 0) {
                              author_name = <a key={`author_item_${a_index}`} className="card-subtitle-a" rel="noreferrer" target="_blank" href={author.link} style={{color: "#6c757d !important"}}>{author.name}</a>                        
                          } else if (a_index > 0) {
                            author_name = <span>&nbsp;and&nbsp;<a key={`author_item_${a_index}`} className="card-subtitle-a" rel="noreferrer" target="_blank" href={author.link}>{author.name}</a></span>                  
                          }
                          return author_name;
                        })}
                      </p>
                    </div>
                    <div className="card-body">
                      {summary}
                      <a className="gradient-button card-text" rel="noreferrer" target="_blank" href={data.source_link}>Read this text <Emoji name="books" emoji="📚"/> <span className="OCP">→</span></a><br />
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
}
