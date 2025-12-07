# Clear Browser Cache to See Updated Title

The browser tab title has been updated to "Chez Amis Restaurant" in the code, but you may need to clear your browser cache to see the change.

## Quick Fix Methods:

### Method 1: Hard Refresh (Easiest)
- **Windows/Linux**: Press `Ctrl + Shift + R` or `Ctrl + F5`
- **Mac**: Press `Cmd + Shift + R`

### Method 2: Clear Cache for This Site
1. Open Developer Tools (F12 or Right-click → Inspect)
2. Right-click on the refresh button
3. Select "Empty Cache and Hard Reload"

### Method 3: Clear Browser Cache
**Chrome/Edge:**
1. Press `Ctrl + Shift + Delete` (Windows) or `Cmd + Shift + Delete` (Mac)
2. Select "Cached images and files"
3. Choose "Last hour" or "All time"
4. Click "Clear data"

**Firefox:**
1. Press `Ctrl + Shift + Delete` (Windows) or `Cmd + Shift + Delete` (Mac)
2. Select "Cache"
3. Click "Clear Now"

**Safari:**
1. Go to Safari → Preferences → Advanced
2. Check "Show Develop menu"
3. Go to Develop → Empty Caches

### Method 4: Incognito/Private Window
Open the site in an incognito/private window to bypass cache:
- **Chrome/Edge**: `Ctrl + Shift + N` (Windows) or `Cmd + Shift + N` (Mac)
- **Firefox**: `Ctrl + Shift + P` (Windows) or `Cmd + Shift + P` (Mac)
- **Safari**: `Cmd + Shift + N`

## Verify the Change:

After clearing cache, the browser tab should show:
- ✅ **"Chez Amis Restaurant"** (correct)
- ❌ ~~"Premium Dining Experience in Accra"~~ (old, cached)

## If Still Not Working:

1. **Restart the dev server** (if running locally):
   ```bash
   # Stop the server (Ctrl + C)
   # Then restart:
   npm run dev
   ```

2. **Check if deployed**: If you're viewing a deployed version, make sure the latest code has been deployed to your hosting platform.

3. **Check the HTML source**: 
   - Right-click → View Page Source
   - Look for `<title>` tag
   - It should say: `<title>Chez Amis Restaurant</title>`

