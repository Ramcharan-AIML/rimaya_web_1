import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP fallback. AVIF encodes ~20% smaller than WebP but takes
    // longer, so the first request for a given size is slower and every one
    // after is served from cache. Worth it here: the art is photographic,
    // static, and shared across every visitor.
    formats: ["image/avif", "image/webp"],
    // The source files only change when someone replaces them, and doing so
    // changes the build hash - so optimised output is safe to hold onto.
    minimumCacheTTL: 31536000, // 1 year
  },

  // NOTE: experimental.inlineCss was measured and rejected. The stylesheet is
  // only ~12.5KB gzipped, but inlining grew each page's HTML by ~204KB because
  // the flag emits the CSS twice (once in a <style> tag, once in the RSC
  // payload). A cached 12.5KB file from the edge beats that on every visit
  // after the first. Re-measure before reaching for it again.

  poweredByHeader: false,
};

export default nextConfig;
