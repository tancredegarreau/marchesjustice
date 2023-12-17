import { useExternal } from "../../technical/external-provider/content";
import * as React from "react";
import { useMemo } from "react";
import { MarkerData } from "../../section/map/map-component/MapComponent";
import { SafeMountMapComponent } from "../../section/map/map-component";
import { ContentProvider } from "../../technical/contentful/ContentProvider";
import { ExternalProvider } from "../../technical/external-provider/ContentProvider";
import { useContent } from "../../technical/contentful/content";
import favicon from "../../assets/images/favicon.png";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  min-height: 600px;
`;

const EmbedMap = () => {
  const { events } = useExternal();
  const markers = useMemo<MarkerData[]>(
    () =>
      events.map(event => ({
        city: event.city,
        date: event.date,
        where: event.where,
        when: event.when,
        subject: event.subject,
        href: event.URL,
        position: event.position,
      })),
    [events]
  );

  return (
    <Container>
      <SafeMountMapComponent markers={markers} />
    </Container>
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
      <meta property="og:url" content="https://actionpalestine.fr" />
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
      <EmbedMap />
    </ExternalProvider>
  </ContentProvider>
);
