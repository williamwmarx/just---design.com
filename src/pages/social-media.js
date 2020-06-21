import React from "react";
import Helmet from "react-helmet";
import Title from "../components/Title"
import "../sass/main.sass";
import imageOne from "../../static/images/one.png";
import imageTwo from "../../static/images/two.png";
import imageThree from "../../static/images/three.png";
import imageFour from "../../static/images/four.png";
import imageFive from "../../static/images/five.png";
import imageSix from "../../static/images/six.png";
import imageSeven from "../../static/images/seven.png";
import imageEight from "../../static/images/eight.png";

export default function Home() {
  return (
    <div className="root">
      <Helmet title="JUST DESIGN. SOCIAL MEDIA." defer={false} />

      <Title name="DO IT FOR THE 'GRAM."/>
        
      <div>
        <img className="social-media-image" src={imageOne} alt="one"/><br/>
        <img className="social-media-image" src={imageTwo} alt="two"/><br/>
        <img className="social-media-image" src={imageThree} alt="three"/><br/>
        <img className="social-media-image" src={imageFour} alt="four"/><br/>
        <img className="social-media-image" src={imageFive} alt="five"/><br/>
        <img className="social-media-image" src={imageSix} alt="six"/><br/>
        <img className="social-media-image" src={imageSeven} alt="seven"/><br/>
        <img className="social-media-image" src={imageEight} alt="eight"/><br/>
      </div>
    </div>
  )
}
