export function getFileType(fileInput) {

    console.log({fileInput})

    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      // Handle cases where the input is not valid or no file is selected
      return "UNKNOWN";
    }
  
    const fileName = fileInput.files[0].name;
    const fileExtension = fileName?.split(".").pop()?.toLowerCase();
  
    if (!fileExtension) {
      return "UNKNOWN";
    }
  
    const videoExtensions = ["mp4", "webm", "ogg"];
    const audioExtensions = ["mp3", "ogg", "wav"];
  
    if (videoExtensions.includes(fileExtension)) {
      return "VIDEO";
    } else if (audioExtensions.includes(fileExtension)) {
      return "AUDIO";
    } else {
      return "DOCUMENT";
    }

  }