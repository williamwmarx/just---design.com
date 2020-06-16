import React from "react";
import "../css/main.css"
import JustDesignFD from "../../static/images/just---featured-designers.png"

export default function Home() {
  return (
    <div className="root">
      <img id="just-fd" src={ JustDesignFD } alt="JUST DESIGN. FEATURED DESIGNERS."/>

      <div className="text-content">
        <p>
          EVERY DAY, A NEW DESIGNER. MORE SOON.
        </p>
      </div>
    </div>
  )
}
