const useCopyImageToClipboard = () => {
  return (base64) => {
    // Convert base64 to blob
    const byteCharacters = atob(base64.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });

    const item = new ClipboardItem({ "image/png": blob });
    navigator.clipboard.write([item]);
  };
};

export default useCopyImageToClipboard;
