export async function createFileOnURL(url: string) {
  let response = await fetch(url);

  // detech file type
  let imageType = response.headers.get("Content-Type");

  let data = await response.blob();
  let metadata = {
    type: "image/jpeg",
  };
  let file = new File([data], "test.jpg", metadata);

  return {
    file: file,
    fileType: imageType!.split("/")[1],
  };
}
