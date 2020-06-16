import React from "react";
import { Helmet } from "react-helmet";

export default function Header() {
    return (
        <Helmet>
            {/* META TAGS */}
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="description" content="Just Design. That's All It Takes."/>
            <meta name="robots" content="index,follow"/>
            <meta name="googlebot" content="index,follow"/>
            <meta name="google" content="nositelinkssearchbox"/>
            <meta name="google" content="notranslate"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>

            {/* FACEBOOK OPEN GRAPH */}
            <meta property="og:url" content="https://just---design.com"/>
            <meta property="og:type" content="website"/>
            <meta property="og:title" content="Just Design. That's All It Takes."/>
            {/* <meta property="og:image" content=""/> */}
            <meta property="og:image:alt" content="Just Design. That's All It Takes."/>
            <meta property="og:description" content="Just Design. That's All It Takes."/>
            <meta property="og:site_name" content="https://just---design.com"/>
            <meta property="og:locale" content="en_US"></meta>

            {/* TWITTER CARD */}
            <meta name="twitter:card" content="summary"/>
            <meta name="twitter:url" content="https://just---design.com"/>
            <meta name="twitter:title" content="Just Design. That's All It Takes."/>
            <meta name="twitter:description" content="Just Design. That's All It Takes."/>
            {/* <meta name="twitter:image" content=""/> */}
            <meta name="twitter:image:alt" content="Just Design. That's All It Takes."/>

            {/* SCHEMA */}
            {`<script type="application/ld+json">
                {
                    "@context": "http://schema.org",
                    "@id": "https://just---design.com",
                    "@type": "WebPage",
                    "url": "https://just---design.com",
                    "name": "Just Design. That's All It Takes."
                }
            </script>
            <script type="application/ld+json">
                {
                    "@context": "http://schema.org",
                    "@id": "https://just---design.com",
                    "@type": "WebSite",
                    "url": "https://just---design.com",
                    "name": "Just Design. That's All It Takes."
                }
            </script>`}

            {/* Global site tag (gtag.js) - Google Analytics */}
            {`<script async src="https://www.googletagmanager.com/gtag/js?id=UA-169387993-1"></script>
            <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-169387993-1');
            </script>`}

            {/* TITLE, STYLES, FAVICON */}
            <title>Just Design. That's All It Takes.</title>
        </Helmet>
    );
}
