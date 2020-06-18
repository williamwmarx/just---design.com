import React from "react";
import Helmet from "react-helmet";
import "../css/main.css";

export default function Home() {
  return (
    <div style={{
      position: "absolute",
      textAlign: "center",
      width: "100vw",
      top: "50vh",
      transform: "translate(0%, -50%)"
    }}>
      <Helmet title="JUST DESIGN. 404." defer={false} />

      <h1 style={{fontSize: "3vw"}}>
        <span role="img" aria-label="exclamation mark">&#10071;</span><span role="img" aria-label="exclamation mark">&#10071;</span>&nbsp;<span role="img" aria-label="keycap digit four">4️⃣</span>&nbsp;<span role="img" aria-label="keycap digit four">0️⃣</span>&nbsp;<span role="img" aria-label="keycap digit four">4️⃣</span>&nbsp;<span role="img" aria-label="exclamation mark">&#10071;</span><span role="img" aria-label="exclamation mark">&#10071;</span><br/><br/>
        <span role="img" aria-label="confused face">😕</span> we couldn't find your page <span role="img" aria-label="confused face">😕</span><br/>
        <span role="img" aria-label="house">🏠</span> <a style={{color: "white"}} href="https://just---design.com">return home</a> <span role="img" aria-label="house">🏠</span>s<br/><br/>
        <span role="img" aria-label="exclamation mark">&#10071;</span><span role="img" aria-label="exclamation mark">&#10071;</span>&nbsp;<span role="img" aria-label="keycap digit four">4️⃣</span>&nbsp;<span role="img" aria-label="keycap digit four">0️⃣</span>&nbsp;<span role="img" aria-label="keycap digit four">4️⃣</span>&nbsp;<span role="img" aria-label="exclamation mark">&#10071;</span><span role="img" aria-label="exclamation mark">&#10071;</span><br/><br/>
      </h1>
    </div>
  )
}