# webassembly-hello

1. Install Emscripten tools following by [instruction](http://kripken.github.io/emscripten-site/docs/getting_started/downloads.html)

2. Compile example:<br/>
`emcc hello.c -lm -Os -s WASM=1 -s SIDE_MODULE=1 -s EXPORTED_FUNCTIONS="['_main']" -o hello.wasm`

3. Start server:<br/>
`node server.js`

### Live Example

You can check live [example](https://zdmitry.github.io/webassembly-hello/hello.html)
