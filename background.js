// Initialize default settings if not already set
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['autoMute'], function(result) {
    if (result.autoMute === undefined) {
      chrome.storage.sync.set({ autoMute: false });
    }
  });
});

// Function to update extension icon based on tab mute state
function updateExtensionIcon(tabId, muted) {
  const iconPath = {
    16: muted ? 'icons/png/icon-mute-16.png' : 'icons/png/icon-active-16.png',
    32: muted ? 'icons/png/icon-mute-32.png' : 'icons/png/icon-active-32.png',
    48: muted ? 'icons/png/icon-mute-48.png' : 'icons/png/icon-active-48.png',
    64: muted ? 'icons/png/icon-mute-64.png' : 'icons/png/icon-active-64.png',
    96: muted ? 'icons/png/icon-mute-96.png' : 'icons/png/icon-active-96.png',
    128: muted ? 'icons/png/icon-mute-128.png' : 'icons/png/icon-active-128.png',
    192: muted ? 'icons/png/icon-mute-192.png' : 'icons/png/icon-active-192.png'
  };
  
  // Update the icon for this specific tab
  chrome.action.setIcon({
    path: iconPath,
    tabId: tabId
  });
}

// Listen for tab creation events
chrome.tabs.onCreated.addListener((tab) => {
  // Check if auto-mute is enabled
  chrome.storage.sync.get(['autoMute'], function(result) {
    if (result.autoMute) {
      // Mute the new tab
      chrome.tabs.update(tab.id, { muted: true }, () => {
        updateExtensionIcon(tab.id, true);
      });
    }
  });
});

// When tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // If the muted state changed, update the icon
  if (changeInfo.mutedInfo) {
    updateExtensionIcon(tabId, changeInfo.mutedInfo.muted);
  }
  
  // Handle auto-mute for new content
  if (changeInfo.url) {
    // Check if auto-mute is enabled
    chrome.storage.sync.get(['autoMute'], function(result) {
      if (result.autoMute) {
        // Mute the tab
        chrome.tabs.update(tabId, { muted: true }, () => {
          updateExtensionIcon(tabId, true);
        });
      }
    });
  }
});

// When the active tab changes, update the icon to match the current tab's mute state
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab && tab.mutedInfo) {
      updateExtensionIcon(tab.id, tab.mutedInfo.muted);
    }
  });
}); 