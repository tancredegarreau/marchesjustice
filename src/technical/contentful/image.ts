import { IGatsbyImageData } from "gatsby-plugin-image";

export interface Image {
  title: string;
  gatsbyImageData?: IGatsbyImageData;
  file: {
    contentType: string;
    url: string;
  };
}
