import styled from "styled-components";
import { PRIMARY } from "../constant/Colors";
import { KAWARU } from "../constant/Fonts";
import { Document } from "@contentful/rich-text-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import * as React from "react";
import { useMemo } from "react";

const Container = styled.div`
  color: ${PRIMARY};
  font-family: ${KAWARU};
  text-transform: uppercase;
  font-size: 28px;
  text-align: center;
  margin-bottom: 48px;
  padding: 0 24px;
`;

interface Props {
  document: Document;
  replaces?: {
    [k: string]: string;
  };
}

export const TitleContainer = ({ document, replaces }: Props) => {
  const html = useMemo(() => {
    let htmlData = documentToHtmlString(document);
    if (replaces) {
      Object.keys(replaces).forEach(key => {
        htmlData = htmlData.replace(key, replaces[key]);
      });
    }
    return htmlData;
  }, [replaces, document]);

  return (
    <Container
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};
