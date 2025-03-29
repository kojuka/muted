document.addEventListener('DOMContentLoaded', function () {
  const muteCurrentButton = document.getElementById('mute-current');
  const unmuteCurrentButton = document.getElementById('unmute-current');
  const muteAllButton = document.getElementById('mute-all');
  const unmuteAllButton = document.getElementById('unmute-all');
  const autoMuteCheckbox = document.getElementById('auto-mute');
  const statusElement = document.getElementById('status');

  // Load settings when popup opens
  chrome.storage.sync.get(['autoMute'], function (result) {
    autoMuteCheckbox.checked = result.autoMute || false;
  });

  // Update menu item visibility based on current tab's mute state
  function updateCurrentTabButtons() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length > 0) {
        const tab = tabs[0];
        muteCurrentButton.style.display = tab.mutedInfo.muted ? 'none' : 'flex';
        unmuteCurrentButton.style.display = tab.mutedInfo.muted ? 'flex' : 'none';
      }
    });
  }

  // Call immediately when popup opens
  updateCurrentTabButtons();

  // Save auto-mute setting when changed
  autoMuteCheckbox.addEventListener('change', function () {
    chrome.storage.sync.set({ autoMute: this.checked });
    showStatus(this.checked ? 'New tabs will be auto-muted' : 'Auto-mute disabled');
  });

  // Mute current tab
  muteCurrentButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length > 0) {
        const tab = tabs[0];
        chrome.tabs.update(tab.id, { muted: true }, function () {
          showStatus('Current tab muted');
          updateCurrentTabButtons();
        });
      }
    });
  });

  // Unmute current tab
  unmuteCurrentButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length > 0) {
        const tab = tabs[0];
        chrome.tabs.update(tab.id, { muted: false }, function () {
          showStatus('Current tab unmuted');
          updateCurrentTabButtons();
        });
      }
    });
  });

  // Mute all tabs
  muteAllButton.addEventListener('click', function () {
    chrome.tabs.query({}, function (tabs) {
      let mutedCount = 0;
      tabs.forEach(function (tab) {
        chrome.tabs.update(tab.id, { muted: true }, function () {
          mutedCount++;
          // When all tabs have been processed, show status
          if (mutedCount === tabs.length) {
            showStatus('All tabs muted');
            updateCurrentTabButtons();
          }
        });
      });
    });
  });

  // Unmute all tabs
  unmuteAllButton.addEventListener('click', function () {
    chrome.tabs.query({}, function (tabs) {
      let unmutedCount = 0;
      tabs.forEach(function (tab) {
        chrome.tabs.update(tab.id, { muted: false }, function () {
          unmutedCount++;
          // When all tabs have been processed, show status
          if (unmutedCount === tabs.length) {
            showStatus('All tabs unmuted');
            updateCurrentTabButtons();
          }
        });
      });
    });
  });

  // Helper function to show status
  function showStatus(message) {
    statusElement.textContent = message;
    statusElement.style.display = 'block';
    setTimeout(() => {
      statusElement.style.display = 'none';
    }, 2000);
  }
});
