/// <reference types="chrome" />

document.addEventListener('DOMContentLoaded', function ()
{
  const muteCurrentButton = document.getElementById('mute-current') as HTMLDivElement;
  const unmuteCurrentButton = document.getElementById('unmute-current') as HTMLDivElement;
  const muteAllButton = document.getElementById('mute-all') as HTMLDivElement;
  const unmuteAllButton = document.getElementById('unmute-all') as HTMLDivElement;
  const autoMuteCheckbox = document.getElementById('auto-mute') as HTMLInputElement;
  const statusElement = document.getElementById('status') as HTMLDivElement;
  const autoMuteStatus = document.getElementById('auto-mute-status') as HTMLDivElement;

  // Load settings when popup opens
  chrome.storage.sync.get(['autoMute'], function (result: StorageItems)
  {
    autoMuteCheckbox.checked = result.autoMute !== false;
  });

  // Update menu item visibility based on current tab's mute state
  function updateCurrentTabButtons(): void
  {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs: chrome.tabs.Tab[])
    {
      if (tabs.length > 0)
      {
        const tab = tabs[0];
        if (tab.mutedInfo?.muted)
        {
          muteCurrentButton.classList.add('hidden');
          unmuteCurrentButton.classList.remove('hidden');
          autoMuteStatus.textContent = 'Current tab muted';
        } else
        {
          muteCurrentButton.classList.remove('hidden');
          unmuteCurrentButton.classList.add('hidden');
          autoMuteStatus.textContent = 'Current tab unmuted';
        }
      }
    });
  }

  // Call immediately when popup opens
  updateCurrentTabButtons();

  // Save auto-mute setting when changed
  autoMuteCheckbox.addEventListener('change', function ()
  {
    chrome.storage.sync.set({ autoMute: this.checked });
    showStatus(this.checked ? 'New tabs will be auto-muted' : 'Auto-mute disabled');
  });

  // Mute current tab
  muteCurrentButton.addEventListener('click', function ()
  {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs: chrome.tabs.Tab[])
    {
      if (tabs.length > 0)
      {
        const tab = tabs[0];
        chrome.tabs.update(tab.id as number, { muted: true }, function ()
        {
          showStatus('Current tab muted');
          updateCurrentTabButtons();
        });
      }
    });
  });

  // Unmute current tab
  unmuteCurrentButton.addEventListener('click', function ()
  {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs: chrome.tabs.Tab[])
    {
      if (tabs.length > 0)
      {
        const tab = tabs[0];
        chrome.tabs.update(tab.id as number, { muted: false }, function ()
        {
          showStatus('Current tab unmuted');
          updateCurrentTabButtons();
        });
      }
    });
  });

  // Mute all tabs
  muteAllButton.addEventListener('click', function ()
  {
    chrome.tabs.query({}, function (tabs: chrome.tabs.Tab[])
    {
      let mutedCount = 0;
      tabs.forEach(function (tab)
      {
        chrome.tabs.update(tab.id as number, { muted: true }, function ()
        {
          mutedCount++;
          // When all tabs have been processed, show status
          if (mutedCount === tabs.length)
          {
            showStatus('All tabs muted');
            updateCurrentTabButtons();
          }
        });
      });
    });
  });

  // Unmute all tabs
  unmuteAllButton.addEventListener('click', function ()
  {
    chrome.tabs.query({}, function (tabs: chrome.tabs.Tab[])
    {
      let unmutedCount = 0;
      tabs.forEach(function (tab)
      {
        chrome.tabs.update(tab.id as number, { muted: false }, function ()
        {
          unmutedCount++;
          // When all tabs have been processed, show status
          if (unmutedCount === tabs.length)
          {
            showStatus('All tabs unmuted');
            updateCurrentTabButtons();
          }
        });
      });
    });
  });

  // Helper function to show status
  function showStatus(message: string): void
  {
    statusElement.textContent = message;
    statusElement.classList.remove('hidden');
    setTimeout(() =>
    {
      statusElement.classList.add('hidden');
    }, 2000);
  }
}); 