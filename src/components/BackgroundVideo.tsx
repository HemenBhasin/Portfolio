import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

// ==========================================
// 🎥 BACKGROUND VIDEO SETTINGS
// ==========================================

// Original HLS Video
export const ORIGINAL_HLS = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

// Paste your new Cloudfront links here:
export const CLOUDFRONT_1 = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_055001_8e16d972-3b2b-441c-86ad-2901a54682f9.mp4';
export const CLOUDFRONT_2 = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4';
export const CLOUDFRONT_3 = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4';
export const CLOUDFRONT_4 = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260505_105838_084968f2-4415-42a4-971a-3bec54539549.mp4';
export const CLOUDFRONT_5 = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_102933_4e8f73b5-775a-4179-b2fb-472f59063dcd.mp4';
export const CLOUDFRONT_6 = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4';
// 👉 Change this variable to test different videos!
// Examples: ORIGINAL_HLS, CLOUDFRONT_1, CLOUDFRONT_2, etc.
const ACTIVE_VIDEO_URL = CLOUDFRONT_1;

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ACTIVE_VIDEO_URL || ACTIVE_VIDEO_URL.includes('PASTE_YOUR_')) return;

    // Check if the link is an HLS stream (.m3u8)
    if (ACTIVE_VIDEO_URL.includes('.m3u8')) {
      if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
        hls.loadSource(ACTIVE_VIDEO_URL);
        hls.attachMedia(video);
        return () => hls.destroy();
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = ACTIVE_VIDEO_URL;
      }
    } else {
      // For standard MP4s / Cloudfront links
      video.src = ACTIVE_VIDEO_URL;
      video.load(); // Explicitly load the new source
    }
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* Subtle darkening overlay so the video isn't too bright */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
        }}
      />
    </div>
  );
}
