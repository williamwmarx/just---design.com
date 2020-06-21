/* Import React */
import React from "react";
/* Import Components */
import Head from "../components/Head";
import Title from "../components/Title";
/* Import Styles */
import "../sass/main.sass";

export default function Mission() {
  return (
    <div className="root">
      <Head title="JUST DESIGN. MISSION."/>

      <Title name="MISSION."/>
      <br/>
      <div className="text-content">
        <p>
          Our systems have been designed for injustice, 
          funded by fear &amp; apathy 
          and destructive to both humanity and our planet.
        </p>
        <p>
          For too long, non-designers have &ldquo;reformed&rdquo; these systems no no avail.
          Now, we, the designers of the world, must unite to rebuild all injust systems from the ground up.
        </p>
        <p>
          Currently, one of the largest barriers to progress in this area is our education system, which in reality, is essentially an indoctrination system.
          This site serves as the first step in bridging this gap, centralizing a myriad of resources for just design. 
        </p>
        <p>
          We strive for complete transparency. 
          See the <a href="../acknowledgments">acknowledgments</a> page for a list of both sources and thank yous.
          See the <a href="../requests">requests</a> page for an up-to-date list of sources requested and whether or not they were approved. 
          Factual accuracy and pertinence to just design are the only criteria needed for approval.
        </p>
        <p>
          If you'd like to share this site, visit the <a href="../social-media">social media</a> page for some pre-made graphics.
        </p>
      </div>
    </div>
  )
}
