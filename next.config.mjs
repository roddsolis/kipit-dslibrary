import nextMdx from "@next/mdx";

/** @type {import('next').NextConfig} */
const config = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

export default nextMdx({
  extension: /\.mdx?$/,
})(config);
