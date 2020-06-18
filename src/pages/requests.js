import React from "react";
import Helmet from "react-helmet";
import "../css/main.css"

export default function Home() {
  return (
    <div className="root">
      <Helmet title="JUST DESIGN. REQUESTS." defer={false} />

      <div className="just-design">
        <h1 className="pinkText">JUST DESIGN.</h1>
        <h2 className="gradientText">REQUESTS.</h2>
      </div>

      <div className="text-content">
        <p>
          No requested content yet....
        </p>
      </div>
    </div>
  )
}
