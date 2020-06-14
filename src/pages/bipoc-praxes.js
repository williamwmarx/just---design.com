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
        <div className="cards">
          {BIPOC_praxes.bipoc_praxes.map((data, index) => {
            let link = <br/>
            if (data.contact[0]["email"] != null) {
              let contact_name = null;
              if (data.contact[0]["name"] != null) {
                contact_name = data.contact[0]["name"]
              } else {
                contact_name = data.contact[0]["email"]
              }
              link = <span><br/><a className="gradient-button PoppinsMedium" rel="noreferrer" target="_blank" href={data.contact[0]["email"]}>{contact_name} 📨 →</a><br/></span>
            }

            return (
              <Card key={`content_item_${index}`} className="bg-dark">
                <Card.Body>
                  <Card.Title className="PoppinsMedium">{data.studio_name}</Card.Title>
                  <Card.Subtitle>{data.type}</Card.Subtitle><br/>
                  <Card.Subtitle>{data.location}</Card.Subtitle>
                  <Card.Text>{data.summary}</Card.Text>
                  <Card.Text><a rel="noreferrer" target="_blank" href={data.summary_source_link}>Summary c/o {data.summary_source}</a></Card.Text>
                  <a className="gradient-button PoppinsMedium" rel="noreferrer" target="_blank" href={data.source_link}>Instagram →</a><br/>
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