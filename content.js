function extractDomainsFromPage() {
  const domains = new Set();

  document.querySelectorAll("a[href^='http']").forEach(link => {
    try {
      const url = new URL(link.href);
      if (url.hostname.includes("google.")) return;
      domains.add(url.hostname.replace(/^www\./, ""));
    } catch {}
  });

  return [...domains];
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === "collect") {
    sendResponse({ domains: extractDomainsFromPage() });
  }
});
