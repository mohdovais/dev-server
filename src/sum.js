export function sum() {
  return Array.prototype.slice.call(arguments).reduce(function(sum, item) {
    return sum + item;
  }, 0);
}

