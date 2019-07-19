'use strict';var sz={TAB:0,Mj:1,hn:2},tz=function(a){Ab("MediaRouter.CastStreaming.Start.Success",a,sz)};var uz=fb("mr.mirror.cast.LogUploader"),wz=function(a,b,c){vz("raw_events.log.gz",a,b,c);return b?"https://crash.corp.google.com/samples?reportid=&q="+encodeURIComponent("UserComments='"+b+"'"):""},vz=function(a,b,c,d){if(0==b.size)uz.info("Trying to upload an empty file to Crash"),d&&d(null);else{var e=new FormData;e.append("prod","Cast");e.append("ver",chrome.runtime.getManifest().version);e.append(a,b);c&&e.append("comments",c);Ww("https://clients2.google.com/cr/report",function(a){a=a.target;
var c=null;fx(a)?(c=gx(a),uz.info("Upload to Crash succeeded: "+c)):uz.info("Upload to Crash failed. HTTP status: "+a.Ta());d&&d(c)},"POST",e,void 0,3E4)}};var xz=function(){this.b=0;Nl(this)},zz=function(){yz||(yz=new xz);return yz},Az=function(){var a=zz(),b={fraction:.01,autoSubmitTimeLimitMillis:6048E5},c=b.autoSubmitTimeLimitMillis,d=Date.now();return a.b&&c&&d-a.b<c?!1:Math.random()<b.fraction};xz.prototype.Fa=function(){return"mirror.cast.LogUtils"};xz.prototype.jb=function(){return[void 0,{lastAutoSubmitMillis:this.b}]};xz.prototype.ib=function(){var a=Ll(this);this.b=a&&a.lastAutoSubmitMillis||0};var yz=null;fb("mr.mirror.cast.LogUtils");var Bz={jw:"OFFER",gs:"ANSWER",Mw:"PRESENTATION",Yt:"GET_STATUS",Xx:"STATUS_RESPONSE",Xt:"GET_CAPABILITIES",Gs:"CAPABILITIES_RESPONSE",yx:"RPC"};var Cz=function(){this.capabilities=this.status=this.b=this.error=this.rpc=this.result=this.type=this.f=this.sessionId=null},Fz=function(a){try{if("string"!==typeof a)throw SyntaxError("Cannot parse non-string as JSON");var b;Dz(JSON.parse(a),function(a){b=Ez(a)},function(){throw Error("non-Object result from JSON parse");});return b}catch(d){var c=d instanceof SyntaxError?"JSON parse error: "+d.message:"Type coercion error: "+d.message}"string"==typeof a?a="a string: "+a:a instanceof ArrayBuffer?
(a=new Uint8Array(a),a="an ArrayBuffer whose base64 is "+btoa(String.fromCharCode.apply(null,a))):a="of invalid data type "+typeof a;throw Error(c+". Input was "+a);},Ez=function(a){var b=new Cz;null!=a.sessionId&&(b.sessionId=String(a.sessionId));Gz(a.seqNum,function(a){b.f=a},function(){throw Error('"seqNum" must be a number');});if("type"in a){for(var c=String(a.type).toUpperCase(),d=k(Object.keys(Bz)),e=d.next();!e.done;e=d.next())if(Bz[e.value]==c){b.type=c;break}if(!b.type)throw Error('not a known message "type"');
}"result"in a&&(b.result=String(a.result));if("rpc"in a){if("string"!==typeof a.rpc)throw Error('"rpc" must be a String containing a base64 payload');b.rpc=new Uint8Array([].concat(m(atob(a.rpc))).map(function(a){return a.charCodeAt(0)}))}Dz(a.error,function(a){b.error=Hz(a)},function(){throw Error('"error" must be an Object');});Dz(a.answer,function(a){b.b=Iz(a)},function(){throw Error('"answer" must be an Object');});Dz(a.status,function(a){b.status=Jz(a)},function(){throw Error('"status" must be an Object');
});Dz(a.capabilities,function(a){b.capabilities=Kz(a)},function(){throw Error('"capabilities" must be an Object');});return b},Dz=function(a,b,c){void 0!==a&&(a instanceof Object?b(a):c())},Gz=function(a,b,c){void 0!==a&&("number"!==typeof a?c():b(a))},Lz=function(a,b,c){void 0!==a&&(a instanceof Array&&a.every(function(a){return"number"===typeof a})?b(a):c())},Mz=function(a,b,c){void 0!==a&&(a instanceof Array?b(a.map(function(a){return String(a)})):c())},Nz=function(){this.j=null;this.b=[];this.f=
[];this.g=this.h=this.w=null},Iz=function(a){var b=new Nz;Gz(a.udpPort,function(a){b.j=a},function(){throw Error('"answer.udpPort" must be a number');});Lz(a.sendIndexes,function(a){b.b=a},function(){throw Error('"answer.sendIndexes" must be an array of numbers');});Lz(a.ssrcs,function(a){b.f=a},function(){throw Error('"answer.ssrcs" must be an array of numbers');});"IV"in a&&(b.w=String(a.IV));"receiverGetStatus"in a&&(b.h="true"==String(a.receiverGetStatus).toLowerCase());"castMode"in a&&(b.g=String(a.castMode));
return b},Oz=function(){this.details=this.description=this.code=null},Hz=function(a){var b=new Oz;Gz(a.code,function(a){b.code=a},function(){throw Error('"error.code" must be a number');});"description"in a&&(b.description=String(a.description));Dz(a.details,function(a){b.details=a},function(){throw Error('"error.details" must be an Object');});return b},Pz=function(){this.f=this.b=null},Jz=function(a){var b=new Pz;Gz(a.wifiSnr,function(a){b.b=a},function(){throw Error('"status.wifiSnr" must be a number');
});Lz(a.wifiSpeed,function(a){b.f=a},function(){throw Error('"status.wifiSpeed" must be an array of numbers');});return b},Qz=function(){this.f=this.b=null},Kz=function(a){var b=new Qz;Mz(a.mediaCaps,function(a){b.b=a},function(){throw Error('"capabilities.mediaCaps" must be an array');});if("keySystems"in a){a=a.keySystems;if(!(a instanceof Array))throw Error('"capabilities.keySystems" must be an array');b.f=a.map(function(a){var c;Dz(a,function(a){c=Rz(a)},function(){throw Error('"capabilities.keySystems" entries must be *Objects');
});return c})}return b},Sz=function(){this.g=this.m=this.w=this.j=this.u=this.b=this.o=this.f=this.initDataTypes=this.h=null},Rz=function(a){var b=new Sz;"keySystemName"in a&&(b.h=String(a.keySystemName));Mz(a.initDataTypes,function(a){b.initDataTypes=a},function(){throw Error('"capabilities.initDataTypes" must be an array');});Mz(a.codecs,function(a){b.f=a},function(){throw Error('"capabilities.codecs" must be an array');});Mz(a.secureCodecs,function(a){b.o=a},function(){throw Error('"capabilities.secureCodecs" must be an array');
});Mz(a.audioRobustness,function(a){b.b=a},function(){throw Error('"capabilities.audioRobustness" must be an array');});Mz(a.videoRobustness,function(a){b.u=a},function(){throw Error('"capabilities.videoRobustness" must be an array');});"persistentLicenseSessionSupport"in a&&(b.j=String(a.persistentLicenseSessionSupport));"persistentReleaseMessageSessionSupport"in a&&(b.w=String(a.persistentReleaseMessageSessionSupport));"persistentStateSupport"in a&&(b.m=String(a.persistentStateSupport));"distinctiveIdentifierSupport"in
a&&(b.g=String(a.distinctiveIdentifierSupport));return b};var Tz=function(a){this.l=fb("mr.mirror.cast.MessageDispatcher");this.h=a;this.b=null;this.f=new Map;this.g=0},Uz=function(a,b,c){if(a.f.has(b))throw Error("Attempt to multiple-subscribe to the same response type: "+b);a.f.set(b,c);a.g=0;mb(a.l,"Added subscriber for "+b+"-type messages.");a.b||(a.b=qy(a.h),a.b.onMessage=a.j.bind(a))},Vz=function(a,b){a.f.delete(b)&&mb(a.l,function(){return"Removed subscriber of "+b+"-type messages."});0==a.f.size&&a.b&&(a.b.Ya(),a.b=null)};
Tz.prototype.sendMessage=function(a){return this.b?"RPC"==a.type?this.b.sendMessage(a,{namespace:"urn:x-cast:com.google.cast.remoting"}):this.b.sendMessage(a,{namespace:"urn:x-cast:com.google.cast.webrtc"}):Promise.reject(Error("Require at least one subscriber before sending messages."))};
var Wz=function(a,b,c,d,e){var f=null,h=function(){Vz(a,c);null!=f&&(clearTimeout(f),f=null)};try{Uz(a,c,function(a){e(a)&&h()})}catch(l){e(null,l);return}f=setTimeout(function(){h();e(null,Error("timeout"))},d);a.sendMessage(b).catch(function(a){h();e(null,a)})};
Tz.prototype.j=function(a){if(a&&"string"===typeof a.namespace_&&a.namespace_.startsWith("urn:x-cast:com.google.cast.")){do{var b=void 0;try{b=Fz(a.data)}catch(d){b=d.message;break}if(b.type){var c=this.f.get(b.type);if(c)try{c(b);return}catch(d){b="Error thrown during delivery. Response was: "+(JSON.stringify(b)+". Error from subscriber callback ")+("was: "+d.message+".")}else b="Message was ignored: "+JSON.stringify(b)}else b="Message did not include response type: "+JSON.stringify(b)}while(0);
10>this.g?this.l.H(b):mb(this.l,b);++this.g}};var Xz=function(){this.b=Promise.resolve(1)},Zz=function(a,b,c){return Yz(a,function(a){return a==b},c)},$z=function(a,b){var c=[3,4];return Yz(a,function(a){return-1!=c.indexOf(a)},b)},aA=function(a,b){a.b=a.b.catch(function(){return 1});return Yz(a,function(){return!0},b)},Yz=function(a,b,c){var d,e,f=new Promise(function(a,c){d=a;e=c});a.b=a.b.then(function(a){if(!b(a))return e(Error("Operation requires a different starting checkpoint than "+a)),Promise.resolve(a);var f=new bA(a);try{var h=c(f)}catch(y){h=
Promise.reject(y)}return h.then(function(a){return d(a)},function(a){return e(a)}).then(function(){if(null===f.b)throw Error("A prior operation that started at "+(a+" did not complete."));return f.b})},function(a){e(a);throw a;});return f},bA=function(a){this.f=a;this.b=null},cA=function(a,b){a.b="number"===typeof b?b:a.f};var dA=chrome.cast.streaming,fA=function(a,b,c,d,e){this.J=a.sessionId;this.u=a.Of;this.O=a.Wd;this.g=b;this.R=c;this.G=d;this.T=eA(e,"onAnswer",this.u);this.Ea=eA(e,"onSessionStop",this.u);this.l=fb("mr.mirror.cast.StreamingLaunchWorkflow");this.D=new Xz;this.m=this.C=this.o=this.f=this.b=this.w=this.j=this.h=null};
fA.prototype.start=function(a,b,c){var d=this;if(!a&&!b)return Promise.reject(Error("No tracks to stream"));var e=a instanceof gA,f=b instanceof gA;(e&&b&&!f||f&&a&&!e)&&Fb("Mixing remoting and non-remoting tracks");return Zz(this.D,1,function(e){d.h=a;d.j=b;d.w=c;d.l.info(function(){return"Launching streaming for "+hA(d)+" "+("to a "+d.O+".")});return iA(d).then(d.F.bind(d)).then(function(a){return jA(d,a).then(function(c){d.T();var b=kA(d,c,a);d.b=lA(d,d.b,b);d.f=lA(d,d.f,b);if(!d.b&&!d.f)throw Error("Receiver did not select any offers from: "+
JSON.stringify(a));d.C=!!c.h;d.m=function(a,c){a==d.b?d.w.Ne("Audio stream (id="+a+") error: "+c):a==d.f&&d.w.Ne("Video stream (id="+a+") error: "+c)};dA.rtpStream.onError.addListener(d.m);return mA(d,c,b)})}).then(function(){d.l.info(function(){return"Launched streaming for "+hA(d)});d.w.mg(d);cA(e,2);return{vo:d.b,Qr:d.f}})})};
fA.prototype.stop=function(){var a=this;return aA(this.D,function(b){if(!a.h&&!a.j)return cA(b,1),Promise.resolve();a.l.info(function(){return"Stopping streaming for "+hA(a)+"."});a.m&&(dA.rtpStream.onError.removeListener(a.m),a.m=null);if(a.w){var c=a.w.Xg();a.w=null}else c=Promise.resolve();return c.then(function(){a.b&&(dA.rtpStream.stop(a.b),dA.rtpStream.destroy(a.b),a.b=null);a.f&&(dA.rtpStream.stop(a.f),dA.rtpStream.destroy(a.f),a.f=null);a.o&&(dA.udpTransport.destroy(a.o),a.o=null);a.Ea();
a.l.info(function(){return"Stopped streaming for "+hA(a)+"."});a.h=null;a.j=null;cA(b,1)})})};
var nA=function(a,b){var c=JSON.stringify(b);return Promise.all([a.b&&new Promise(function(b){return dA.rtpStream.getRawEvents(a.b,c,b)}),a.f&&new Promise(function(b){return dA.rtpStream.getRawEvents(a.f,c,b)})]).catch(function(c){a.l.error("Unexpected error when calling getRawEvents()",c);return[]}).then(function(a){return new Blob(a.filter(function(a){return!!a}),{type:"application/gzip"})})},oA=function(a){return Promise.all([a.b&&new Promise(function(b){return dA.rtpStream.getStats(a.b,b)}),a.f&&
new Promise(function(b){return dA.rtpStream.getStats(a.f,b)})]).catch(function(b){a.l.error("Unexpected error when calling getStats()",b);return[]}).then(function(a){return Object.assign.apply(Object,[{}].concat(m(a.filter(function(a){return!!a}))))})},hA=function(a){if(a.h&&a.j)var b="audio+video ";else if(a.h)b="audio-only ";else if(a.j)b="video-only ";else return"stopped";return a.h instanceof gA||a.j instanceof gA?b+"remoting":b+"streaming"},iA=function(a){return new Promise(function(b){var c=
function(c,e,f){c&&!a.h&&(dA.rtpStream.destroy(c),c=null);e&&!a.j&&(dA.rtpStream.destroy(e),e=null);a.l.info(function(){return"Created Cast Streaming session: audioStreamId="+c+", videoStreamId="+e+"."});a.b=c;a.f=e;a.o=f;b()};a.h instanceof gA||a.j instanceof gA?dA.session.create(null,null,c):dA.session.create(a.h,a.j,c)})};
fA.prototype.F=function(){for(var a=Cj(),b=Cj(),c=[],d=k([this.b,this.f]),e=d.next();!e.done;e=d.next())if(e=e.value)for(var f=e==this.b,h=f?127:96,l=f?Math.floor(499999*Math.random())+1:Math.floor(499999*Math.random())+500001,r=f?48E3:9E4,y=k(dA.rtpStream.getSupportedParams(e)),A=y.next();!A.done;A=y.next())A=A.value,A.payload.payloadType=h,A.payload.maxLatency=this.g.maxLatencyMillis,A.payload.minLatency=this.g.minLatencyMillis,A.payload.animatedLatency=this.g.animatedLatencyMillis,A.payload.ssrc=
l,A.payload.clockRate=r,A.payload.aesKey=a,A.payload.aesIvMask=b,f?(A.payload.channels=2,A.payload.maxBitrate=this.g.audioBitrate,A.payload.maxFrameRate=100):(A.payload.minBitrate=this.g.minVideoBitrate,A.payload.maxBitrate=this.g.maxVideoBitrate,A.payload.maxFrameRate=this.g.maxFrameRate),c.push(new pA(e,A));return c};
var lA=function(a,b,c){b&&!c.some(function(a){return a.Rf==b})&&(a.l.H("Destroying RTP stream not selected by the receiver: id="+b),dA.rtpStream.destroy(b),b=null);return b},jA=function(a,b){return new Promise(function(c,d){for(var e=[],f=0;f<b.length;++f){var h=b[f].params,l={index:f,codecName:h.payload.codecName.toLowerCase(),rtpProfile:"cast",rtpPayloadType:h.payload.payloadType,ssrc:h.payload.ssrc,targetDelay:h.payload.animatedLatency,aesKey:h.payload.aesKey,aesIvMask:h.payload.aesIvMask,timeBase:"1/"+
h.payload.clockRate,receiverRtcpEventLog:a.g.enableLogging,rtpExtensions:["adaptive_playout_delay"]};a.g.dscpEnabled&&(l.receiverRtcpDscp=46);127==h.payload.payloadType?Object.assign(l,{type:"audio_source",bitRate:0<h.payload.maxBitrate?1E3*h.payload.maxBitrate:60*h.payload.maxFrameRate+h.payload.clockRate*h.payload.channels,sampleRate:h.payload.clockRate,channels:h.payload.channels}):Object.assign(l,{type:"video_source",renderMode:"video",maxFrameRate:Math.round(1E3*h.payload.maxFrameRate)+"/1000",
maxBitRate:1E3*h.payload.maxBitrate,resolutions:[{width:a.g.maxWidth,height:a.g.maxHeight}]});e.push(l)}var r=a.h instanceof gA||a.j instanceof gA?"remoting":"mirroring",y={type:"OFFER",sessionId:a.J,seqNum:an(a.R),offer:{castMode:r,receiverGetStatus:!0,supportedStreams:e}};a.l.info(function(){return"Sending OFFER message: "+JSON.stringify(y)});Wz(a.G,y,"ANSWER",1E4,function(b,e){if(null==b)d(e);else if("ok"==b.result&&b.b){if(b.f!=y.seqNum)return a.l.H("Ignoring ANSWER for OFFER with different seqNum: "+
JSON.stringify(b)),!1;((e=b.b.g)&&e!=r||!e&&"mirroring"!=r)&&a.l.error("Expected receiver to ANSWER with castMode="+r+", but got: "+e);mb(a.l,function(){return"Received ANSWER: "+JSON.stringify(b)});c(b.b)}else d(Error("Non-OK ANSWER received: "+JSON.stringify(b)));return!0})})},kA=function(a,b,c){if(b.b.length!=b.f.length)return a.l.error("sendIndexes.length != ssrcs.length in ANSWER: "+JSON.stringify(b)),[];for(var d=[],e={},f=0;f<b.b.length;e={Ue:e.Ue},++f){var h=b.b[f];if(0>h||h>=c.length)return a.l.error("Receiver selected invalid index ("+
h+" < "+c.length+") in ANSWER: "+JSON.stringify(b)),[];e.Ue=c[h];if(d.some(function(a){return function(c){return c.Rf==a.Ue.Rf}}(e)))return a.l.error("Receiver selected same RTP stream twice in ANSWER: "+JSON.stringify(b)),[];e.Ue.params.payload.feedbackSsrc=b.f[h];if(d.some(function(a){return function(c){return c.params.payload.feedbackSsrc==a.Ue.params.payload.feedbackSsrc}}(e)))return a.l.error("Receiver provided same SSRC for two different RTP streams in ANSWER: "+JSON.stringify(b)),[];d.push(e.Ue)}return d},
mA=function(a,b,c){var d=null,e=function(){d&&(dA.rtpStream.onStarted.removeListener(d),d=null)};return(new Promise(function(e,h){var f=b.j||2344;a.l.info(function(){return"Starting RTP streams to receiver at "+(a.u+":"+f)+(" for selected offers: "+JSON.stringify(c))});var r=a.o||-1;a.g.dscpEnabled&&(a.l.info("Enabled DSCP in sender."),dA.udpTransport.setOptions(r,{DSCP:!0}));dA.udpTransport.setDestination(r,{address:a.u,port:f});var y=new Set(c.map(function(a){return a.Rf}));d=function(a){y.delete(a);
0==y.size&&e()};dA.rtpStream.onStarted.addListener(d);r=k(c);for(var A=r.next();!A.done;A=r.next())A=A.value,dA.rtpStream.toggleLogging(A.Rf,a.g.enableLogging),dA.rtpStream.start(A.Rf,A.params);setTimeout(function(){h(Error("Timeout: RTP streams failed to start."))},1E4)})).then(e).catch(function(a){e();throw a;})},eA=function(a,b,c){var d=this;return a&&b in a?function(){try{a[b](c)}catch(e){d.l.error("Error from testHooks."+b,e)}}:function(){}},pA=function(a,b){this.Rf=a;this.params=b},gA=function(){};var rA=function(a,b,c,d,e,f){this.m=a;this.G=qA(b,this.m.mb);this.R=new fA(this.m.mb,c,d,e,f);this.C=e;this.j=new Xz;this.g=new aaa;this.D=new mojo.Binding(mojo.MirrorServiceRemoter,this,null);this.l=fb("mr.mirror.cast.MediaRemoter");this.u=this.b=this.w=this.h=this.F=null;this.f=!0;this.o=this.J.bind(this)};
rA.prototype.initialize=function(a,b){var c=this;return Zz(this.j,1,function(d){c.F=a;c.h=b;var e=c.D.createInterfacePtrAndBind();c.D.setConnectionErrorHandler(function(){c.l.info("Remoter mojo pipe connection error.");sA(c)});c.b=new mojo.MirrorServiceRemotingSourcePtr;var f=Vi(c.m.mediaSource||"");if(!f)throw Error("Failed to parse tab ID from source:\n          "+c.m.mediaSource);c.l.info("Connecting remoter to browser: tabId="+f);(Di.get("mr.ProviderManager")||null).onMediaRemoterCreated(f,e,
mojo.makeRequest(c.b));c.b.ptr.setConnectionErrorHandler(function(){c.l.info("RemotingSource mojo pipe connection error.");sA(c)});return baa(c).then(function(){if(c.f)c.b.onSinkAvailable(c.G);cA(d,2)})})};
var sA=function(a){return aA(a.j,function(b){a.b&&(a.b.ptr.reset(),a.b=null);var c=a.w;a.w=null;a.h=null;a.F=null;a.D.close();chrome.settingsPrivate.onPrefsChanged.hasListener(a.o)&&chrome.settingsPrivate.onPrefsChanged.removeListener(a.o);return new Promise(function(d){window.setTimeout(function(){tA(a).then(function(){cA(b,1);d();c&&c()})},250)})})};g=rA.prototype;g.pr=function(a){uA(this.g,a)};g.mg=function(a){this.h&&this.h.mg(a)};g.Xg=function(){return this.h?this.h.Xg():Promise.resolve()};
g.Ne=function(a,b){this.l.error("Error during streaming: "+a,b);if(this.b)this.b.onError();sA(this)};
g.start=function(){var a=this,b=!1;this.l.info(function(){b=!0;return"Starting next media remoting session."});b&&caa(this.g,function(c){return a.l.info(c)});daa(this.g);Zz(this.j,2,function(c){return(0,a.F)().then(function(b){a.w=b;Uz(a.C,"RPC",function(c){if(c.rpc){var b=a.g;c=c.rpc;b.w&&(++b.m,b.f+=c.length,b.w(c))}});cA(c,3)}).catch(function(b){return tA(a).then(function(){cA(c);throw b;})})}).then(function(){a.l.info("Remoting started successfully.")}).catch(function(c){a.l.error("Failed to start remoting",c);
a.b.onError()})};g.Hr=function(a,b){var c=this;return Zz(this.j,3,function(d){return c.R.start(a?new gA:null,b?new gA:null,c).then(function(a){eaa(c.g,function(a){return c.C.sendMessage(a)},function(a){c.b.onMessageFromSink(a)});cA(d,4);return{audio_stream_id:a.vo||-1,video_stream_id:a.Qr||-1}}).catch(function(a){return tA(c).then(function(){cA(d);throw a;})})}).catch(function(a){c.l.error("Failed to start remoting streams",a);sA(c);return{audio_stream_id:-1,video_stream_id:-1}})};
g.stop=function(a){var b=this;$z(this.j,function(c){b.b.onStopped(a);return tA(b).then(function(){b.l.info("Remoting stopped.");cA(c,5);(0,b.w)().then(function(){return Zz(b.j,5,function(a){if(b.b&&b.f)b.b.onSinkAvailable(b.G);cA(a,2);return Promise.resolve()})}).catch(function(a){throw a;});b.w=null})}).catch(function(a){b.l.error("Failed to stop remoting: ",a);sA(b)})};
g.Po=function(){null===this.u&&(this.u=ff(this.m.mb.Of).then(function(a){return a.f||!1}));return this.u.then(function(a){return{rate:(a?1E7:5E6)/8}})};
var tA=function(a){return a.R.stop().then(function(){Vz(a.C,"RPC");faa(a.g);vA(a.g)})},baa=function(a){return new Promise(function(b){chrome.settingsPrivate.getPref("media_router.media_remoting.enabled",function(c){chrome.runtime.lastError?a.l.error("Encountered error getting media remoting pref: "+JSON.stringify(chrome.runtime.lastError)):c.type!=chrome.settingsPrivate.PrefType.BOOLEAN?a.l.error("Pref value not a boolean: "+JSON.stringify(c)):(a.f=!!c.value,a.l.info("Initializing mediaRemotingEnabled_ with value read from pref: "+
a.f));chrome.settingsPrivate.onPrefsChanged.hasListener(a.o)||chrome.settingsPrivate.onPrefsChanged.addListener(a.o);b()})})};
rA.prototype.J=function(a){if(this.b){a=k(a);for(var b=a.next();!b.done;b=a.next())if(b=b.value,"media_router.media_remoting.enabled"==b.key){if(b.type!=chrome.settingsPrivate.PrefType.BOOLEAN){this.l.error("Pref value not a boolean: "+JSON.stringify(b));break}a=!!b.value;if(this.f==a)break;this.f=a;this.l.info("mediaRemotingEnabled_ changed to: "+this.f);if(this.f)this.b.onSinkAvailable(this.G);else this.b.onStopped(mojo.RemotingStopReason.USER_DISABLED);break}}};
var qA=function(a,b){var c=this,d=new mojo.RemotingSinkMetadata;d.features=[];d.friendly_name=b.Gr||"";d.audio_capabilities=[];d.video_capabilities=[];var e=mojo.RemotingSinkAudioCapability,f=mojo.RemotingSinkVideoCapability,h=d.audio_capabilities,l=d.video_capabilities,r=b.Wd||"";(a.b||[]).forEach(function(a){switch(a){case "audio":h.push(e.CODEC_BASELINE_SET);break;case "aac":h.push(e.CODEC_AAC);break;case "opus":h.push(e.CODEC_OPUS);break;case "video":l.push(f.CODEC_BASELINE_SET);break;case "4k":l.push(f.SUPPORT_4K);
break;case "h264":l.push(f.CODEC_H264);break;case "vp8":l.push(f.CODEC_VP8);break;case "vp9":r.startsWith("Chromecast Ultra")&&l.push(f.CODEC_VP9);break;case "hevc":r.startsWith("Chromecast Ultra")&&l.push(f.CODEC_HEVC);break;default:c.l.info("Unknown mediaCap name: "+a)}});b.Wd&&"Chromecast Ultra"==b.Wd&&l.push(f.SUPPORT_4K);return d};rA.prototype.estimateTransmissionCapacity=rA.prototype.Po;rA.prototype.stop=rA.prototype.stop;rA.prototype.startDataStreams=rA.prototype.Hr;rA.prototype.start=rA.prototype.start;
rA.prototype.sendMessageToSink=rA.prototype.pr;
var aaa=function(){this.w=this.j=this.b=null;this.u=this.f=this.m=this.g=this.o=0;this.h=null},daa=function(a){a.b=[];wA(a,performance.now())},eaa=function(a,b,c){a.j=b;a.w=c;a.b?(b=a.b,a.b=null,b.forEach(function(c){return uA(a,c.data).then(c.rr,c.dm)})):wA(a,performance.now())},faa=function(a){if(a.b){var b=Error("Stop before delivering pending message");a.b.forEach(function(a){return a.dm(b)});a.b=null}a.j=null;a.w=null},uA=function(a,b){if(a.j){var c=btoa(String.fromCharCode.apply(null,b));++a.o;
a.g+=b.length;return a.j({type:"RPC",rpc:c})}return a.b?new Promise(function(c,e){a.b.push({data:b,rr:c,dm:e})}):Promise.reject(Error("RPC pipe not started"))},caa=function(a,b){vA(a);a.h=setInterval(function(){if(a.b)var c=a.b.length+" messages are waiting to send.";else{c=performance.now();var d=(c-a.u)/1E3;d="Over the past "+d.toFixed(1)+" seconds, sent "+(a.o+" messages ("+Math.round(a.g/d)+" bytes/sec) and ")+("received "+a.m+" messages ("+Math.round(a.f/d)+" ")+"bytes/sec).";wA(a,c);c=d}b(c)},
3E4)},vA=function(a){null!=a.h&&(clearInterval(a.h),a.h=null)},wA=function(a,b){a.o=0;a.g=0;a.m=0;a.f=0;a.u=b};var gaa=function(a){return a&&a.getAudioTracks()&&0<a.getAudioTracks().length?a.getAudioTracks()[0]:null},haa=function(a){return a&&a.getVideoTracks()&&0<a.getVideoTracks().length?a.getVideoTracks()[0]:null};var xA=function(a,b,c,d,e){this.g=new fA(a,b,c,d,void 0===e?null:e);this.l=fb("mr.mirror.cast.MediaStreamer");this.j=new Xz;this.h=this.f=this.b=this.w=null};xA.prototype.start=function(a,b){var c=this;return Zz(this.j,1,function(d){c.w=a;c.b=gaa(a);c.b&&"ended"==c.b.readyState&&(c.b=null);c.f=haa(a);c.f&&"ended"==c.f.readyState&&(c.f=null);if(!c.b&&!c.f)return cA(d),Promise.reject(Error("No MediaStream tracks to stream."));c.h=b;return c.g.start(c.b,c.f,c.h).then(function(){return cA(d,2)})})};
xA.prototype.stop=function(){var a=this;return aA(this.j,function(b){return a.g.stop().then(function(){a.b=null;a.f=null;a.w=null;a.h=null;cA(b,1)})})};var iaa=function(a){return Zz(a.j,2,function(b){a.l.info("Suspending media streaming...");return a.g.stop().then(function(){a.l.info("Suspended media streaming.");cA(b,3)})})};
xA.prototype.resume=function(){var a=this;return Zz(this.j,3,function(b){a.b&&"ended"==a.b.readyState&&(a.b=null);a.f&&"ended"==a.f.readyState&&(a.f=null);if(!a.b&&!a.f)return Promise.reject(Error("Cannot resume: All tracks have ended."));a.l.info("Resuming media streaming...");return a.g.start(a.b,a.f,a.h).then(function(){a.l.info("Resumed media streaming.");cA(b,2)})})};var yA=function(a,b,c){this.j=a;this.h=b;this.g=c;this.l=fb("mr.mirror.cast.WifiStatusMonitor");this.b=null;this.f=[]};yA.prototype.start=function(){var a=this;null==this.b&&(mb(this.l,"Starting Wifi Status Monitoring."),this.f=[],Uz(this.g,"STATUS_RESPONSE",function(b){return jaa(a,b)}),this.b=setInterval(function(){return zA(a)},12E4),zA(this))};yA.prototype.stop=function(){null!=this.b&&(mb(this.l,"Stopping Wifi Status Monitoring."),clearInterval(this.b),this.b=null,Vz(this.g,"STATUS_RESPONSE"))};
var jaa=function(a,b){if(null!=a.b)if(b.status){var c={};null!=b.status.b&&(c.wifiSnr=b.status.b);null!=b.status.f&&(c.wifiSpeed=b.status.f[3]);0==Object.keys(c).length?a.l.H(function(){return"No status fields populated in response: "+JSON.stringify(b)}):(c.timestamp=Date.now(),30==a.f.length&&a.f.shift(),a.f.push(c),a.l.info(function(){return"Current Wifi status: "+JSON.stringify(c)}))}else a.l.H(function(){return"Ignoring response without status: "+JSON.stringify(b)})},zA=function(a){a.g.sendMessage({type:"GET_STATUS",
sessionId:a.j,seqNum:an(a.h),get_status:["wifiSnr","wifiSpeed"]})};var AA=function(a,b,c,d){this.G=b.Of;this.m={extVersion:chrome.runtime.getManifest().version,extChannel:"public",mirrorSettings:jj(a),sender:navigator.userAgent||"UNKNOWN",receiverProductName:b.Wd};this.F=c;this.C=d;this.h=this.f=this.o=this.w=this.j=this.u=this.g=null;this.b=[]};AA.prototype.mg=function(a){null!=this.f&&clearInterval(this.f);this.g=a;this.u=Date.now();this.f=setInterval(this.D.bind(this,a),9E5)};
AA.prototype.Xg=function(){null!=this.f&&(clearInterval(this.f),this.f=null);if(null!=this.g){var a=this.D(this.g);this.g=null;return a}return Promise.resolve()};AA.prototype.Ne=function(a,b){null==this.j&&(this.j=Date.now(),"function"===typeof a?this.w=a():"string"===typeof a&&(this.w=a),b&&"string"===typeof b.stack&&(this.o=b.stack))};
var kaa=function(a,b){return(null==a.g?Promise.resolve():a.D(a.g)).then(function(){var c=b.map(function(c){c=BA(a,c);var b=c.map(function(a){return a.events}).filter(function(a){return null!=a}),d=["["];c.map(function(a){return a.Qf}).forEach(function(a,c){0<c&&d.push(",");d.push(a)});d.push("]");return{events:new Blob(b,{type:"application/gzip"}),Qf:new Blob(d,{type:"application/json"})}});a.b=[];return c})};
AA.prototype.D=function(a){var b=this;if(null!=this.h)return this.h;var c=ff(this.G).then(function(c){c={receiverVersion:c.b,receiverConnected:c.h,receiverOnEthernet:c.f,receiverHasUpdatePending:c.g,receiverUptimeSeconds:c.j};Object.assign(c,b.m);var d=Date.now();Object.assign(c,{startTime:b.u,endTime:d,activity:hA(a),receiverWifiStatus:Array.from(b.C.f)});b.u=d;null!=b.j&&(Object.assign(c,{streamingErrorTime:b.j,streamingErrorMessage:b.w,streamingErrorCause:b.o}),b.j=null,b.w=null,b.o=null);return c});
return(this.h=Promise.all([c.then(function(c){return nA(a,c)}),c,oA(a)]).then(function(a){var c=k(a);a=c.next().value;var d=c.next().value;c=c.next().value;b.b.push({events:a,Qf:new Blob([JSON.stringify(Object.assign({tags:d},c))],{type:"application/json"})});b.b=BA(b,b.F);b.h=null}))||Promise.resolve()};
var BA=function(a,b){b-=2;for(var c=[],d=a.b.length-1;0<=d;--d){b-=a.b[d].Qf.size+1;if(0>b)break;c.push({events:null,Qf:a.b[d].Qf});if(null!=a.b[d].events){var e=a.b[d].events.size;b>=e&&(c[c.length-1].events=a.b[d].events,b-=e)}}return c.reverse()};var CA=fb("mr.NetworkUtils"),DA=function(a,b){return oi?new Promise(function(c,d){chrome.networkingPrivate.setWifiTDLSEnabledState(a,b,function(a){chrome.runtime.lastError?(CA.H("Unable to set TDLS state: state = "+b+", error = "+chrome.runtime.lastError.message),d("Unable to set TDLS state to "+b+".")):(CA.info("TDLS state changed: state = "+b+", status = "+a),c(a))})}):Promise.reject("TDLS feature not enabled.")};var EA=function(a,b,c,d){d=void 0===d?null:d;gj.call(this,b);var e=b.mb;this.D=e.sessionId;this.J=e.Of;this.R=a;this.O=d;this.l=fb("mr.mirror.cast.Session");this.u=new Xz;this.o=new $m("mirror.cast.SeqNumGenerator");this.m=new Tz(b.id);this.w=new xA(e,this.R,this.o,this.m,this.O);this.h=null;this.b=new AA(a,e,c,new yA(this.D,this.o,this.m));this.g=!1;this.C=null};n(EA,gj);g=EA.prototype;
g.start=function(a){var b=this;return Zz(this.u,1,function(c){var d=new qb("MediaRouter.CastStreaming.Session.Launch");return laa(b).then(function(c){b.g=c;return b.w.start(a,b)}).then(function(){if(b.w.g.C){var a=b.b;a.m.tdlsIsOn=b.g;a.C.start();maa(b)}else b.b.m.tdlsIsOn=b.g;d.end();b.C=new wb("MediaRouter.CastStreaming.Session.Length");cA(c,2);return b})})};
g.stop=function(){var a=this;return aA(this.u,function(b){a.C&&(a.C.end(),a.C=null);a.b.C.stop();return a.w.stop().then(function(){return a.h?sA(a.h):Promise.resolve()}).then(function(){a.h=null;return a.g?naa(a):Promise.resolve()}).then(function(){a.g=!1;cA(b,4)})})};g.bm=function(){var a={sessionId:this.D,seqNum:an(this.o),type:"PRESENTATION",icons:[],title:ej(this.hc)};this.l.info("Sending session metadata update to receiver: "+this.D);this.m.sendMessage(a)};g.mg=function(a){this.b.mg(a)};
g.Xg=function(){return this.b.Xg()};g.Ne=function(a,b){this.b.Ne(a,b);this.l.error(a,b);this.stop()};
var FA=function(a,b){return kaa(a.b,b)},laa=function(a){return a.R.useTdls?DA(a.J,!0).then(function(b){if("Connected"==b)return a.l.info("Successfully enabled TDLS."),!0;a.l.H("Did not enable TDLS: result="+b);return!1}).catch(function(b){a.l.H("Error while calling enableTDLS()",b);return!1}):Promise.resolve(!1)},naa=function(a){return DA(a.J,!1).catch(function(b){return a.l.error("Error while turning TDLS back off",b)})},maa=function(a){oaa(a).then(function(b){(b.b||[]).includes("video")?paa(a,b):
a.l.H(function(){return"Receiver incapable of Media Remoting: "+JSON.stringify(b)})}).catch(function(b){a.l.H("None/Invalid capabilites response. Media Remoting disabled.",b)})},oaa=function(a){return new Promise(function(b,c){var d={type:"GET_CAPABILITIES",sessionId:a.D,seqNum:an(a.o)};a.l.info(function(){return"Sending GET_CAPABILITIES message: "+JSON.stringify(d)});Wz(a.m,d,"CAPABILITIES_RESPONSE",3E4,function(e,f){if(null==e)return c(f),!0;if("ok"!=e.result||!e.capabilities)return c(Error("Bad response: "+
JSON.stringify(e))),!0;if(e.f!=d.seqNum)return a.l.info(function(){return"Ignoring CAPABILITIES_RESPONSE with different seqNum: "+JSON.stringify(e)}),!1;mb(a.l,function(){return"Received CAPABILITIES_RESPONSE: "+JSON.stringify(e)});b(e.capabilities);return!0})})},paa=function(a,b){Zz(a.u,2,function(c){var d=a.f.mb.Wd||"<UNKNOWN>";if(!d.startsWith("Chromecast")&&!d.startsWith("Eureka Dongle"))return a.l.H("HACK: Media Remoting disabled because the receiver model--"+('"'+d+'" according to discovery--is not a Chromecast.')),
cA(c),Promise.resolve();a.h=new rA(a.f,b,a.R,a.o,a.m,a.O);return a.h.initialize(a.T.bind(a),a).catch(function(c){a.l.error("Media Remoting start failed: "+c.message,c)}).then(function(){return cA(c)})})};EA.prototype.T=function(){var a=this;return Zz(this.u,2,function(b){return new Promise(function(c,d){iaa(a.w).then(function(){cA(b,3);a.G=!0;aj(a);c(a.Ea.bind(a))}).catch(function(c){a.Ne("Failed to suspend MediaStreamer before starting remoting",c);d(c)})})})};
EA.prototype.Ea=function(){var a=this;return Zz(this.u,3,function(b){return new Promise(function(c,d){a.w.resume().then(function(){cA(b,2);a.G=!1;aj(a);c()}).catch(function(c){a.Ne("Failed resume MediaStreamer after ending remoting mode",c);d(c)})})})};var GA=function(){Wi.call(this,"cast_streaming");this.j=this.o=this.G=this.F=this.h=null;this.J=this.R="";this.O=this.m=!1;this.Ea=this.fa.bind(this);this.D=null};n(GA,Wi);g=GA.prototype;g.og=function(a){this.m=a||!1;this.O=!0};g.getName=function(){return"cast_streaming"};
g.aj=function(a,b,c,d,e){var f=this;if(!this.m)return Wi.prototype.aj.call(this,a,b,c,d,e);this.N.info("Start mirroring on route "+a.id);if(!this.O)return hi(Error("Not initialized"));var h=new Promise(function(h,r){f.w().then(function(){if(Ri(b)&&c.shouldCaptureVideo)return(new Promise(function(c){chrome.tabs.get(a.mb.tabId||-1,c)})).then(function(a){return Ai(a).then(function(a){f.J=a})})}).then(function(){return e?e(a).b:a}).then(function(a){f.F=new mojo.Binding(mojo.MirroringSessionObserver,f,
null);f.G=new mojo.Binding(mojo.MirroringCastMessageChannel,f,null);f.j=qy(a.id);f.j.onMessage=f.Yp.bind(f);var e=f.F.createInterfacePtrAndBind(),l=f.G.createInterfacePtrAndBind(),r=qaa(a,c);f.h=new mojo.MirroringServiceHostPtr;var y=a.mb.tabId||-1;Qi(b)?f.g.getMirroringServiceHostForTab(y,mojo.makeRequest(f.h)):Ri(b)?f.g.getMirroringServiceHostForDesktop(y,f.J,mojo.makeRequest(f.h)):Ti(b)?(y=new mojo.Url,y.url=b,f.g.getMirroringServiceHostForOffscreenTab(y,d||"",mojo.makeRequest(f.h))):f.h=null;
if(!f.h)throw new li("Error to get mirroring service host");f.o=new mojo.MirroringCastMessageChannelPtr;f.h.start(r,e,l,mojo.makeRequest(f.o));f.D=new gj(a);e=f.g.Ai.bind(f.g);f.D.F=e;Qi(b)&&!chrome.tabs.onUpdated.hasListener(f.Ea)&&chrome.tabs.onUpdated.addListener(f.Ea);(Qi(b)||Ti(b))&&$i(f.D,a.mb.tabId);h(a)}).catch(function(a){f.N.info("Mirroring launch error: "+a);r(a)})});return ii(h)};g.nh=function(a,b){return new EA(a,b,20969472,null)};g.Rg=function(){tz(0)};g.Og=function(){tz(1)};g.Mh=function(){tz(2)};
g.Pg=function(){zb("MediaRouter.CastStreaming.Session.End")};g.Lh=function(a){Ab("MediaRouter.CastStreaming.Start.Failure",a,ki)};g.Qg=function(){zb("MediaRouter.CastStreaming.Stream.End")};
g.gi=function(a){var b=this;return this.m?Promise.resolve():(new Promise(function(a){return chrome.metricsPrivate.getIsCrashReportingEnabled(a)})).then(function(c){var d=c&&Az(),e=[9351424];d&&e.push(20969472);return FA(a,e).then(function(a){var e=a[a.length-1];a=Wl(a[0].events).catch(function(a){b.N.error("Failed to persist events Blob.",a)});d&&0<e.events.size?wz(e.events,void 0,b.Xp.bind(b)):c&&vz("stats.json",e.Qf,void 0,void 0);return a})})};g.Xp=function(a){a&&(zz().b=Date.now())};
g.Zi=function(a){if(this.m)return cb();this.N.info("Received message to upload logs for "+a);return this.b?FA(this.b,[20969472]).then(function(b){b=k(b).next().value;return 0==b.events.size?"":wz(b.events,a)}):Promise.resolve(raa(this,a))};
var raa=function(a,b){var c=window.localStorage.getItem("mr.temp.mirror.cast.Service.eventsBlob");if(null==c||1>c.length)c=null;else{for(var d=new Uint16Array(c.length),e=0;e<c.length;++e)d[e]=c.charCodeAt(e);c=d.buffer;d=(new Uint8Array(c,c.byteLength-1,1))[0];c=new Uint8Array(c,0,c.byteLength-(0==d?2:1));c=new Blob([c],{type:"application/gzip"})}if(null!=c&&0!=c.size)return Wl(new Blob),a.N.info("Uploading saved logs for feedback."),wz(c,b)};g=GA.prototype;
g.onError=function(a){this.N.info("Mirroring service error: "+a);this.w()};g.didStart=function(){Qi(this.R)?this.Rg():Ri(this.R)?this.Og():Ti(this.R)&&this.Mh()};g.didStop=function(){this.w()};g.send=function(a){if(this.j){var b=JSON.parse(a.jsonFormatData);mb(this.N,function(){return"Sending message: "+JSON.stringify(b)});this.j.sendMessage(a.jsonFormatData,{namespace:a.messageNamespace})}};
g.Yp=function(a){if(a&&(a.namespace_===mojo.MirroringWebRtcNamespace||a.namespace_===mojo.MirroringRemotingNamespace)&&this.o){var b=new mojo.MirroringCastMessage;b.messageNamespace=a.namespace_;"string"!==typeof a.data?this.N.info("Received non-string as JSON"):(b.jsonFormatData=a.data,this.o.send(b))}};
var qaa=function(a,b){var c=new mojo.MirroringSessionParameters;c.receiverAddress=new mojo.IPAddress;c.receiverAddress.addressBytes=a.mb.Of.split(".").map(function(a){return parseInt(a,10)});c.receiverModelName=a.mb.Wd;c.type=b.shouldCaptureVideo&&b.shouldCaptureAudio?mojo.MirroringSessionType.AUDIO_AND_VIDEO:b.shouldCaptureVideo?mojo.MirroringSessionType.VIDEO_ONLY:mojo.MirroringSessionType.AUDIO_ONLY;return c};GA.prototype.fa=function(a,b,c){Pi(14);this.D&&bj(this.D,a,b,c)};
GA.prototype.w=function(){chrome.tabs.onUpdated.removeListener(this.Ea);return this.m?this.O?this.h?(this.h.ptr.reset(),this.o=this.h=null,this.j&&this.j.Ya(),this.j=null,this.F&&(this.F.close(),this.F=null),this.G&&(this.G.close(),this.G=null),this.J=this.R="",this.Pg(),Promise.resolve(!0)):Promise.resolve(!1):Promise.reject("Not initialized"):Wi.prototype.w.call(this)};
GA.prototype.bj=function(a,b,c,d,e,f){return this.m?hi(Error("Mirroring service does not support updating stream")):Wi.prototype.bj.call(this,a,b,c,d,e,f)};GA.prototype.send=GA.prototype.send;GA.prototype.didStop=GA.prototype.didStop;GA.prototype.didStart=GA.prototype.didStart;GA.prototype.onError=GA.prototype.onError;var saa=new GA;Mi("mr.mirror.cast.Service",saa);