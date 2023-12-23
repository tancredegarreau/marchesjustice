import facebook from "./icons/facebook.svg";
import mail from "./icons/mail.svg";
import messenger from "./icons/messenger.svg";
import telegram from "./icons/telegram.svg";
import whatsapp from "./icons/whatsapp.svg";
import x from "./icons/x.svg";
import { EventMap } from "../../../../technical/airtable/events";
import * as React from "react";
import { FC, SyntheticEvent, useCallback, useState } from "react";
import styled from "styled-components";
import { Button } from "../../../../components/Button";
import * as copy from "copy-to-clipboard";
import { useContent } from "../../../../technical/contentful/content";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { TextKey } from "../../../../technical/contentful/text";

const SOCIALS: Array<{
  key: keyof EventMap["data"]["socials"];
  img: string;
}> = [
  {
    key: "facebook",
    img: facebook,
  },
  {
    key: "x",
    img: x,
  },
  {
    key: "whatsapp",
    img: whatsapp,
  },
  {
    key: "telegram",
    img: telegram,
  },
  {
    key: "messenger",
    img: messenger,
  },
  {
    key: "email",
    img: mail,
  },
];

const Container = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 17px;
  font-weight: bold;
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin: 12px;
`;

export const Socials: FC<{ socials: EventMap["data"]["socials"] }> = ({
  socials,
}) => {
  const { texts } = useContent();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    copy(location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }, []);

  return (
    <Container>
      <Title>Invitez vos proches à partager</Title>
      <Button style={{ height: 42 }} onClick={handleCopy}>
        {documentToPlainTextString(
          texts[copied ? TextKey.SHARE_CTA_SUCCESS : TextKey.SHARE_CTA].document
        )}
      </Button>

      <IconsContainer>
        {SOCIALS.map(({ key, img }) => {
          const url = socials[key];

          if (!url) {
            return null;
          }

          return (
            <a key={key} href={url} target="_blank">
              <img
                height={32}
                width={32}
                src={img}
                alt={`Partager avec ${key}`}
              />
            </a>
          );
        })}
      </IconsContainer>
    </Container>
  );
};
