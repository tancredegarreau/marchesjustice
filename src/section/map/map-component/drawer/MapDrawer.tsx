import Drawer, { DrawerProps } from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { FC } from "react";
import { EventMap } from "../../../../technical/airtable/events";
import styled from "styled-components";
import MD from "react-markdown";
import { TABLET } from "../../../../constant/Breakpoints";
import { Socials } from "./Socials";

function objectEmpty(o: object) {
  return Object.values(o).every((v) => !v);
}

const Container = styled.div`
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h6`
  font-size: 24px;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 18px;
  font-style: italic;
`;

const Info = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const Description = styled(MD)`
  font-size: 18px;

  ul,
  ol {
    padding-left: 40px;
    list-style: initial;
  }

  a {
    text-decoration: underline;
  }
`;

interface Props extends Omit<DrawerProps, "anchor"> {
  data: EventMap["data"];
}

export const MapDrawer: FC<Props> = ({ data, ...props }) => {
  const isLargeScreen = useMediaQuery(`(min-width: ${TABLET}px)`);

  return (
    <Drawer anchor={isLargeScreen ? "right" : "bottom"} {...props}>
      <Container style={isLargeScreen ? { width: 360 } : {}}>
        {!!(data.title || data.subtitle) && (
          <Section>
            {data.title && <Title>{data.title}</Title>}
            {data.subtitle && <Subtitle>{data.subtitle}</Subtitle>}
          </Section>
        )}
        {!!(data.date || data.address) && (
          <Section>
            {data.date && <Info>{data.date}</Info>}
            {data.address && <Info>{data.address}</Info>}
          </Section>
        )}
        {data.description && (
          <Section>
            <Description>{data.description}</Description>
          </Section>
        )}
        <Socials socials={data.socials} />
      </Container>
    </Drawer>
  );
};
