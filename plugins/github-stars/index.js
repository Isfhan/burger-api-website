/**
 * Build-time plugin: fetch GitHub star count for burger-api.
 * Falls back to a static value if the API is unreachable.
 */
const FALLBACK_STARS = 180;

async function fetchStars() {
  try {
    const res = await fetch("https://api.github.com/repos/isfhan/burger-api", {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "burger-api-website",
      },
    });
    if (!res.ok) return FALLBACK_STARS;
    const data = await res.json();
    return typeof data.stargazers_count === "number"
      ? data.stargazers_count
      : FALLBACK_STARS;
  } catch {
    return FALLBACK_STARS;
  }
}

module.exports = function githubStarsPlugin() {
  return {
    name: "github-stars-plugin",
    async loadContent() {
      return { stars: await fetchStars() };
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData({ githubStars: content.stars });
    },
  };
};
