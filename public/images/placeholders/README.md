# Video Poster Placeholders

This directory contains placeholder images for video posters.

## Current Status

Video poster images need to be created for the following videos:

1. `/media/videos/filtered-B59B103F-F34D-4B58-A62D-C66524AD5ACE.MP4`
   - Poster needed: `video-poster-1.jpg`
   - Suggested: Screenshot from video showing kitchen/chef

2. `/media/videos/filtered-A59206D7-3709-4278-9712-9F5B1F6DC8BF.MP4`
   - Poster needed: `video-poster-2.jpg`
   - Suggested: Screenshot showing food preparation

3. `/media/videos/CE5847CE-3349-4C26-8792-C56BFAF29FDA.MP4`
   - Poster needed: `video-poster-3.jpg`
   - Suggested: Screenshot showing restaurant ambiance

4. `/media/videos/IMG_6983.MOV`
   - Poster needed: `video-poster-4.jpg`
   - Suggested: Screenshot from video

5. `/media/videos/IMG_0025.MOV`
   - Poster needed: `video-poster-5.jpg`
   - Suggested: Screenshot from video

## How to Create Video Posters

### Option 1: Using FFmpeg (Recommended)

```bash
# Extract first frame as poster
ffmpeg -i /path/to/video.MP4 -ss 00:00:01 -vframes 1 -q:v 2 video-poster-1.jpg

# Or extract a frame from a specific time
ffmpeg -i /path/to/video.MP4 -ss 00:00:05 -vframes 1 -q:v 2 video-poster-1.jpg
```

### Option 2: Using Online Tools

1. Upload video to https://www.freeconvert.com/video-to-jpg
2. Extract frame at desired timestamp
3. Download and save as `video-poster-X.jpg`

### Option 3: Manual Screenshot

1. Play video in video player
2. Pause at desired frame
3. Take screenshot
4. Save as `video-poster-X.jpg`

## Recommended Specifications

- **Size**: 1200x675px (16:9 aspect ratio)
- **Format**: JPEG
- **Quality**: 85%
- **File size**: < 200KB
- **Content**: Should represent the video content clearly

## After Creating Posters

1. Save posters to this directory: `/public/images/placeholders/`
2. Update paths in `/lib/data/galleryMedia.ts` if needed
3. Test video playback to ensure posters display correctly
