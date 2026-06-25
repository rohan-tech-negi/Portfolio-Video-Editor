// @/lib/clientWork.js
import { getVideoURL, getPosterURL } from "@/lib/cloudinary";

const rawClientProjects = [
  {
    id: 1,
    client: "Aura Apparel",
    role: "Cinematic commercial showcase for the winter drop.",
    publicId: "craft_y7qo5k",
  },
  {
    id: 2,
    client: "Apex Sports",
    role: "High-octane commercial reel with dynamic sound design.",
    publicId: "moneytalks_fv4do2",
  },
  {
    id: 3,
    client: "Neo City",
    role: "Urban cyberpunk mood film capturing late-night vibes.",
    publicId: "toh_kya_badla_wgzb8s",
  },
];

export const clientProjects = rawClientProjects.map((p) => ({
  ...p,
  loopVideo: getVideoURL(p.publicId, { width: 800, quality: "auto", format: "auto", crop: "fill", aspect: "9:16" }),
  modalVideo: getVideoURL(p.publicId, { width: 1200, quality: "auto", format: "auto", crop: "fill", aspect: "9:16" }),
  poster: getPosterURL(p.publicId, { width: 800, crop: "fill", aspect: "9:16" }),
}));
