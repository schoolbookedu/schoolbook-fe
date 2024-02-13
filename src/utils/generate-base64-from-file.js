export const generateBase64FromFile = (file) => {
  // Assuming 'file' is a File object
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      // Assuming the file is an image (PNG in this case)
      const base64String = event.target.result.split(",")[1];
      const response = {
        mediaURL: `data:image/png;base64,${base64String}`,
      };
      resolve(response.mediaURL);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};
