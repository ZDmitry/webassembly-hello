let HEAP8 = new Uint8Array();

const imports = {
  env: {
    memoryBase: 0,
    tableBase: 0,
    memory: new WebAssembly.Memory({
      initial: 256
    }),
    table: new WebAssembly.Table({
      initial: 0,
      element: 'anyfunc'
    }),
    _puts: (c) => console.log(asciiToString(c))
  }
};

function asciiToString(ptr) {
  let str = '';
  while (1) {
    let ch = HEAP8[((ptr++)>>0)];
    if (!ch) return str;
    str += String.fromCharCode(ch);
  }
}

function fetchAndInstantiate(url) {
  return fetch(url)
    .then(response => response.arrayBuffer())
    .then(bytes => WebAssembly.instantiate(bytes, imports))
    .then(module => {
      let _inst = module.instance;
      let _app  = _inst && _inst.exports;

      let _init = _app['__post_instantiate'];
      _init && _init();

      HEAP8 = new Uint8Array(imports.env.memory.buffer);
      _app._main();
    });
}

fetchAndInstantiate('hello.wasm');
