import * as React from "react";
import { HTMLProps } from "react";
import { Image } from "../technical/contentful/image";
import { Entry } from "../technical/contentful/entry";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

interface Props {
  image: Entry<Image>;
  className?: HTMLProps<HTMLImageElement>["className"];
  style?: HTMLProps<HTMLImageElement>["style"];
}

export const ContentfulImage = ({ image, ...props }: Props) => {
  if (!image.fields.gatsbyImageData) {
    return (
      <img {...props} src={image.fields.file.url} alt={image.fields.title} />
    );
  }

  return (
    <GatsbyImage
      image={getImage(image.fields.gatsbyImageData)}
      alt={image.fields.title}
    />
  );
};
