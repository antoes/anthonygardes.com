const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
	// Output directory: _site

	// Automatic image optimization: converts <img> tags to <picture> with WebP/JPEG
	// srcsets, adds width/height to prevent layout shift, and lazy-loads by default.
	// Images with loading="eager" set explicitly will not be overridden.
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		formats: ["webp", "jpeg"],
		widths: [200, 400, 800, 1200, "auto"],
		transformOnRequest: false, // always generate images at build time, not on-demand
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
				sizes: "(max-width: 640px) 100vw, min(45ch, 50vw)",
			},
		},
	});

	// Tag collection that excludes internal 11ty keys so tag pages are only
	// generated for real content tags (not "all" or "post").
	eleventyConfig.addCollection("tagList", function (collection) {
		const excluded = new Set(["all", "post"]);
		const tagSet = new Set();
		collection.getAll().forEach(item => {
			(item.data.tags || []).forEach(tag => {
				if (!excluded.has(tag)) tagSet.add(tag);
			});
		});
		return [...tagSet].sort();
	});

	// Copy `css/fonts/` to `_site/css/fonts/`
	eleventyConfig.addPassthroughCopy("css/fonts");
	eleventyConfig.addPassthroughCopy("bundle.css");

	// Non-image assets copied as-is
	eleventyConfig.addPassthroughCopy("**/*.gif");
	eleventyConfig.addPassthroughCopy("**/*.pkt");
	eleventyConfig.addPassthroughCopy("**/*.mp4");

	// Source images copied for passthrough (eleventy-img also generates optimized
	// versions from these; originals are kept for direct linking / fallback).
	eleventyConfig.addPassthroughCopy("**/*.jpg");
	eleventyConfig.addPassthroughCopy("**/*.jpeg");
	eleventyConfig.addPassthroughCopy("**/*.png");
	eleventyConfig.addPassthroughCopy("**/*.webp");
	eleventyConfig.addPassthroughCopy("public");
};