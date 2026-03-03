import { getVideoURL, getPosterURL } from "@/lib/cloudinary";

const rawProjects = [
  {
    id: 1,
    title: "Craft",
    category: "Motion Graphics",
    publicId: "craft_y7qo5k",
  },
  {
    id: 2,
    title: "Star Wars",
    category: "Cinematic Edit",
    publicId: "StarWars_yomju6",
  },
  {
    id: 3,
    title: "Toh Kya Badla",
    category: "Music Video",
    publicId: "toh_kya_badla_wgzb8s",
  },
  {
    id: 4,
    title: "Money Talks",
    category: "Commercial",
    publicId: "moneytalks_fv4do2",
  },
];

export const projects = rawProjects.map((project) => ({
  ...project,

  // Light version for grid preview
  gridVideo: getVideoURL(project.publicId, {
    width: 800,
    quality: "low",
  }),

  // High quality for modal
  modalVideo: getVideoURL(project.publicId, {
    width: 1600,
  }),

  poster: getPosterURL(project.publicId, 1200),
}));