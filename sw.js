const C='cdc-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon-192.png'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||!(u.origin===location.origin||u.hostname==='www.gstatic.com'||u.hostname==='cdnjs.cloudflare.com'))return;
 e.respondWith(caches.open(C).then(async c=>{const m=await c.match(r);const f=fetch(r).then(n=>{if(n.ok||n.type==='opaque')c.put(r,n.clone());return n}).catch(()=>m);return m||f}))});
