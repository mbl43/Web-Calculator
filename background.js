chrome.runtime.onInstalled.addListener(() => {
  // Create context menu items
  chrome.contextMenus.create({
    id: "add",
    title: "Add to selected number",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "subtract",
    title: "Subtract from selected number",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "multiply",
    title: "Multiply selected number",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "divide",
    title: "Divide selected number",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "percentage",
    title: "Calculate percentage of selected number",
    contexts: ["selection"],
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const selectedText = info.selectionText;

  // Check if the selected text is a valid number
  const number = parseFloat(selectedText.replace(/,/g, ""));

  if (isNaN(number)) {
    // Show notification
    chrome.tabs.sendMessage(tab.id, {
      action: "showNotification",
      message: "Please select a valid number",
    });
    return;
  }

  // open a popup
  chrome.windows.create({
    url: chrome.runtime.getURL(
      `calculator.html?operation=${info.menuItemId}&number=${number}`
    ),
    type: "popup",
    width: 400,
    height: 300,
  });
});
