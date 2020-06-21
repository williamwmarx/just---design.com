/* Import React */
import React from "react";
/* Import Components */
import Head from "../components/Head";
import Title from "../components/Title";
/* Import Styles */
import "../sass/main.sass";
/* Import Data */
import AcknowledgmentsData from "../../content/acknowledgments.json"

let sectionheading = {
  margin: "0 0 0.4em 0",
  fontFamily: "PoppinsMedium",
  fontSize: "125%"
}

let subheading = {
  margin: "0 0 0.25em 0", 
  fontFamily: "PoppinsMedium", 
  fontSize: "120%", 
  color: "#aaa"
}

export default function Acknowledgments() {
  return (
    <div className="root">
      <Head title="JUST DESIGN. ACKNOWLEDGMENTS." />
      <Title name="ACKNOWLEDGMENTS."/>
        
      <div className="text-content">
        {/* GENERAL CREDITS */}
        <p>
          This site is intended to be as transparent as possible. As such, all sources used to build it are listed below.
          If you are interested in the source code for the site itself, that can be found on <a rel="noreferrer" target="_blank" href="https://github.com/concurrent-studio/just---design.com">GitHub</a>.  
        </p>
        <br/>

        {/* GRAPHIC DESIGN ELEMENTS CREDITS */}
        <h3 style={sectionheading}>Graphic Design Elements</h3>
          {/* TYPEFACE CREDITS */}
          <p style={subheading}>Typefaces</p>
          {AcknowledgmentsData.graphic_design_elements.typefaces.map((data, index) => {
            return (
              <p key={`content_item_${index}`} className="indentText" style={{
                fontFamily: data.css_fontface, 
                fontSize: data.fontSize, 
                letterSpacing: data.letterSpacing
              }}>
                <a rel="noreferrer" target="_blank" href={data.font_link}>{data.font}</a>
                &nbsp;c/o&nbsp;
                <a rel="noreferrer" target="_blank" href={data.foundry_link}>{data.foundry}
                </a>
              </p>
            );
          })}
          <br/>
          <p className="indentText" style={{fontSize: "90%", color: "#aaa"}}>
            * Carrie is not free/open source, however, due to its historical importance and aesthetic beauty, I thought it was necessary to include it.
          </p>
          <br/>

          {/* COLOR PALETTE CREDITS */}
          <p style={subheading}>Color Palette</p>
          {AcknowledgmentsData.graphic_design_elements.color_palette.map((data, index) => {
            let color_detail = {
              backgroundColor: data.hex,
              fontFamily: "OfficeCodeProDMedium", 
              letterSpacing: "-1px", 
              padding: "0 0.3em 0 0.2em",
              marginLeft: "0.5em"
            }

            let source = (
              <p className="indentText2" style={{fontSize: "100%"}}>
                Source: <a style={{marginLeft: "0.3em"}} rel="noreferrer" target="_blank" href={data.source_link}>{data.source}</a>
                &nbsp;c/o&nbsp;
                {data.creators.map((creators, index) => {
                  let creator_html = null
                  if (index === 0) {
                    creator_html = <a rel="noreferrer" target="_blank" href={creators.link}>{creators.name}</a>
                  } else {
                    creator_html = <span> and <a rel="noreferrer" target="_blank" href={creators.link}>{creators.name}</a></span>
                  }
                  return creator_html;
                })}
              </p>
            )

            return (
              <div key={`content_item_${index}`}>
                <p className="indentText" style={{fontFamily: "PoppinsMedium", fontSize: "110%"}}>
                  {data.color_name}:
                </p>
                <p className="indentText2" style={{fontFamily: "PoppinsMedium", fontSize: "100%"}}>
                  HEX:<span style={color_detail}>{data.hex}</span>
                </p>
                <p className="indentText2" style={{fontFamily: "PoppinsMedium", fontSize: "100%"}}>
                  RGB:<span style={color_detail}>{data.rgb}</span>
                </p>
                <p className="indentText2" style={{fontFamily: "PoppinsMedium", fontSize: "100%"}}>
                  CMYK:<span style={color_detail}>{data.cmyk}</span>
                </p>
                {source}
              </div>
            );
          })}
          <br/>

        {/* CONTENT SOURCES CREDITS */}
        <h3 style={sectionheading}>Content</h3>
        {AcknowledgmentsData.content.map((data, index) => {
            let complete = ""
            if (data.complete) {
              complete = "✅"
            }
            return (
              <p key={`content_item_${index}`} className="indentText2" style={{fontSize: "100%"}}>
                <a rel="noreferrer" target="_blank" href={data.source_link}>{data.title}</a>&nbsp;{complete}
              </p>
            );
          })}
      </div>
    </div>
  )
}
