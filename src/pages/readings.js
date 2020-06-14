import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Card } from 'react-bootstrap';
import Readings from "../../content/readings.json"
import "../css/main.css";

export default function Home() {
  return (
    <div className="root">
      <div className="just-design">
        <h1 className="pinkText">JUST DESIGN.</h1>
        <h2 className="gradientText">READINGS.</h2>
      </div>

      <div className="text-content">
        <div className="cards">
          {Readings.readings.map((data, index) => {
            return (
              <Card key={`content_item_${index}`} className="bg-dark">
                <Card.Body>
                  <Card.Title className="PoppinsMedium">{data.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {data.authors.map((author, a_index) => {
                      if (a_index == 0) {
                        return (
                          <a key={`author_item_${a_index}`} rel="noreferrer" target="_blank" href={author.link} style={{color: "#6c757d !important"}}>{author.name}</a>                        
                        );
                      } else if (a_index > 0) {
                        return (
                          <span>&nbsp;and&nbsp;<a key={`author_item_${a_index}`} rel="noreferrer" target="_blank" href={author.link}>{author.name}</a></span>                  
                        );
                      }
                      
                    })}
                  </Card.Subtitle>
                  <Card.Text>{data.summary}</Card.Text>
                  <Card.Text><a rel="noreferrer" target="_blank" href={data.summary_source_link}>Summary c/o {data.summary_source}</a></Card.Text>
                  <a className="gradient-button PoppinsMedium" rel="noreferrer" target="_blank" href={data.source_link}>Read this text →</a><br />
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  )
}

// "title": "The BlackSpace Manifesto",
// "source_link": "https://www.blackspace.org/manifesto",
// "authors": [{
//   "name": "BlackSpace",
//   "link": "https://www.blackspace.org/about-blackspace"
// }],
// "summary": "An essential manifesto. Each point should be carefully considered and integrated into all future projects.",
// "summary_source": "Self",
// "summary_source_url": null,
// "taken_from": "Anti-racism Design Resources",
// "taken_from_link": "https://docs.google.com/document/d/e/2PACX-1vRkuF9o4WDiRW8v2nAPfJRttbZty5MADnFCt38PC4JPbqWMr4VrT307fzz5uAcYupTaWVwTrz-N8pUb/pub",
// "tag": "Manifesto"