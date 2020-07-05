// Credits: https://github.com/axtgr/do-nothing-loader/blob/master/index.js

export default function(source) {
  this.cacheable && this.cacheable();
  return source;
};
