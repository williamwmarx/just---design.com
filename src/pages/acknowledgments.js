import React from "react";
import "../css/main.css";

export default function Home() {
  return (
    <div className="root">
      <div className="just-design">
        <h1 className="pinkText">JUST DESIGN.</h1>
        <h2 className="gradientText">ACKNOWLEDGMENTS.</h2>
      </div>
        
      <div className="text-content">
        <h3>Graphic Design Elements</h3>
          <p>Typefaces:</p>
          <ul>
            <li><a rel="noreferrer" target="_blank" href="https://www.vocaltype.co/history-of/the-neue-black">The Neue Black</a> c/o <a rel="noreferrer" target="_blank" href="https://www.vocaltype.co/">Vocal Type</a></li>
            <li><a rel="noreferrer" target="_blank" href="https://github.com/nathco/Office-Code-Pro">Office Code Pro D</a> c/o <a rel="noreferrer" target="_blank" href="https://nath.co/">Nathan Rutzky</a></li>
            <li><a rel="noreferrer" target="_blank" href="https://github.com/itfoundry/Poppins">Poppins</a> c/o <a rel="noreferrer" target="_blank" href="https://www.indiantypefoundry.com/">Indian Type Foundry</a></li>
          </ul>
          <p>Color Scheme:</p>
          <ul>
            <li>Background: </li>
            <li>HEX: #111111, RGB: (17, 17, 17), CMYK: (0%, 0%, 0%, 93%)</li>
            <li>Gradient:</li>
            <li>HEX: #63b1df, #9497c7, #ef519d</li>
            <li>RGB: (99, 177, 223), (148, 151, 199), (239, 81, 157)</li>
            <li>Gradient Color 1 Origin: <a rel="noreferrer" target="_blank" href="https://www.penguinrandomhouse.com/books/612188/this-is-what-i-know-about-art-by-kimberly-drew-illustrated-by-ashley-lukashevsky/">&ldquo;This Is What I Know About Art&rdquo;</a> Cover c/o <a rel="noreferrer" target="_blank" href="https://www.instagram.com/museummammy">Kimberly Drew</a></li>
            <li>Gradient Color 2 Origin: <a rel="noreferrer" target="_blank" href="https://www.instagram.com/p/B6niRV0JE4S/">One Drop Can Make a Rainbow</a> c/o <a rel="noreferrer" target="_blank" href="https://www.instagram.com/alaska___alaska/">Alaska-Alaska</a></li>
            <li>Gradient Color 3 Origin: <a rel="noreferrer" target="_blank" href="https://www.instagram.com/p/BknjgrFg0Cj/">Seriously Fun Light Study</a> c/o <a rel="noreferrer" target="_blank" href="http://oanas.net/">Oana Stănescu</a> and <a rel="noreferrer" target="_blank" href="http://akanemoriyama.com/">Akane Moriyama</a></li>
          </ul>
      </div>
    </div>
  )
}
