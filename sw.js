// Feval en Terreno: guarda la app en el celular para que abra rápido.
// Siempre intenta traer la versión nueva; si no hay señal, abre la última guardada.
var CACHE = "feval-v12";
var BASE = ["./", "index.html", "tp.html", "muebles.html", "pedidos.html", "rutero.html", "clientes.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png"];
var FOTOS = ["0213.jpg", "0216.jpg", "0217.jpg", "0231.jpg", "0232.jpg", "0399.jpg", "0532.jpg", "0727.jpg", "0728.jpg", "0837.jpg", "0838.jpg", "0841.jpg", "0930.jpg", "116.jpg", "1178.jpg", "1179.jpg", "1231.jpg", "133.jpg", "134.jpg", "1417-1.jpg", "1417-4.jpg", "173-2.jpg", "2052.jpg", "2086.jpg", "2104.jpg", "2108.jpg", "212.jpg", "2178.jpg", "2181.jpg", "2182.jpg", "2339.jpg", "2550.jpg", "2577-3.jpg", "2577.jpg", "2662.jpg", "2667.jpg", "3000.jpg", "3001.jpg", "3002.jpg", "3004.jpg", "3007.jpg", "3012.jpg", "3015.jpg", "3016.jpg", "3020.jpg", "3021.jpg", "3173.jpg", "3570.jpg", "3571.jpg", "3572-0.jpg", "3584.jpg", "3589.jpg", "3590-0.jpg", "3605.jpg", "3609.jpg", "3612.jpg", "3613.jpg", "3614.jpg", "3627.jpg", "3629.jpg", "3631-9.jpg", "3631.jpg", "3632.jpg", "3633.jpg", "3643.jpg", "3644-0.jpg", "3647.jpg", "3650.jpg", "3651.jpg", "3653.jpg", "3654.jpg", "3658.jpg", "3659.jpg", "3660.jpg", "3663.jpg", "3664.jpg", "3668-01.jpg", "3670.jpg", "3672-0.jpg", "3676-0.jpg", "3678-0.jpg", "3680-0.jpg", "3681-0.jpg", "3684.jpg", "3685.jpg", "3686-0.jpg", "3692.jpg", "3696-0.jpg", "3705-01.jpg", "3862.jpg", "3885.jpg", "4015.jpg", "4112.jpg", "4196.jpg", "4302.jpg", "4666-9.jpg", "4669-4.jpg", "4669-5.jpg", "4671-6.jpg", "4673.jpg", "4675.jpg", "4676.jpg", "502.jpg", "5081.jpg", "5094.jpg", "511.jpg", "5212.jpg", "548.jpg", "549.jpg", "5637.jpg", "5638.jpg", "5642.jpg", "567.jpg", "5783.jpg", "5866.jpg", "5881.jpg", "5882.jpg", "5901.jpg", "591.jpg", "592.jpg", "608.jpg", "6175.jpg", "6191.jpg", "6295.jpg", "6296.jpg", "6355.jpg", "6432-1.jpg", "6432-5.jpg", "6489.jpg", "6582.jpg", "6589.jpg", "6591.jpg", "6598.jpg", "6635.jpg", "6692.jpg", "6725.jpg", "6728.jpg", "6729.jpg", "6732.jpg", "6733.jpg", "6754-0.jpg", "6768.jpg", "6813.jpg", "6819.jpg", "6820.jpg", "6829.jpg", "6835.jpg", "6836.jpg", "6894.jpg", "6895.jpg", "6896.jpg", "6898.jpg", "6961.jpg", "6978.jpg", "7001.jpg", "7002.jpg", "7022.jpg", "7229.jpg", "741.jpg", "756.jpg", "757.jpg", "7582.jpg", "7598.jpg", "7599.jpg", "761.jpg", "7629.jpg", "7673.jpg", "7727.jpg", "7728.jpg", "7729.jpg", "7838.jpg", "7845.jpg", "7846.jpg", "7946.jpg", "7947.jpg", "7949.jpg", "7950.jpg", "7951.jpg", "7955.jpg", "7960.jpg", "7968.jpg", "7969.jpg", "7981.jpg", "7982.jpg", "7989-2.jpg", "7989-3.jpg", "8005-01.jpg", "801.jpg", "8079.jpg", "810.jpg", "8109.jpg", "8116.jpg", "8117.jpg", "8125.jpg", "8160.jpg", "8199.jpg", "8239.jpg", "8240.jpg", "8243.jpg", "832.jpg", "8384.jpg", "8395.jpg", "8481.jpg", "8482.jpg", "8485.jpg", "8486.jpg", "8501.jpg", "8584.jpg", "8585.jpg", "863.jpg", "8664.jpg", "8733.jpg", "8746.jpg", "877.jpg", "8787.jpg", "8789.jpg", "8795.jpg", "8826.jpg", "8834.jpg", "8882.jpg", "8918.jpg", "9000.jpg", "9063.jpg", "9068.jpg", "9071.jpg", "9072.jpg", "9073.jpg", "9076.jpg", "940-0.jpg", "9448.jpg", "9455.jpg", "950.jpg", "952-0.jpg", "956.jpg", "9585.jpg", "9586.jpg", "9587.jpg", "9588.jpg", "9605.jpg", "9656.jpg", "9657.jpg", "9658.jpg", "9724-1.jpg", "9890.jpg", "9902.jpg", "992-0.jpg"];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    // Las fotos del catálogo se guardan de a poco, sin frenar la instalación: así el catálogo funciona sin señal.
    FOTOS.forEach(function (f) { c.add("cat/" + f).catch(function () {}); });
    return c.addAll(BASE);
  }));
  self.skipWaiting();
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});
self.addEventListener("fetch", function (e) {
  var u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== self.location.origin) return;
  e.respondWith(fetch(e.request).then(function (r) {
    var copia = r.clone();
    caches.open(CACHE).then(function (c) { c.put(e.request, copia); });
    return r;
  }).catch(function () {
    return caches.match(e.request).then(function (m) { return m || caches.match("index.html"); });
  }));
});
