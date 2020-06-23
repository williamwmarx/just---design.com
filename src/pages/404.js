/* Import React */
import React from "react";
/* Import Components */
import Emoji from "../components/Emoji";
import Head from "../components/Head";
import Title from "../components/Title";
/* Import Styles */
import "../sass/main.sass";

export default function Home() {
  return (
    <div style={{
      position: "absolute",
      textAlign: "center",
      width: "100vw",
      top: "50vh",
      transform: "translate(0%, -50%)"
    }}>
      <Head title="JUST DESIGN. 404."/>
      <Title name="ERROR 404."/>
      <h3 style={{fontSize: "2em"}}>
        <a href="https://just---design.com">
          Return Home <Emoji name="house" emoji="🏠"/> →
        </a>
      </h3>
    </div>
  )
}