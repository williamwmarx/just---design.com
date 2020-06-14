import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Card } from 'react-bootstrap';
import Petitions from "../../content/petitions.json"
import "../css/main.css";

export default function Home() {
  return (
    <div className="root">
      <div className="just-design">
        <h1 className="pinkText">JUST DESIGN.</h1>
        <h2 className="gradientText">ONE CLICK ACTIVISM.</h2>
      </div>

      <div className="text-content">
        <p>
          Note: Do NOT donate to change.org– the money does not go to any causes, but rather the corporation itself.
        </p>
        <br/>
        <div className="cards">
          {Petitions.petitions.map((data, index) => {
            return (
              <Card key={`content_item_${index}`} className="bg-dark">
                <Card.Body>
                  <Card.Title className="PoppinsMedium">{data.title}</Card.Title>
                  <Card.Text>{data.summary}</Card.Text>
                  <a className="gradient-button PoppinsMedium" rel="noreferrer" target="_blank" href={data.source_link}>Sign this petition →</a><br />
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  )
}
