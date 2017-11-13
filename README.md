SkillsBarChart
==============

A simple chart written in d3 that can graph skills from "Novice" to "Expert" level:

![sample screenshot of demo](https://raw.githubusercontent.com/andyperlitch/skills-barchart/master/demo.gif)


Usage
-----


Install with npm:

```bash
npm i skills-barchart
```


This module will work when added as a **global** (with a `<script>` tag, i.e. no module loader) as long as `d3` version >=4 is included on the page as well. It will also work in ESNext, commonJS, and TypeScript environments. See the `demos/` folder for individual examples.

Here is an example of how to create a new chart:

```js

// Create the chart instance
const chart = new SkillsBarChart();

// Calls can be chained:
chart
  
  // Set the target HTML element
  .target('#my-chart-id')

  // Set the data, should be an array of ICategoryData
  // (see `dist/skills-barchart.d.ts` for the type definition).
  .data(myChartData)

  // Render the graph
  .render();

```


Running the Demo
----------------

1. Install devDependencies

  ```
  npm install
  ```

2. Due to [this issue](https://github.com/d3/d3-request/issues/24), you must add the following line to `node_modules/d3-request/package.json`:

  ```
  "browser": "build/d3-request.js"
  ```

3. Run the demo server

  ```
  npm run demo
  ```

4. Navigate to any of these URLs:

    - http://127.0.0.1:8080/demo/global/
    - http://127.0.0.1:8080/demo/browserify/
    - http://127.0.0.1:8080/demo/webpack-es6/
    - http://127.0.0.1:8080/demo/webpack-ts/


Building the Project
--------------------

To build the dist files:

```
npm run build
```



License
-------------------

MIT