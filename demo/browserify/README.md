Demo: skills-barchart with browserify
=====================================

Building the demo
-----------------

1. Ensure you are in this directory (`demo/browserify`), and install dependencies:

  ```bash
  npm install
  ```

2. Due to [this issue](https://github.com/d3/d3-request/issues/24), you must add the following line to `node_modules/d3-request/package.json`:

  ```
  "browser": "build/d3-request.js"
  ```

3. Run the `build` npm script to create the bundle file referenced in `index.html` of this demo:

  ```bash
  npm run build
  ```


Running the demo
----------------

In the root folder of this project, run:

```bash
npm run demo
```

Then navigate to [http://127.0.0.1:8080/demo/browserify](http://127.0.0.1:8080/demo/browserify).