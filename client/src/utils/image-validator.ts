export const validateImageFile = (file: File) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  const maxSize = 25 * 1024; // 25KB in bytes

  if (!file) {
    return { isValid: false, message: "No file selected" };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      message: "Only JPEG, PNG, and GIF formats are allowed",
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      message: `File size should not exceed 25KB (current size: ${(
        file.size / 1024
      ).toFixed(2)}KB)`,
    };
  }

  return { isValid: true, message: "File is valid" };
};
