const CLOUD_NAME = "dq9zasmw3";

const baseURL = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`;

export const getVideoURL = (
  publicId,
  { width = 1200, quality = "auto", format = "auto", streaming = false } = {}
) => {
  if (streaming) {
    return `${baseURL}/sp_auto/${publicId}.m3u8`;
  }

  return `${baseURL}/f_${format},q_${quality},w_${width}/${publicId}.mp4`;
};

export const getPosterURL = (publicId, width = 1200) => {
  return `${baseURL}/so_2,w_${width}/${publicId}.jpg`;
};