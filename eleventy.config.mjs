import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import YAML from "yaml";
import markdown from "markdown-it";
import fs from "fs";
import path from "path";

export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setDataDirectory("_data");
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "auto"],
    widths: ["auto"],
    svgShortCircuit: true,
    htmlOptions: {
      imgAttributes: {
        decoding: "async",
      },
      pictureAttributes: {},
    },
  });
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/vendor");
  eleventyConfig.addPassthroughCopy("src/assets/fonts/line-seed-jp.css");
  eleventyConfig.addPassthroughCopy({
    "src/assets/img/logo.jpg": "assets/img/logo.jpg",
    "src/assets/img/souffle.jpg": "assets/img/souffle.jpg",
    "src/assets/img/ushi_cyan.jpg": "assets/img/ushi_cyan.jpg",
    "src/assets/img/fathers-sunflower.webp":
      "assets/img/fathers-sunflower.webp",
    "src/assets/img/hq.jpg": "assets/img/hq.jpg",
    "src/assets/img/shops/hiruzen-center-2.jpg":
      "assets/img/shops/hiruzen-center-2.jpg",
    "src/assets/img/discontinued/mixcake.jpg":
      "assets/img/discontinued/mixcake.jpg",
  });
  eleventyConfig.addPassthroughCopy("src/assets/img/souffle-making");
  eleventyConfig.addPassthroughCopy("src/assets/img/yukino-roll");
  eleventyConfig.addPassthroughCopy("src/assets/img/caramel-cookie");
  eleventyConfig.addPassthroughCopy("src/.htaccess");
  eleventyConfig.setServerOptions({
    port: 4722,
  });
  eleventyConfig.ignores.add(
    ".gitignore, .prettierrc, bun.lock, README.md, CLAUDE.md, AGENTS.md",
  );
  eleventyConfig.addDataExtension("yml, yaml", (contents) =>
    YAML.parse(contents),
  );
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
  });

  eleventyConfig.addShortcode(
    "modifiedYear",
    () => `${new Date().getFullYear()}`,
  );

  eleventyConfig.addShortcode("runtime", () => {
    const now = new Date();
    return now.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  });

  eleventyConfig.setLibrary(
    "md",
    markdown({
      html: true,
      linkify: true,
    }),
  );

  eleventyConfig.addFilter("webp", (path) =>
    path.replace(/\.(jpg|jpeg|png)$/i, ".webp"),
  );

  eleventyConfig.addFilter("resolveShopImage", (imgPath) => {
    if (!imgPath) return "/assets/img/ushi_cyan.jpg";
    const fullPath = path.join("src", imgPath);
    if (fs.existsSync(fullPath)) {
      return imgPath;
    }
    return "/assets/img/ushi_cyan.jpg";
  });

  eleventyConfig.addFilter("dateToRfc3339", (date) => {
    if (!date) return new Date().toISOString();
    return date instanceof Date
      ? date.toISOString()
      : new Date(date).toISOString();
  });
}
