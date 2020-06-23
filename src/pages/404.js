/* Import React */
import React from "react";
/* Import Components */
import Emoji from "../components/Emoji";
import Head from "../components/Head";
import Link from "../components/Link";
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
      <br/><br/>
      <span style={{fontFamily: "OfficeCodeProDMedium", fontSize: "2em"}}>
        <Link href="https://just---design.com">
          Return Home <Emoji name="house" emoji="🏠"/> →
        </Link>
      </span>
    </div>
  )
}