import { Entry } from "../technical/contentful/entry";
import { StandaloneEmbed } from "../technical/contentful/standalone";
import { useContent } from "../technical/contentful/content";
import * as React from "react";
import favicon from "../assets/images/favicon.png";
import { ContentProvider } from "../technical/contentful/ContentProvider";
import { ExternalProvider } from "../technical/external-provider/ContentProvider";
import styled from "styled-components";

const FullFrame = styled.iframe.attrs({
  width: "100%",
  frameBorder: 0,
})`
  height: 100vh;
`;

interface ContentProps {
  page: Entry<StandaloneEmbed>;
}

interface Props {
  pageContext: ContentProps;
}

export default ({ pageContext: { page } }: Props) => (
  <ContentProvider>
    <ExternalProvider>
      <FullFrame src={page.fields.embedUrl} />
    </ExternalProvider>
  </ContentProvider>
);

const HeadComponent = ({ page }: ContentProps) => {
  const { seo } = useContent();

  return (
    <>
      <html lang="fr" />
      <title>{page.fields.title || seo.title}</title>
      <link rel="icon" href={favicon} />
      <meta
        name="description"
        content={page.fields.description || seo.description}
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <meta
        property="og:url"
        content={`https://actionpalestine.fr/${page.fields.path}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={page.fields.title || seo.title} />
      <meta
        property="og:description"
        content={page.fields.description || seo.description}
      />
      <meta property="og:image" content={page.fields.image || seo.image} />
      <meta property="og:locale" content="FR" />
      <meta property="twitter:card" content="summary_large_image" />
    </>
  );
};

export const Head = ({ pageContext: { page } }: Props) => (
  <ContentProvider>
    <ExternalProvider>
      <HeadComponent page={page} />
    </ExternalProvider>
  </ContentProvider>
);
