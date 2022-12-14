import styled from "styled-components";
import TitlePageDesktop from "./Desktop/TitlePageDesktop";
import TitlePageMobile from "./Mobile/TitlePageMobile";
import { useState, useEffect } from "react";

function TitlePage({ movieData, trailerData, tvData }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  return (
    <>
      {width >= 500 ? (
        <TitlePageDesktop
          trailerData={trailerData}
          movieData={movieData}
          tvData={tvData}
        />
      ) : (
        <TitlePageMobile movieData={movieData} tvData={tvData} />
      )}
    </>
  );
}
//
export default TitlePage;
