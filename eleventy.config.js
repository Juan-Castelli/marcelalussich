import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/root": "." });

  // Huella del CSS para el <link>. Así cada versión del CSS es una URL propia
  // y el HTML nunca queda emparejado con una hoja de estilos vieja cacheada.
  eleventyConfig.addGlobalData("cssHash", () =>
    createHash("sha256")
      .update(readFileSync("src/assets/css/style.css"))
      .digest("hex")
      .slice(0, 10)
  );

  eleventyConfig.addFilter("absoluteUrl", (path, base) => new URL(path, base).href);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
