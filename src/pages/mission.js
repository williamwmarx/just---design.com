import React from "react";
import "../css/main.css"

export default function Home() {
  return (
    <div className="root">
      <div className="just-design">
        <h1 className="pinkText">JUST DESIGN.</h1>
        <h2 className="gradientText">OUR MISSION.</h2>
      </div>

      <div className="text-content">
        <p>
          Our systems have been designed for injustice, 
          funded by fear + apathy 
          and destructive for both humanity and our planet.
        </p>
        <p>
          For too long, non-designers have &ldquo;reformed&rdquo; these systems no no avail.
          Now, we, the designers of the world, must unite to rebuild all injust systems from the ground up.
        </p>
        <p>
          We strive for complete transparency. 
          See the <a href="acknowledgments">acknowledgments</a> page for a list of both sources and thank yous.
          See the <a href="requests">requests</a> page for an up-to-date list of sources requested and whether or not they were approved. 
          Factual accuracy and pertinence to just design are the only criteria needed for approval.
        </p>
        <p>
          If you'd like to share this site, visit the <a href="social-media">social media</a> page for some pre-made graphics.
        </p>
      </div>
    </div>
  )
}
