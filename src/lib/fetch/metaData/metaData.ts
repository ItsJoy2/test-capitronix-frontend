import { Metadata } from "next";

export const generateMetadata = async (
  title: string,
  description: string
): Promise<Metadata> => {
  return {
    title: `${title} | Petroxcin`,
    description: description,
  };
};
