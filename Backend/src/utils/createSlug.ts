export const createSlug = async (title: string) => {
  //Replace spaces with hyphens, non alpa-numeric characters with empty space
  let slug = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

  return slug;
};
