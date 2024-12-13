import React, { useEffect, useRef, useState } from "react";

import Navbar from "./Navbar";

import Footer from "../Footer";
import Hero from "./Hero";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />
      <Footer />
    </>
  );
}

export default Home;
