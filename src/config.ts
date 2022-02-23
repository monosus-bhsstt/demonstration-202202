export const SITE = {
	title: "About Modern Web Development!!",
	description: "Your website description.",
	defaultLanguage: "ja",
};

export const OPEN_GRAPH = {
	image: {
		src: "https://github.com/withastro/astro/blob/main/assets/social/banner.jpg?raw=true",
		alt:
			"astro logo on a starry expanse of space," +
			" with a purple saturn-like planet floating in the right foreground",
	},
	twitter: "astrodotbuild",
};

export const KNOWN_LANGUAGES = {
	English: "en",
	日本語: "ja",
};

// Uncomment this to add an "Edit this page" button to every page of documentation.
// export const GITHUB_EDIT_URL = `https://github.com/withastro/astro/blob/main/docs/`;

// Uncomment this to add an "Join our Community" button to every page of documentation.
// export const COMMUNITY_INVITE_URL = `https://astro.build/chat`;

// Uncomment this to enable site search.
// See "Algolia" section of the README for more information.
// export const ALGOLIA = {
//   indexName: 'XXXXXXXXXX',
//   apiKey: 'XXXXXXXXXX',
// }

export const SIDEBAR = {
	en: [
		{ text: "", header: true },
		{ text: "For a better UX", header: true },
		{ text: "Introduction", link: "en/introduction" },
		{ text: "Why React?", link: "en/page-2" },
		{ text: "Deploy", link: "en/page-3" },
		{ text: "CSS, build tools", link: "en/page-4" },
		{ text: "Summary", link: "en/page-5" },

		{ text: "Simple demo", header: true },
		{ text: "Persons dynamic import", link: "persons/" },
		{ text: "Products data fertch", link: "products/" },
	],
	ja: [
		{ text: "", header: true },
		{ text: "より良いUXのために", header: true },
		{ text: "はじめに", link: "ja/introduction" },
		{ text: "なぜReactなのか", link: "ja/page-2" },
		{ text: "デプロイ", link: "ja/page-3" },
		{ text: "CSS、ビルドツール", link: "ja/page-4" },
		{ text: "まとめ", link: "ja/page-5" },

		{ text: "簡単なデモ", header: true },
		{ text: "Persons dynamic import", link: "persons/" },
		{ text: "Products data fertch", link: "products/" },
	],
};
