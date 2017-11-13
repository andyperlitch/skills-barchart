require("fmd2")({
    target: "dist",
    trim_whitespace: true,
    new_line: "unix",
    indent: 2
  })
  .vendor("d3", "d3")
  .define("skills-barchart", ["dist/index.js"], {
    depends: {
      "d3": "d3"
    },
    exports: "SkillsBarChart",
    global: "SkillsBarChart"
  })
  .build();