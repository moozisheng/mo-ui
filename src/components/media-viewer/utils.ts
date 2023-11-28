export interface ImageItem {
  src: string;
  thumbnailSrc?: string;
}

export interface VideoItem {
  src: string;
  poster?: string;
}

export interface AudioItem extends VideoItem {}
export interface PDFItem extends VideoItem {}

export const getVideos = (
  videos: Array<VideoItem | string> | undefined,
): Array<{ src: string; poster: string }> => {
  if (!videos) {
    return [];
  }

  return videos?.map((item) => {
    if (typeof item === 'string') {
      return {
        src: item,
        poster: item,
      };
    }

    return {
      src: item.src,
      poster: item.poster ?? item.src,
    };
  });
};

export const getImages = (
  images: Array<ImageItem | string> | undefined,
): Array<ImageItem> => {
  if (!images) {
    return [];
  }

  return images.map((item) => {
    if (typeof item === 'string') {
      return {
        src: item,
        thumbnailSrc: item,
      };
    }

    return {
      ...item,
      thumbnailSrc: item.thumbnailSrc ?? item.src,
    };
  });
};

export const getAudios = (
  audios: Array<AudioItem | string> | undefined,
): Array<AudioItem> => {
  if (!audios) {
    return [];
  }

  return audios.map((item) => {
    if (typeof item === 'string') {
      return {
        src: item,
      };
    }

    return {
      ...item,
    };
  });
};

export const getPDFs = (
  audios: Array<PDFItem | string> | undefined,
): Array<PDFItem> => {
  if (!audios) {
    return [];
  }

  return audios.map((item) => {
    if (typeof item === 'string') {
      return {
        src: item,
      };
    }

    return {
      ...item,
    };
  });
};
