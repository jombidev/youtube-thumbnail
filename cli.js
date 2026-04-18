#!/usr/bin/env node
'use strict';

const pkg = require('./package.json');
const open = require('open');
const youtubeThumbnail = require('./');
const argv = process.argv.slice(2);

function help() {
  console.log([
    '',
    '  ' + pkg.description,
    '',
    '  Example',
    '    youtube-thumbnail https://www.youtube.com/watch?v=9bZkp7q19f0',
    '       =>  https://img.youtube.com/vi/9bZkp7q19f0/default.jpg',
    '',
    '    youtube-thumbnail https://www.youtube.com/watch?v=9bZkp7q19f0 --high --open',
    '       =>  https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg',
    '',
    '  Options',
    '    --open',
    '          opens the thumbnail image in your browser',
    '',
    '    --medium',
    '          returns the medium resolution thumbnail',
    '',
    '    --high',
    '          returns the high resolution thumbnail',
    '',
    '    --max',
    '          returns the max resolution thumbnail'
  ].join('\n'));
}

if (argv.indexOf('--help') !== -1) {
  help();
  return;
}

if (argv.indexOf('--version') !== -1) {
  console.log(pkg.version);
  return;
}

const openImage = (argv.indexOf('--open') !== -1);

const thumbnail = youtubeThumbnail(argv[0]);
let url = thumbnail.default.url;

if (argv.indexOf('--medium') !== -1) {
  url = thumbnail.medium.url;
}

if (argv.indexOf('--high') !== -1) {
  url = thumbnail.high.url;
}

if (argv.indexOf('--max') !== -1) {
  url = thumbnail.max.url;
}

console.log(url);

if (openImage) {
  return open(url);
}
