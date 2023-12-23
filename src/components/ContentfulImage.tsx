import * as React from "react";
import { Image } from "../technical/contentful/image";
import { Entry } from "../technical/contentful/entry";
import { GatsbyImage, GatsbyImageProps, getImage } from "gatsby-plugin-image";

interface Props extends Omit<GatsbyImageProps, "image" | "alt"> {
  image: Entry<Image>;
}

export const ContentfulImage = ({ image, ...props }: Props) => {
  if (!image.fields.gatsbyImageData) {
    return (
      <img
        style={props.style}
        className={props.className}
        src={image.fields.file.url}
        alt={image.fields.title}
      />
    );
  }

  return (
    <GatsbyImage
      image={getImage(image.fields.gatsbyImageData)}
      alt={image.fields.title}
      {...props}
    />
  );
};
