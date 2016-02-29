/*global require */

var gulp = require("gulp");
// Js
var browserify = require("browserify");
var source = require("vinyl-source-stream");

var bundles = {
  project_scripts: ["js/index.js"]
};

gulp.task("scripts", function() {
  // project bundle
  browserify(bundles.project_scripts).
    bundle().
    pipe(source("index.js")).
    pipe(gulp.dest(""));
});

gulp.task("default", ["scripts"]);
