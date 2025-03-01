chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "showNotification") {
    // Create a notification
    const notificationContainer = document.createElement("div");
    notificationContainer.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0,0,0,0.8);
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
        z-index: 2147483647;
        font-family: Arial, sans-serif;
        font-size: 14px;
      `;
    notificationContainer.textContent = message.message;

    document.body.appendChild(notificationContainer);

    setTimeout(() => {
      if (notificationContainer.parentNode) {
        document.body.removeChild(notificationContainer);
      }
    }, 3000);

    return true;
  }
});
