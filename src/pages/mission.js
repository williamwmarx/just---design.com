/* Import React */
import React from "react";
/* Import Components */
import Link from "../components/Link.js";
import TextContent from "../components/TextContent.js";
/* Import Styles */
import "../sass/main.sass";
import "../sass/textcontent.component.sass";

export default function Mission() {
  return (
    <TextContent title="MISSION.">
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
        See the <Link href="../acknowledgments" new_tab={false}>acknowledgments</Link> page for a list of both sources and thank yous.
        See the <Link href="../requests" new_tab={false}>requests</Link> page for an up-to-date list of sources requested and whether or not they were approved. 
        Factual accuracy and pertinence to just design are the only criteria needed for approval.
      </p>
      <p>
        If you'd like to share this site, visit the <Link href="../social-media" new_tab={false}>social media</Link> page for some pre-made graphics.
      </p>
    </TextContent>
  )
}
