/* Import React */
import React from "react";
/* Import Components */
import Emoji from "../components/Emoji.js";
import Link from "../components/Link.js";
import TextContent from "../components/TextContent.js";
/* Import Styles */
import "../sass/main.sass";
/* Import Data */
import AcknowledgmentsData from "../../static/json/acknowledgments.json"

export default function Acknowledgments() {
  return (
    <TextContent title="Acknowledgments.">        
      {/* GENERAL CREDITS */}
      <p style={{fontSize: "110%"}}>
        This site is intended to be as transparent as possible. As such, all sources used to build it are listed below.
        If you are interested in the source code for the site itself, that can be found on <Link href="https://github.com/concurrent-studio/just---design.com">GitHub</Link>.  
      </p>

      {/* GRAPHIC DESIGN ELEMENTS CREDITS */}
      <TextContent.Section>Graphic Design Elements</TextContent.Section>
        {/* TYPEFACE CREDITS */}
        <TextContent.Subsection>Typefaces</TextContent.Subsection>
          {AcknowledgmentsData.graphic_design_elements.typefaces.map((data, credit_index) => {
            return (
              <span style={{fontFamily: data.css_fontface, fontSize: data.fontSize, letterSpacing: data.letterSpacing}}>
                <TextContent.Credit key={`credit_${credit_index}`}
                  content={data.font} content_source={data.font_link} 
                  creator={data.foundry} creator_source={data.foundry_link}
                />
              </span>
            );
          })}
          <TextContent.Text>
            <span style={{fontSize: "90%", color: "#aaa"}}>
              * Carrie is not free/open source, however, due to its historical importance and aesthetic beauty, I thought it was necessary to include it.
            </span>
          </TextContent.Text>
          <br/>

        {/* COLOR PALETTE CREDITS */}
        <TextContent.Subsection>Color Palette</TextContent.Subsection>
          {AcknowledgmentsData.graphic_design_elements.color_palette.map((data, index) => {
            let color_detail = {
              backgroundColor: data.hex,
              fontFamily: "OfficeCodeProDMedium", 
              letterSpacing: "-1px", 
              padding: "0 0.3em 0 0.2em",
              marginLeft: "0.5em"
            }

            return (
              <div key={`content_item_${index}`}>
                <TextContent.Text>{data.color_name}:</TextContent.Text>
                <TextContent.TextIndent>HEX:<span style={color_detail}>{data.hex}</span></TextContent.TextIndent>
                <TextContent.TextIndent>RGB:<span style={color_detail}>{data.rgb}</span></TextContent.TextIndent>
                <TextContent.TextIndent>CMYK:<span style={color_detail}>{data.cmyk}</span></TextContent.TextIndent>
                {
                  data.source &&
                  <TextContent.TextIndent>
                    Source:&nbsp;
                      <Link href={data.source_link}>{data.source}</Link>
                      &nbsp;c/o&nbsp;
                      {data.creators.map((creators, index) => {
                        let creator_html = null
                        if (index === 0) creator_html = <Link href={creators.link}>{creators.name}</Link>
                        else creator_html = <span> and <Link href={creators.link}>{creators.name}</Link></span>
                        return creator_html;
                      })}
                  </TextContent.TextIndent>
                }
                <br/>
              </div>
            );
          })}
        <br/>

      {/* CONTENT SOURCES CREDITS */}
      <TextContent.Section>Content</TextContent.Section>
      <TextContent.Subsection>Key</TextContent.Subsection>
      <TextContent.Text><Emoji emoji="✅" emoji_name="check mark"/> Source catalogued</TextContent.Text>
      <TextContent.Text><Emoji emoji="⏳" emoji_name="hourglass with flowing sand"/> To be done</TextContent.Text>
      <br/>
      <TextContent.Subsection>Sources</TextContent.Subsection>
        {AcknowledgmentsData.content.sort(function(a, b) {return a.title.localeCompare(b.title);}).map((data, index) => {
          let complete = ""
          if (data.complete) complete = <Emoji emoji="✅" emoji_name="check mark"/>
          else complete = <Emoji emoji="⏳" emoji_name="hourglass with flowing sand"/>
          return (
            <TextContent.Text key={`source_${index}`}>
              <Link href={data.source_link}>{data.title}</Link>
              &nbsp;{complete}
            </TextContent.Text>
          );
        })}
    </TextContent>
  )
}
