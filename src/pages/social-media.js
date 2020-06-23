import React from "react";
import Head from "../components/Head"
import Title from "../components/Title"
import imageOne from "../../static/images/one.png";
import imageTwo from "../../static/images/two.png";
import imageThree from "../../static/images/three.png";
import imageFour from "../../static/images/four.png";
import imageFive from "../../static/images/five.png";
import imageSix from "../../static/images/six.png";
import imageSeven from "../../static/images/seven.png";
import imageEight from "../../static/images/eight.png";

let story_image = {
    position: "relative",
    left: "30vw",
    width: "40vw",
    border: "1px solid #ddd",
    borderRadius: "10px",
    margin: "2vh auto 2vh auto"
}

export default function Home() {
  return (
    <div className="root">
      <Head title="JUST DESIGN. SOCIAL MEDIA."/>

      <Title name="DO IT FOR THE 'GRAM."/>
        
      <div>
        <img style={story_image} src={imageOne} alt="one"/><br/>
        <img style={story_image} src={imageTwo} alt="two"/><br/>
        <img style={story_image} src={imageThree} alt="three"/><br/>
        <img style={story_image} src={imageFour} alt="four"/><br/>
        <img style={story_image} src={imageFive} alt="five"/><br/>
        <img style={story_image} src={imageSix} alt="six"/><br/>
        <img style={story_image} src={imageSeven} alt="seven"/><br/>
        <img style={story_image} src={imageEight} alt="eight"/><br/>
      </div>
    </div>
  )
}
