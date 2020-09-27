import React from "react";
import Helmet from "react-helmet";

export default function Head(props) {
  return (
    <Helmet title={props.title} defer={false}>
      <meta name="viewport" content="width=device-width, user-scalable=no" />
    </Helmet>
  );
}
