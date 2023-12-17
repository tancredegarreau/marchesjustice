import * as React from "react";
import { PropsWithChildren } from "react";
import { ContentContext, initialState } from "./content";
import { graphql, useStaticQuery } from "gatsby";

export const ContentProvider = ({ children }: PropsWithChildren<{}>) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulSeo(limit: 1) {
        nodes {
          description
          title
          image {
            gatsbyImageData(layout: FIXED)
          }
        }
      }
      allContentfulText {
        nodes {
          key
          value {
            raw
          }
          link {
            link
          }
        }
      }
      allContentfulLogo(limit: 1) {
        nodes {
          img {
            gatsbyImageData(layout: FIXED, height: 560, resizingBehavior: PAD)
            file {
              contentType
              url
            }
            title
            contentful_id
          }
        }
      }
      allContentfulBackground(limit: 1) {
        nodes {
          img {
            file {
              url
            }
          }
        }
      }
    }
  `);

  const rawData = {
    seo: {
      ...data.allContentfulSeo.nodes[0],
      image: data.allContentfulSeo.nodes[0].image.gatsbyImageData.images.fallback.src,
    },
    texts: data.allContentfulText.nodes.reduce(
      (acc, node) => ({
        ...acc,
        [node.key]: {
          document: JSON.parse(node.value.raw),
          link: node.link?.link,
        },
      }),
      {}
    ),
    logo: {
      fields: {
        gatsbyImageData: data.allContentfulLogo.nodes[0].img.gatsbyImageData,
        title: data.allContentfulLogo.nodes[0].img.title,
        file: data.allContentfulLogo.nodes[0].img.file,
      },
      sys: {
        id: data.allContentfulLogo.nodes[0].img.contentful_id,
      },
    },
    background: data.allContentfulBackground.nodes[0].img.file.url,
  };

  return (
    <ContentContext.Provider
      value={{
        ...initialState,
        ...rawData,
        fetching: false,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};
