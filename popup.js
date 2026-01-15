const output = document.getElementById("output");

document.getElementById("collect").onclick = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.sendMessage(tab.id, { action: "collect" }, response => {
    if (!response) return;

    chrome.storage.local.get({ domains: [] }, data => {
      const merged = new Set(data.domains);
      response.domains.forEach(d => merged.add(d));
      chrome.storage.local.set({ domains: [...merged] });
    });
  });
};

document.getElementById("show").onclick = () => {
  chrome.storage.local.get("domains", data => {
    output.value = (data.domains || []).sort().join("\n");
  });
};

document.getElementById("clear").onclick = () => {
  chrome.storage.local.set({ domains: [] });
  output.value = "";
};
