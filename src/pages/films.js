import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Card } from 'react-bootstrap';
import Films from "../../content/films.json"
import "../css/main.css";

export default function Home() {
  return (
    <div className="root">
      <div className="just-design">
        <h1 className="pinkText">JUST DESIGN.</h1>
        <h2 className="gradientText">FILMS.</h2>
      </div>

      <div className="text-content">
        <div className="cards">
          {Films.films.map((data, index) => {
            return (
              <Card key={`content_item_${index}`} className="bg-dark">
                <Card.Body>
                  <Card.Title className="PoppinsMedium">{data.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {data.creators.map((creators, c_index) => {
                      if (c_index == 0) {
                        return (
                          <a key={`creator_item_${c_index}`} rel="noreferrer" target="_blank" href={creators.link} style={{color: "#6c757d !important"}}>{creators.name}</a>                        
                        );
                      } else if (c_index > 0) {
                        return (
                          <span>&nbsp;and&nbsp;<a key={`creator_item_${c_index}`} rel="noreferrer" target="_blank" href={creators.link}>{creators.name}</a></span>                  
                        );
                      }
                      
                    })}
                  </Card.Subtitle>
                  <Card.Text>{data.summary}</Card.Text>
                  <Card.Text><a rel="noreferrer" target="_blank" href={data.summary_source_link}>Summary c/o {data.summary_source}</a></Card.Text>
                  <a className="gradient-button PoppinsMedium" rel="noreferrer" target="_blank" href={data.source_link}>View this film 🎞 <span className="OCP">→</span></a><br />
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  )
}