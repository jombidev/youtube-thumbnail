'use strict';

const test = require('tape');
const imageDimensions = require('request-image-size');
const youtubeThumbnail = require('./');

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
    imageDimensions(thumbnail[size].url, function (err, dimensions) {
      t.equal(thumbnail[size].height, dimensions.height, 'Height for size: ' + size);
      t.equal(thumbnail[size].width, dimensions.width, 'Width for size: ' + size);
    });
  });
});
