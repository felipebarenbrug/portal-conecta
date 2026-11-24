/* Service worker do Portal Conecta: só notificações (não guarda páginas em cache) */
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("push",e=>{let d={};try{d=e.data?e.data.json():{};}catch(_){d={corpo:e.data?e.data.text():""};}
  const titulo=d.titulo||"Portal Conecta";
  e.waitUntil(self.registration.showNotification(titulo,{body:d.corpo||"",icon:"icones/icone-192.png",badge:"icones/badge-96.png",tag:d.tag||undefined,renotify:!!d.tag,data:{url:d.url||"/"}}));});
self.addEventListener("notificationclick",e=>{e.notification.close();const url=new URL((e.notification.data&&e.notification.data.url)||"/",self.location.origin).href;
  /* guarda o texto da notificação para o portal mostrar ao abrir (fica só neste aparelho) */
  const guarda=caches.open("pc-notif").then(c=>c.put("/__ultima-notificacao",new Response(JSON.stringify({t:e.notification.title||"",b:e.notification.body||"",em:Date.now()}),{headers:{"Content-Type":"application/json"}}))).catch(()=>{});
  e.waitUntil(guarda.then(()=>self.clients.matchAll({type:"window",includeUncontrolled:true}).then(L=>{for(const c of L){if(c.url.startsWith(self.location.origin)&&"focus" in c){try{c.postMessage({tipo:"push-click",url});}catch(_){}return c.focus();}}return self.clients.openWindow(url);})));});
