// @/lib/projects2.js
import { getVideoURL, getPosterURL } from "@/lib/cloudinary";

const rawProjects = [
  { id: 1, title: "Craft",         category: "Motion Graphics", publicId: "craft_y7qo5k" },
  { id: 2, title: "Star Wars",     category: "Cinematic 3D",    publicId: "StarWars_yomju6" },
  { id: 3, title: "Toh Kya Badla", category: "Cinematic",       publicId: "toh_kya_badla_wgzb8s" },
  { id: 4, title: "Money Talks",   category: "Motion Graphics", publicId: "moneytalks_fv4do2" },,
  
];

export const loopProjects = rawProjects.map((p) => ({
  ...p,
  loopVideo: getVideoURL(p.publicId, { width: 800, quality: "auto", format: "auto" }),
  poster: getPosterURL(p.publicId, 1200),
}));