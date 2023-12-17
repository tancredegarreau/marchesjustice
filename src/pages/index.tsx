import "../custom-types/assets.d";
import * as React from "react";
import favicon from "../assets/images/favicon.png";
import { ContentProvider } from "../technical/contentful/ContentProvider";
import { useContent } from "../technical/contentful/content";
import { Header } from "../section/Header";
import { Map } from "../section/map";
import { Actions } from "../section/Actions";
import { Footer } from "../section/Footer";
import { ExternalProvider } from "../technical/external-provider/ContentProvider";
import styled from "styled-components";
import { TABLET } from "../constant/Breakpoints";
import { GlobalStyles } from "../components/GlobalStyles";

const Background = styled.div<{ background: string }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background-image: url(${({ background }) => background});
  background-size: 175% auto;
  background-position: top;
  background-repeat: no-repeat;

  @media (min-width: ${TABLET}px) {
    background-size: contain;
  }
`;

const Avril9 = () => {
  const { background } = useContent();

  return (
    <>
      <GlobalStyles />
      <Background background={background} />
      <Header />
      <Map />
      {false && <Actions /> // Let's hide actions for now...
      }
      <Footer />
    </>
  );
};

const HeadComponent = () => {
  const { seo } = useContent();

  return (
    <>
      <html lang="fr" />
      <title>{seo.title}</title>
      <link rel="icon" href={favicon} />
      <meta name="description" content={seo.description} />
      <meta name="viewport" content="width=device-width, initial-scale=0.7, maximum-scale=0.7" />
      <meta property="og:url" content="https://actionpalestine.fr/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:locale" content="FR" />
      <meta property="twitter:card" content="summary_large_image" />
    </>);
}

export const Head = () => (
  <ContentProvider>
    <ExternalProvider>
      <HeadComponent />
    </ExternalProvider>
  </ContentProvider>
)

export default () => (
  <ContentProvider>
    <ExternalProvider>
      <Avril9 />
    </ExternalProvider>
  </ContentProvider>
);
