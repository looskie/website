const getPreviewUrl = (item: {
  url?: string;
  image?: string;
}): string | null => {
  if (item.image) {
    return `/images/${item.image}`;
  }

  if (item.url) {
    const params = new URLSearchParams({
      url: item.url,
      screenshot: "true",
      meta: "false",
      embed: "screenshot.url",
    });

    return `https://api.microlink.io/?${params.toString()}`;
  }

  return null;
};

export default getPreviewUrl;
