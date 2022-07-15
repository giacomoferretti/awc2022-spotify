export const readImageAsDataURL = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  return new Promise<string>((resolve) => {
    if (
      !event.target.files ||
      event.target.files.length < 1 ||
      !event.target.files[0].type.match(/image.*/)
    )
      throw new Error("No image uploaded!");

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target || !e.target.result || typeof e.target.result !== "string")
        throw new Error("Something went wrong while reading the image");

      resolve(e.target.result);
    };

    reader.readAsDataURL(event.target.files[0]);
  });
};
