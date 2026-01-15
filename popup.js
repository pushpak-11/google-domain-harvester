document.getElementById("show").addEventListener("click", () => {
  chrome.storage.local.get("domains", data => {
    document.getElementById("output").value =
      (data.domains || []).sort().join("\n");
  });
});

document.getElementById("clear").addEventListener("click", () => {
  chrome.storage.local.set({ domains: [] }, () => {
    alert("Domain list cleared");
    document.getElementById("output").value = "";
  });
});
