function isMobileOrTablet() {
  return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
}

function objectToGetParams(object) {
  const params = Object.entries(object)
    .filter(([key, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    );

  return params.length > 0 ? `?${params.join("&")}` : "";
}

// Function to share a URL on Facebook
export const shareToFacebook = (url, caption) => {
  const fbUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
    url
  )}&quote=${encodeURIComponent(caption)}`;
  window.open(fbUrl, "popup");
};

// Function to share a URL on Messenger
export const shareToMessenger = (url, appId = "1750198052103051") => {
  const msgrUrl = `https://www.facebook.com/dialog/send?app_id=${appId}&link=${encodeURIComponent(
    url
  )}&redirect_uri=${encodeURIComponent(url)}`;
  window.open(msgrUrl, "_blank");
};

// Function to share a URL on WhatsApp
export const shareToWhatsApp = (url, title) => {
  const waImageUrl = url;
  const waUrl =
    "https://" +
    (isMobileOrTablet() ? "api" : "web") +
    ".whatsapp.com/send" +
    objectToGetParams({
      text: title ? title + " " + waImageUrl : waImageUrl,
    });
  window.open(waUrl, "_blank");
};

// Function to share a URL on Twitter
export const shareToTwitter = (url, text) => {
  const twUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(text)}`;
  window.open(twUrl, "_blank");
};
