
// Generate a random ID
const generateID = () => {
  return "_" + Math.random().toString(36).slice(2, 11);
};

console.log("generateID:", generateID());
  const normalizeText = (text) => {
    if (text === undefined || text === null) {
      return "";
    }
  
    const normalized = text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  
    console.log("Original text:", text, "Normalized text:", normalized);
  
    return normalized;
  };
  
  
  export { generateID, normalizeText };
  



  // // Normalize a string
  // const normalizeText = (text) => {
  //   return text
  //     .toLowerCase()
  //     .normalize("NFD")
  //     .replace(/[\u0300-\u036f]/g, "")
  //     .trim();
  // };
  
  // export { generateID, normalizeText };