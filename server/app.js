const polka = require("polka");

const debug = require("./debug");
const proxy = require("./proxy");

module.exports = polka().use(debug, proxy);
