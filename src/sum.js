export function sum() {
  return Array.prototype.reduce.call(
    arguments,
    function(sum, item) {
      return sum + item;
    },
    0
  );
}
