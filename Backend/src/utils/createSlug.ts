import Note from "../models/note.model";

export const createSlug = async (title: string) => {
  //Replace spaces with hyphens, non alpa-numeric characters with empty space
  let slug = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

  const existingNote = await Note.findOne({ slug: slug });

  //Append timestamp for day if slug is already in use
  if (existingNote) {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; //Month is zero-based

    slug += `-${day}-${month}`;
  }

  return slug;
};
