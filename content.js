(() => {
  const getRootDomain = host => {
    const parts = host.replace(/^www\./, "").split(".");
    return parts.length > 2 ? parts.slice(-2).join(".") : host;
  };

  chrome.storage.local.get("domains", data => {
    const domains = new Set(data.domains || []);

    document.querySelectorAll("a[href^='http']").forEach(link => {
      try {
        const url = new URL(link.href);
        if (url.hostname.includes("google.")) return;
        domains.add(getRootDomain(url.hostname));
      } catch {}
    });

    chrome.storage.local.set({ domains: [...domains] });
  });
})();
