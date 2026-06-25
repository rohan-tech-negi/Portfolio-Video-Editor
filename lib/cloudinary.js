const CLOUD_NAME = "dq9zasmw3";

const baseURL = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`;

export const getVideoURL = (
  publicId,
  { width = 1200, quality = "auto", format = "auto", streaming = false, crop, aspect } = {}
) => {
  if (streaming) {
    return `${baseURL}/sp_auto/${publicId}.m3u8`;
  }

  let transformStr = `f_${format},q_${quality}`;
  if (width) transformStr += `,w_${width}`;
  if (crop) transformStr += `,c_${crop}`;
  if (aspect) transformStr += `,ar_${aspect}`;

  return `${baseURL}/${transformStr}/${publicId}.mp4`;
};

export const getPosterURL = (publicId, widthOrOptions = 1200) => {
  let width = 1200;
  let crop = null;
  let aspect = null;

  if (typeof widthOrOptions === 'object') {
    width = widthOrOptions.width ?? 1200;
    crop = widthOrOptions.crop;
    aspect = widthOrOptions.aspect;
  } else {
    width = widthOrOptions;
  }

  let transformStr = `so_2,w_${width}`;
  if (crop) transformStr += `,c_${crop}`;
  if (aspect) transformStr += `,ar_${aspect}`;

  return `${baseURL}/${transformStr}/${publicId}.jpg`;
};