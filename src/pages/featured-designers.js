import React from "react";
import Helmet from "react-helmet";
import "../sass/main.sass";
import Title from "../components/Title";


export default function Home() {
  return (
    <div className="root">
      <Helmet title="JUST DESIGN. FEATURED DESIGNERS." defer={false} />

      <Title name="FEATURED DESIGNERS."/>

      <div className="text-content">
        <p>
          EVERY WEEK, A NEW DESIGNER. MORE SOON.
        </p>
      </div>
    </div>
  )
}
