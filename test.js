'use strict';

import fetch from "node-fetch";
import test from "tape";
import {imageSize} from "image-size";
import youtubeThumbnail from "./index.js";

const sizes = [
  'default',
  'medium',
  'high',
  'max'
];

test('match example cases', function (t) {
  t.plan(sizes.length * 2);

  const thumbnail = youtubeThumbnail('https://www.youtube.com/watch?v=9bZkp7q19f0');

  sizes.forEach(function (size) {
    fetch(thumbnail[size].url)
      .then(res => res.arrayBuffer())
      .then(res => Buffer.from(res))
      .then(res => imageSize(res))
      .then((dimensions) => {
        t.equal(thumbnail[size].height, dimensions.height, 'Height for size: ' + size);
        t.equal(thumbnail[size].width, dimensions.width, 'Width for size: ' + size);
      });
  });
});
