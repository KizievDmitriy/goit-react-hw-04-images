export const fetchImg = async (imgName, page, perPage) => {
    const response = await fetch(
      `https://pixabay.com/api/?q=${imgName}&page=${page}&key=27112752-ba9c06a82163f4d21667ea4bf&image_type=photo&orientation=horizontal&per_page=${perPage}`
    );
    if (response.ok) {
      return response.json();
    }
    return await Promise.reject(new Error(`Not found ${imgName}`));
  };