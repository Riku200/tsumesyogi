// Standard Emscripten PThread worker stub
// Allows the WASM module to spawn threads
var Module = {};
self.onmessage = function (e) {
  if (e.data.cmd === "load") {
    // Import the main script
    self.importScripts(e.data.urlOrBlob || e.data.url || 'yaneuraou.halfkp.noeval.js');
    // Initialize the thread
    var instance = YaneuraOu_HalfKP_noeval(Module);
    if (instance) {
       instance.then(function(module) {
           // Provide the message to the module
           module.PThread.receiveObjectTransfer(e.data);
           module.PThread.loadWasmModuleToWorker(e.data);
       });
    }
  }
};
