import fs from "fs";
import path from "path";

import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import YAML from "yaml";

export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setDataDirectory("_data");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.ignores.add(
    ".gitignore, .prettierrc, bun.lock, postcss.config.mjs, README.md, CLAUDE.md, AGENTS.md",
  );
  eleventyConfig.addDataExtension("yml, yaml", (contents) =>
    YAML.parse(contents),
  );
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
  });

  //compile tailwind before eleventy processes the files
  eleventyConfig.on("eleventy.before", async () => {
    const tailwindInputPath = path.resolve("./src/global.css");

    const tailwindOutputPath = "./_site/assets/css/global.css";

    const cssContent = fs.readFileSync(tailwindInputPath, "utf8");

    const outputDir = path.dirname(tailwindOutputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const result = await processor.process(cssContent, {
      from: tailwindInputPath,
      to: tailwindOutputPath,
    });

    fs.writeFileSync(tailwindOutputPath, result.css);
  });

  const processor = postcss([
    //compile tailwind
    tailwindcss(),
  ]);
}
