import React from "react";
import Typewriter from "typewriter-effect";

const Jumbotron = ({ text }) => (
  <Typewriter
    options={{
      strings: text,
      autoStart: true,
      pauseFor: 1500,
      loop: true,
    }}
  />
);

export default Jumbotron;
