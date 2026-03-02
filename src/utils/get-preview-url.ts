const getPreviewUrl = (item: {
  slug: string;
  image?: string;
}): string | null => {
  if (item.image) {
    return `/images/${item.image}`;
  }

  return `/images/previews/${item.slug}.png`;
};

export default getPreviewUrl;
