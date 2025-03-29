# MUTED - Installation and Usage Guide

## Installation

### Setting up the extension for development:

1. Clone or download this repository to your local machine
2. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" using the toggle in the top-right corner
   - Click "Load unpacked" and select the folder containing the extension files
   - The MUTED extension should now appear in your browser toolbar

## Usage

### Controlling tab audio:

1. Click the MUTED icon in your browser toolbar to open the extension popup
2. Use the buttons to control tab audio:
   - **Toggle Current Tab Audio**: Mutes or unmutes just the current tab
   - **Mute All Tabs**: Mutes all open tabs at once
   - **Unmute All Tabs**: Unmutes all open tabs at once

### Auto-muting new tabs:

1. Open the extension popup
2. Enable the "Auto-mute new tabs" checkbox
3. All new tabs you open from now on will be automatically muted

### Icon Indicators:

The extension uses different icons to show mute status:
- The "active" icon (speaker) indicates the current tab is not muted
- The "mute" icon (speaker with an X) indicates the current tab is muted

### Disabling the extension:

If you need to temporarily disable the extension:
1. Go to `chrome://extensions/`
2. Toggle off the switch for MUTED

## Troubleshooting

- If the extension isn't working, make sure it has permissions to access tabs
- The extension can only control tabs that Chrome allows to be muted
- Some sites (like Chrome Web Store) cannot be muted due to Chrome security restrictions

## Feedback

If you encounter any issues or have suggestions for improvements, please open an issue in the GitHub repository. 