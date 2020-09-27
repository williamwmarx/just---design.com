/* Import React */
import React from "react";
/* Import Components */
import Emoji from "../components/Emoji.js";
import Link from "../components/Link.js";
import Page from "../components/Page.js";
/* Import Styles */
import "../sass/main.sass";
/* Import Data */
import AcknowledgmentsData from "../../static/json/acknowledgments.json"

export default class Acknowledgments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: []
    };
  }

  componentDidMount() {
    const that = this;
    fetch("https://spreadsheets.google.com/feeds/cells/10xoMrSOqSeUDrYtNgT8tIdsvQK1Qp1x7copA3kPu_cs/6/public/full?alt=json")
    .then(function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: '+response.status);
            return;
        } else {
          return response.json();
        }
      }
    ).then(function(data) {
      let content = []
      let entries = data["feed"]["entry"]
      for (var i = 0; i < entries.length; i += 3) {
        let status = entries[i]["content"]["$t"]
        let title = entries[i+1]["content"]["$t"]
        let source_link = entries[i+2]["content"]["$t"]
        content.push([status, title, source_link])
      }
      that.setState({sources: content})
    })
    .catch(function(err) {
        console.log('Fetch Error: ', err);
    });
  }

  render() {
    return (
      <Page title="Acknowledgments.">        
        {/* GENERAL CREDITS */}
        <p style={{fontSize: "110%"}}>
          This site is intended to be as transparent as possible. As such, all sources used to build it are listed below.
          If you are interested in the source code for the site itself, that can be found on <Link href="https://github.com/concurrent-studio/just---design.com">GitHub</Link>.  
        </p>
  
        {/* GRAPHIC DESIGN ELEMENTS CREDITS */}
        <Page.Heading>Graphic Design Elements</Page.Heading>
          {/* TYPEFACE CREDITS */}
          <Page.SubHeading>Typefaces</Page.SubHeading>
            {AcknowledgmentsData.graphic_design_elements.typefaces.map((data, credit_index) => {
              return (
                <span key={`credit_${credit_index}`} style={{fontFamily: data.css_fontface, fontSize: data.fontSize, letterSpacing: data.letterSpacing}}>
                  <Page.Credit
                    content={data.font} content_source={data.font_link} 
                    creator={data.foundry} creator_source={data.foundry_link}
                  />
                </span>
              );
            })}
            <Page.Text>
              <span style={{fontSize: "90%", color: "#aaa"}}>
                * Carrie is not free/open source, however, due to its historical importance and aesthetic beauty, I thought it was necessary to include it.
              </span>
            </Page.Text>
            <br/>
  
          {/* COLOR PALETTE CREDITS */}
          <Page.SubHeading>Color Palette</Page.SubHeading>
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
                  <Page.Text>{data.color_name}:</Page.Text>
                  <Page.Text>HEX:<span style={color_detail}>{data.hex}</span></Page.Text>
                  <Page.Text>RGB:<span style={color_detail}>{data.rgb}</span></Page.Text>
                  <Page.Text>CMYK:<span style={color_detail}>{data.cmyk}</span></Page.Text>
                  {
                    data.source &&
                    <Page.Text>
                      Source:&nbsp;
                        <Link href={data.source_link}>{data.source}</Link>
                        &nbsp;c/o&nbsp;
                        {data.creators.map((creators, index) => {
                          let creator_html = null
                          if (index === 0) creator_html = <Link href={creators.link}>{creators.name}</Link>
                          else creator_html = <span> and <Link href={creators.link}>{creators.name}</Link></span>
                          return creator_html;
                        })}
                    </Page.Text>
                  }
                  <br/>
                </div>
              );
            })}
          <br/>
  
        {/* CONTENT SOURCES CREDITS */}
        <Page.Heading>Content</Page.Heading>
          <p className="submission">
            <Link href="https://forms.gle/1xyjG8HHBNKtAC8d8">Submit a source to catalogue →</Link>
            &nbsp;&nbsp;
            <Emoji>📝</Emoji><Emoji>➕</Emoji><br/>
          </p>
  
        <Page.SubHeading>Key</Page.SubHeading>
        <Page.Text><Emoji>✅</Emoji> Source catalogued</Page.Text>
        <Page.Text><Emoji>🚧</Emoji> Under construction</Page.Text>
        <Page.Text><Emoji>⏳</Emoji> To be done</Page.Text>
        <br/>

        <Page.SubHeading>Sources</Page.SubHeading>
          {this.state.sources.map((data, index) => {
            let emoji = ""
            if (data[0] === "Catalogued") emoji = <Emoji>✅</Emoji>
            else if (data[0] === "Pending") emoji = <Emoji>🚧</Emoji>
            else if (data[0] === "To-do") emoji = <Emoji>⏳</Emoji>
            return (
              <p className="submission" key={`source_${index}`}>
                <Link href={data[2]}>{data[1]}</Link>
                &nbsp;{emoji}
              </p>
            );
          })}
      </Page>
    )
  }
}
