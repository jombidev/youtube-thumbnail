'use strict';

const ytRegex = /youtu\.?be/;
const patterns = [
  /youtu\.be\/([^#&?]{11})/,  // youtu.be/<id>
  /\?v=([^#&?]{11})/,         // ?v=<id>
  /&v=([^#&?]{11})/,         // &v=<id>
  /embed\/([^#&?]{11})/,      // embed/<id>
  /\/v\/([^#&?]{11})/         // /v/<id>
];

const getYouTubeID = function (url, opts) {
  if (!opts) {
    opts = {fuzzy: true};
  }

  if (ytRegex.test(url)) {
    // Look first for known patterns
    let i;

    // If any pattern matches, return the ID
    for (i = 0; i < patterns.length; ++i) {
      if (patterns[i].test(url)) {
        return patterns[i].exec(url)[1];
      }
    }

    if (opts.fuzzy) {
      // If that fails, break it apart by certain characters and look
      // for the 11 character key
      const tokens = url.split(/[\/&?=#.\s]/g);
      for (i = 0; i < tokens.length; ++i) {
        if (/^[^#&?]{11}$/.test(tokens[i])) {
          return tokens[i];
        }
      }
    }
  }

  return null;
};

function youtubeThumbnail(url) {
  let id = getYouTubeID(url);

  if (!id && url.length === 11) {
    id = url;
  }

  return {
    'default': {
      url: 'https://img.youtube.com/vi/' + id + '/default.jpg',
      width: 120,
      height: 90
    },
    medium: {
      url: 'https://img.youtube.com/vi/' + id + '/mqdefault.jpg',
      width: 320,
      height: 180
    },
    high: {
      url: 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg',
      width: 480,
      height: 360
    },
    max: {
      url: 'https://img.youtube.com/vi/' + id + '/maxresdefault.jpg',
      width: 1280,
      height: 720
    }
  };
}

export {youtubeThumbnail};
export default youtubeThumbnail;
