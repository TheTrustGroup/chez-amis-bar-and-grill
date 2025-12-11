# Disk Space Cleanup Guide
## Chez Amis Bar and Grill Project

**Issue:** ENOSPC: no space left on device  
**Status:** ✅ **Partially Resolved** - Freed ~1.1GB  
**Current Disk Usage:** 97% (6.6GB available out of 228GB)

---

## ✅ Actions Completed

1. **Cleared Next.js Build Cache**
   - Removed `.next` directory
   - Freed up build artifacts and webpack cache

2. **Cleared npm Cache**
   - Ran `npm cache clean --force`
   - Removed cached npm packages

---

## 🔧 Additional Cleanup Recommendations

### 1. Clear More Build Artifacts
```bash
# Remove all build caches
rm -rf .next
rm -rf node_modules/.cache
rm -rf .turbo  # If using Turborepo
rm -rf dist
rm -rf build
```

### 2. Clean Git History (if needed)
```bash
# Remove old git objects (be careful!)
git gc --prune=now
git reflog expire --expire=now --all
```

### 3. Check Large Files in Project
```bash
# Find large files in project
find . -type f -size +50M -exec ls -lh {} \;
```

### 4. System-Wide Cleanup (macOS)
```bash
# Clear system caches (requires admin)
sudo rm -rf ~/Library/Caches/*
sudo rm -rf /Library/Caches/*

# Clear Xcode derived data (if applicable)
rm -rf ~/Library/Developer/Xcode/DerivedData

# Clear Docker (if using)
docker system prune -a --volumes
```

### 5. Check Disk Usage by Directory
```bash
# See what's taking up space
du -sh * | sort -hr | head -20
```

---

## 🚀 Prevent Future Issues

### 1. Add to .gitignore
Ensure these are ignored:
```
.next/
node_modules/
.cache/
dist/
build/
*.log
.DS_Store
```

### 2. Regular Cleanup Script
Create a cleanup script (`scripts/cleanup.sh`):
```bash
#!/bin/bash
echo "Cleaning build artifacts..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .turbo
npm cache clean --force
echo "✅ Cleanup complete!"
```

### 3. Monitor Disk Space
```bash
# Check disk space regularly
df -h
```

### 4. Use .npmrc to Limit Cache
Create `.npmrc` in project root:
```
cache=./.npm-cache
```

---

## ⚠️ Current Status

- **Disk Usage:** 97% (6.6GB available)
- **Recommendation:** Free up at least 10-15GB for comfortable development
- **Priority:** High - May cause build failures

---

## 📋 Quick Cleanup Commands

```bash
# Quick cleanup (run in project directory)
rm -rf .next node_modules/.cache .turbo dist build
npm cache clean --force
git gc --prune=now

# Check freed space
df -h .
```

---

**Last Updated:** December 10, 2024  
**Action Required:** Continue freeing up disk space to prevent build failures

