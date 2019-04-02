# Webcomponents on IE11

This code is an example of how to setup a development with the following guidelines and requirements:

**Requirements**:

- Runs on IE11.
- Self contained file (no network requests).
- Runs from filesystem.

**Guidelines**

- Use Javascript.
- Development environment runs from source code on "modern" browsers.
- Use native capabilities as much as possible.
- Build should be a final step where source will be transpiled, concatenated and smooshed into a single file.
- Build should be imperative rather than declarative (`gulp` over `grunt`).
