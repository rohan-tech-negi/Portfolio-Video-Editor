// @/lib/clientWork.js
import { getVideoURL, getPosterURL } from "@/lib/cloudinary";

const rawClientProjects = [
  {
    id: 1,
    client: "Sukhbir vs Samay Raina",
    role: "Laughing challenge between Sukhbir and Samay Raina",
    publicId: "client_3_b70zps",
    instagramUrl: "https://www.threads.com/@sukhbir_singer/post/DW85KlGDKlN?xmt=AQG0Q9TWjrDiyZeeW5pthI2Hn9fpHlidVHSRTjxa5o9nqw",
  },
  {
    id: 2,
    client: "Anupam Kher",
    role: "Showreel for Anupam Kher",
    publicId: "client_1_fq7umu",
    // instagramUrl: "https://www.instagram.com/risky.wipe/",
  },
  {
    id: 3,
    client: "Bag Promotion Video",
    role: "Cinematic video for the promotion of a bag",
    publicId: "client_2_xeqs2m",
    instagramUrl: "https://www.instagram.com/reel/DY6TrtvzEVp/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
];

export const clientProjects = rawClientProjects.map((p) => ({
  ...p,
  loopVideo: getVideoURL(p.publicId, { width: 800, quality: "auto", format: "auto", crop: "fill", aspect: "9:16" }),
  modalVideo: getVideoURL(p.publicId, { width: 1200, quality: "auto", format: "auto", crop: "fill", aspect: "9:16" }),
  poster: getPosterURL(p.publicId, { width: 800, crop: "fill", aspect: "9:16" }),
}));
