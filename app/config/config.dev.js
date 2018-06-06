var config = {};

config.settings = {};

config.settings.appDir = process.env.APP_DIR || "implib";
config.settings.saveDir = process.env.SAVE_DIR || "tracks";

module.exports = config;
