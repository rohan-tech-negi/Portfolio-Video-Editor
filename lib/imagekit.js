// lib/imagekit.ts

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

export const getOptimizedVideoUrl = () => {
  if (!filePath) return "";
  return `${urlEndpoint}/${filePath}?tr=q-auto,f-auto`;
};

export const getHlsVideoUrl = () => {
  if (!filePath) return "";
  return `${urlEndpoint}/${filePath}/ik-master.m3u8`;
};