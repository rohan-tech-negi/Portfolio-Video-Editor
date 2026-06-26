// @/lib/clientWork.js
import { getVideoURL, getPosterURL } from "@/lib/cloudinary";

const rawClientProjects = [
  {
    id: 1,
    client: "Aura Apparel",
    role: "Cinematic commercial showcase for the winter drop.",
    publicId: "client_3_b70zps",
  },
  {
    id: 2,
    client: "Apex Sports",
    role: "High-octane commercial reel with dynamic sound design.",
    publicId: "client_1_fq7umu",
  },
  {
    id: 3,
    client: "Neo City",
    role: "Urban cyberpunk mood film capturing late-night vibes.",
    publicId: "client_2_xeqs2m",
  },
];

export const clientProjects = rawClientProjects.map((p) => ({
  ...p,
  loopVideo: getVideoURL(p.publicId, { width: 800, quality: "auto", format: "auto", crop: "fill", aspect: "9:16" }),
  modalVideo: getVideoURL(p.publicId, { width: 1200, quality: "auto", format: "auto", crop: "fill", aspect: "9:16" }),
  poster: getPosterURL(p.publicId, { width: 800, crop: "fill", aspect: "9:16" }),
}));
