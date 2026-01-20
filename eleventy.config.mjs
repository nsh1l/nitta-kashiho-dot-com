import YAML from "yaml";

export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setDataDirectory("_data");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.ignores.add("README.md, CLAUDE.md, AGENTS.md");
  eleventyConfig.addDataExtension("yml, yaml", (contents) =>
    YAML.parse(contents),
  );
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
  });
}
