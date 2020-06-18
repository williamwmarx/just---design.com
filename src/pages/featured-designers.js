import React from "react";
import Helmet from "react-helmet";
import "../css/main.css"
import JustDesignFD from "../../static/images/just---featured-designers.png"

export default function Home() {
  return (
    <div className="root">
      <Helmet title="JUST DESIGN. FEATURED DESIGNERS." defer={false} />

      <img id="just-fd" src={ JustDesignFD } alt="JUST DESIGN. FEATURED DESIGNERS."/>

      <div className="text-content">
        <p>
          EVERY WEEK, A NEW DESIGNER. MORE SOON.
        </p>
      </div>
    </div>
  )
}
