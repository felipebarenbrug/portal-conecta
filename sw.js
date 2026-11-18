/* Service worker do Portal Conecta: só notificações (não guarda páginas em cache) */
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("push",e=>{let d={};try{d=e.data?e.data.json():{};}catch(_){d={corpo:e.data?e.data.text():""};}
  const titulo=d.titulo||"Portal Conecta";
  e.waitUntil(self.registration.showNotification(titulo,{body:d.corpo||"",icon:"icones/icone-192.png",badge:"icones/badge-96.png",tag:d.tag||undefined,renotify:!!d.tag,data:{url:d.url||"/"}}));});
self.addEventListener("notificationclick",e=>{e.notification.close();const url=new URL((e.notification.data&&e.notification.data.url)||"/",self.location.origin).href;
  e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(L=>{for(const c of L){if(c.url.startsWith(self.location.origin)&&"focus" in c){c.navigate(url).catch(()=>{});return c.focus();}}return self.clients.openWindow(url);}));});
