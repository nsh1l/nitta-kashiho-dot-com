import YAML from "yaml";
import markdown from "markdown-it";

export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setDataDirectory("_data");
  eleventyConfig.addPassthroughCopy("src/assets");
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

  eleventyConfig.addFilter("webp", (path) => path.replace(/\.(jpg|jpeg|png)$/i, ".webp"));

  eleventyConfig.addFilter("dateToRfc3339", (date) => {
    if (!date) return new Date().toISOString();
    return date instanceof Date ? date.toISOString() : new Date(date).toISOString();
  });
}
