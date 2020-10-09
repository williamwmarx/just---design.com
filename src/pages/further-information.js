/* Import React */
import React from "react";

/* Import Components */
import Link from "../components/Link.js";
import Root from "../components/Root.js";

/* Import Styles */
import "../sass/main.scss";

export default function FurtherInformation() {
  return (
    <Root page="Further Information.">
      <p>
        Although our mission is stated on our home page, it is important to reiterate this message.
      </p>

      <q className="block">
        For far too long, the worlds of architecture and design have been a plutocracy
        intent on social atomization and oppression of the Other. This website is intended 
        as an evolving, community-run, open access resource for the democratization of 
        knowledge surrounding architecture, design and any tangential fields.
      </q>

      <p>
        All choices made surrounding this site should — and will — be made according to this
        principle. As stated, this is meant to be a community effort. While not one of us alone
        is capable of healing the systemic racism, sexism, homophobia, transphobia, and general 
        bigotry both extant within and created by architecture, design and tangetial fields, together,
        with effort, we can create change. If there is any additional function this site can take on 
        to accelerate our communal progress towards this goal,&nbsp;
        <Link href="mailto:hello@just---design.com">please let us know</Link>. Otherwise, if you&apos;d 
        like to help us with the maintenance and development of this site, we&apos;d love that too.
      </p>

      <p>
        We strive for complete transparency. 
        See the <Link href="../acknowledgments" new_tab={false}>acknowledgments</Link> page 
        for a list of both sources and thank you&apos;s.
      </p>

      <p>
        If you would like to help with this project, please send an email to&nbsp;
        <Link href="mailto:wearejustdesign@gmail.com?subject=I%20want%20to%20get%20involved!!%20🚨✨">
          wearejustdesign@gmail.com
        </Link>.
      </p>

      <p>
        Finally, if you&apos;d like to share this site, visit the&nbsp;
        <Link href="../social-media" new_tab={false}>social media page</Link> for some pre-made graphics.
      </p>
    </Root>
  )
}
