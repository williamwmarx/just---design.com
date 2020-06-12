import React from "react";
import '../css/index.css';
import just_design_gradient from "../images/just_design_gradient.png";

export default function Home() {
  return (
    <div id="index">
      <div id="just-design">
        <h1>JUST DESIGN.</h1>
        <h2>THAT&rsquo;S ALL IT TAKES.</h2>
      </div>

      <div id="links">
        <h3><a id="mission" href="mission">Mission 💬 →</a></h3>
        <h3><a id="readings" href="readings">Readings 📖 →</a></h3>
        <h3><a id="films" href="films">Films 🎬 →</a></h3>
        <h3><a id="bipoc-studios" href="bipoc-studios">BIPOC Studios 📐 →</a></h3>
        <h3><a id="one-click-activism" href="one-click-activism">One Click Activism 🚨 →</a></h3>
        <h3><a id="featured-designer" href="featured-designer">Featured Designer 👤 →</a></h3>
        <h3><a id="acknowledgments" href="acknowledgments">Acknowledgments 🙏 →</a></h3>
        <h3><a id="suggest-an-addition" href="mailto:info@concurrent.studio?Subject=Suggest%20An%20Addition%20📨">Suggest an Addition 📨 →</a></h3> 
      </div>
    </div>
  )
}
