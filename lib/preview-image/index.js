/**
 * previewImage-mobile 1.0.1
 * Copyright 2017
 * yanghuiLu https://github.com/yanghuiLu/previewImage-mobile
 * Licensed ISC
 * Released on: Nov 23, 2017
 */
/** DM5 */
!function(){var r=function(r,n){var t,o,e,f;return e=2147483648&r,f=2147483648&n,t=1073741824&r,o=1073741824&n,r=(1073741823&r)+(1073741823&n),t&o?2147483648^r^e^f:t|o?1073741824&r?3221225472^r^e^f:1073741824^r^e^f:r^e^f},n=function(n,t,o,e,f,u,a){return n=r(n,r(r(t&o|~t&e,f),a)),r(n<<u|n>>>32-u,t)},t=function(n,t,o,e,f,u,a){return n=r(n,r(r(t&e|o&~e,f),a)),r(n<<u|n>>>32-u,t)},o=function(n,t,o,e,f,u,a){return n=r(n,r(r(t^o^e,f),a)),r(n<<u|n>>>32-u,t)},e=function(n,t,o,e,f,u,a){return n=r(n,r(r(o^(t|~e),f),a)),r(n<<u|n>>>32-u,t)},f=function(r){var n,t,o="";for(t=0;3>=t;t++)n=r>>>8*t&255,n="0"+n.toString(16),o+=n.substr(n.length-2,2);return o};return md5=function(u){var a,i,C,c,g,h,d,m,S;for(u=u.replace(/\x0d\x0a/g,"\n"),a="",i=0;i<u.length;i++)C=u.charCodeAt(i),128>C?a+=String.fromCharCode(C):(C>127&&2048>C?a+=String.fromCharCode(C>>6|192):(a+=String.fromCharCode(C>>12|224),a+=String.fromCharCode(C>>6&63|128)),a+=String.fromCharCode(63&C|128));for(i=a.length,u=i+8,c=16*((u-u%64)/64+1),u=Array(c-1),h=0;i>h;)C=(h-h%4)/4,g=h%4*8,u[C]|=a.charCodeAt(h)<<g,h++;for(C=(h-h%4)/4,u[C]|=128<<h%4*8,u[c-2]=i<<3,u[c-1]=i>>>29,h=1732584193,d=4023233417,m=2562383102,S=271733878,a=0;a<u.length;a+=16)i=h,C=d,c=m,g=S,h=n(h,d,m,S,u[a+0],7,3614090360),S=n(S,h,d,m,u[a+1],12,3905402710),m=n(m,S,h,d,u[a+2],17,606105819),d=n(d,m,S,h,u[a+3],22,3250441966),h=n(h,d,m,S,u[a+4],7,4118548399),S=n(S,h,d,m,u[a+5],12,1200080426),m=n(m,S,h,d,u[a+6],17,2821735955),d=n(d,m,S,h,u[a+7],22,4249261313),h=n(h,d,m,S,u[a+8],7,1770035416),S=n(S,h,d,m,u[a+9],12,2336552879),m=n(m,S,h,d,u[a+10],17,4294925233),d=n(d,m,S,h,u[a+11],22,2304563134),h=n(h,d,m,S,u[a+12],7,1804603682),S=n(S,h,d,m,u[a+13],12,4254626195),m=n(m,S,h,d,u[a+14],17,2792965006),d=n(d,m,S,h,u[a+15],22,1236535329),h=t(h,d,m,S,u[a+1],5,4129170786),S=t(S,h,d,m,u[a+6],9,3225465664),m=t(m,S,h,d,u[a+11],14,643717713),d=t(d,m,S,h,u[a+0],20,3921069994),h=t(h,d,m,S,u[a+5],5,3593408605),S=t(S,h,d,m,u[a+10],9,38016083),m=t(m,S,h,d,u[a+15],14,3634488961),d=t(d,m,S,h,u[a+4],20,3889429448),h=t(h,d,m,S,u[a+9],5,568446438),S=t(S,h,d,m,u[a+14],9,3275163606),m=t(m,S,h,d,u[a+3],14,4107603335),d=t(d,m,S,h,u[a+8],20,1163531501),h=t(h,d,m,S,u[a+13],5,2850285829),S=t(S,h,d,m,u[a+2],9,4243563512),m=t(m,S,h,d,u[a+7],14,1735328473),d=t(d,m,S,h,u[a+12],20,2368359562),h=o(h,d,m,S,u[a+5],4,4294588738),S=o(S,h,d,m,u[a+8],11,2272392833),m=o(m,S,h,d,u[a+11],16,1839030562),d=o(d,m,S,h,u[a+14],23,4259657740),h=o(h,d,m,S,u[a+1],4,2763975236),S=o(S,h,d,m,u[a+4],11,1272893353),m=o(m,S,h,d,u[a+7],16,4139469664),d=o(d,m,S,h,u[a+10],23,3200236656),h=o(h,d,m,S,u[a+13],4,681279174),S=o(S,h,d,m,u[a+0],11,3936430074),m=o(m,S,h,d,u[a+3],16,3572445317),d=o(d,m,S,h,u[a+6],23,76029189),h=o(h,d,m,S,u[a+9],4,3654602809),S=o(S,h,d,m,u[a+12],11,3873151461),m=o(m,S,h,d,u[a+15],16,530742520),d=o(d,m,S,h,u[a+2],23,3299628645),h=e(h,d,m,S,u[a+0],6,4096336452),S=e(S,h,d,m,u[a+7],10,1126891415),m=e(m,S,h,d,u[a+14],15,2878612391),d=e(d,m,S,h,u[a+5],21,4237533241),h=e(h,d,m,S,u[a+12],6,1700485571),S=e(S,h,d,m,u[a+3],10,2399980690),m=e(m,S,h,d,u[a+10],15,4293915773),d=e(d,m,S,h,u[a+1],21,2240044497),h=e(h,d,m,S,u[a+8],6,1873313359),S=e(S,h,d,m,u[a+15],10,4264355552),m=e(m,S,h,d,u[a+6],15,2734768916),d=e(d,m,S,h,u[a+13],21,1309151649),h=e(h,d,m,S,u[a+4],6,4149444226),S=e(S,h,d,m,u[a+11],10,3174756917),m=e(m,S,h,d,u[a+2],15,718787259),d=e(d,m,S,h,u[a+9],21,3951481745),h=r(h,i),d=r(d,C),m=r(m,c),S=r(S,g);return(f(h)+f(d)+f(m)+f(S)).toLowerCase()}}();
/** previewImage */
!function(e,t){"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e):function(e){if(!e.document)throw new Error("previewImage requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(e){var t={};t.isArray=function(e){return"[object Array]"==Object.prototype.toString.call(e)},t.all=function(e,t){var i,s=[];return(i=t?t.querySelectorAll(e):document.querySelectorAll(e))&&i.length>0&&(s=Array.prototype.slice.call(i)),s},t.delegate=function(e,i,s,a){e&&e.addEventListener(i,function(i){var n=t.all(s,e);if(n)for(var h=0;h<n.length;h++)for(var o=i.target;o;){if(o==n[h]){a.call(o,i);break}if((o=o.parentNode)==e)break}},!1)};var i=function(){this.winw=e.innerWidth||document.body.clientWidth,this.winh=e.innerHeight||document.body.clientHeight,this.originWinw=this.winw,this.originWinh=this.winh,this.marginRight=15,this.imageChageMoveX=this.marginRight+this.winw,this.imageChageNeedX=Math.floor(.5*this.winw),this.cssprefix=["","webkit","Moz","ms","o"],this.version="1.0.3",this.imgLoadCache=new Object,this.scale=1,this.maxScale=4,this.maxOverScale=6,this.openTime=.3,this.slipTime=.5,this.maxOverWidthPercent=.5,this.$box=!1,this.isPreview=!1;var t=document.createElement("style");t.innerText="#__previewImage-container{-ms-touch-action:none;touch-action:none;-webkit-touch-action:none;line-height:100vh;background-color:#000;width:100vw;height:100vh;position:fixed;overflow:hidden;top:0;left:0;z-index: 2147483647;transition:transform .3s;-ms-transition:transform .3s;-moz-transition:transform .3s;-webkit-transition:transform .3s;-o-transition:transform .3s;transform:translate3d(100%,0,0);-webkit-transform:translate3d(100%,0,0);-ms-transform:translate3d(100%,0,0);-o-transform:translate3d(100%,0,0);-moz-transform:translate3d(100%,0,0)}#__previewImage-container .previewImage-text{position:absolute;top:.6em;text-align:center;font-size:18px;line-height:25px;color:#fff;z-index:10;padding: 0.2em 0.4em;background-color: rgba(255,255,255,0.4);border-radius: 50%;letter-spacing: 0;right:.8em}#__previewImage-container .previewImage-text .previewImage-text-index{font-size: 24px;}#__previewImage-container .previewImage-box{width:999999rem;height:100vh}#__previewImage-container .previewImage-box .previewImage-item{width:100vw;height:100vh;margin-right:15px;float:left;text-align:center;background:url(http://static.luyanghui.com/svg/oval.svg) no-repeat center/auto}#__previewImage-container .previewImage-box .previewImage-item.previewImage-nobackground{background:none}#__previewImage-container .previewImage-box .previewImage-item .previewImage-image{vertical-align:middle;width:100%}",t.type="text/css",this.$container=document.createElement("div"),this.$container.id="__previewImage-container",this.$container.style.width=this.winw+"px",this.$container.style.height=this.winh+"px",document.body.appendChild(this.$container),document.head.appendChild(t),this.bind()};return i.prototype.start=function(e){var i=e.urls,s=e.current;if(this.$container.innerHTML="",!i||!t.isArray(i)||0==i.length)throw new Error("urls must be a Array and the minimum length more than zero");if(s){var a=i.indexOf(s);a<0&&(a=0,console.warn("current isnot on urls,it will be the first value of urls!")),this.index=a}else this.index=0,console.warn("current is empty,it will be the first value of urls!");this.urls=i,this.maxLen=i.length-1,this.cIndex=this.maxLen+1,this.bIndex=this.maxLen+2,this.imgStatusCache=new Object,this.render()},i.prototype.render=function(){var t=this;if(!1===this.$box){var i=document.createElement("div");i.className+="previewImage-box",this.$box=i}else this.$box.innerHTML="";var s=document.createElement("div");this.$text=s,this.$text.className+="previewImage-text",this.$text.innerHTML="<span class='previewImage-text-index'>"+(this.index+1)+"/</span>"+(this.maxLen+1),this.container=this.imgStatusCache[this.cIndex]={elem:this.$container,x:this.winw,y:0,m:0,my:0,scale:1,scalem:1},this.box=this.imgStatusCache[this.bIndex]={elem:this.$box,x:0,y:0,m:0,my:0,scale:1,scalem:1},this.urls.forEach(function(i,s){var a,n=document.createElement("div"),h=e.md5?md5(i+s):i+s,o=t.imgLoadCache[h];o&&o.isload?(a=o.elem,n.className+=" previewImage-nobackground"):((a=new Image).className+="previewImage-image",t.imgLoadCache[h]={isload:!1,elem:a},s==t.index&&(a.src=i,a.onload=function(){n.className+=" previewImage-nobackground",t.imgLoadCache[h].isload=!0})),t.imgStatusCache[s]={hash:h,x:0,m:0,y:0,my:0,scale:t.scale,scalem:1},n.className+=" previewImage-item",n.appendChild(a),t.$box.appendChild(n)}),this.$container.appendChild(this.$box),this.$container.appendChild(this.$text);var a=-this.imageChageMoveX*this.index;this.box.x=a,this.container.x=0,this.$container.style.display="block",setTimeout(function(){t.translateScale(t.bIndex,0),t.translateScale(t.cIndex,t.openTime),t.isPreview=!0},50)},i.prototype.bind=function(){var i=this.$container,s=this,a=function(){s.touchEndFun.call(s)},n=function(){this.winw=e.innerWidth||document.body.clientWidth,this.winh=e.innerHeight||document.body.clientHeight,this.originWinw=this.winw,this.originWinh=this.winh,this.$container.style.width=this.winw+"px",this.$container.style.height=this.winh+"px",this.imageChageMoveX=this.marginRight+this.winw;var t=-this.imageChageMoveX*this.index;try{this.box.x=t,this.translateScale(this.bIndex,0)}catch(e){}}.bind(this);e.addEventListener("resize",n,!1),t.delegate(i,"click",".previewImage-item",function(){s.closePreview.call(s)}),t.delegate(i,"touchstart",".previewImage-item",function(){s.touchStartFun.call(s)}),t.delegate(i,"touchmove",".previewImage-item",function(){s.touchMoveFun.call(s)}),t.delegate(i,"touchend",".previewImage-item",a),t.delegate(i,"touchcancel",".previewImage-item",a)},i.prototype.closePreview=function(){var e=this;this.imgStatusCache[this.cIndex].x=this.winw,this.translateScale(this.cIndex,this.openTime),this.imgStatusRewrite(),this.translateScale(this.index,this.slipTime),setTimeout(function(){e.$container.style.display="none"},1e3*this.slipTime),e.isPreview=!1},i.prototype.touchStartFun=function(e){this.ts=this.getTouches(),this.allowMove=!0,this.statusX=0,this.statusY=0},i.prototype.touchMoveFun=function(e){this.tm=this.getTouches();var t=this.tm,i=this.ts;this.moveAction(i,t)},i.prototype.touchEndFun=function(e){this.$container;this.te=this.getTouches(),this.endAction(this.ts,this.te)},i.prototype.moveAction=function(e,t){if(this.allowMove){var i=this.getIndexImage(),s=.3*this.winw/i.scale,a=t.x0-e.x0,n=t.y0-e.y0;Math.abs(n)>0&&event.preventDefault();var h=i.x+a,o=i.y+n,r=this.getAllow(this.index),l=this.allowX=r.x;this.allowY=r.y0;if(a<=0&&(this.allowX=-l),n<=0&&(this.allowY=r.y1),1==t.length)if(i.scale>1){if(o>=r.y0){this.statusY=1;g=o-r.y0;i.my=r.y0-i.y+this.getSlowlyNum(g,s)}else if(o<=r.y1){this.statusY=1;g=o-r.y1;i.my=r.y1-i.y+this.getSlowlyNum(g,s)}else this.statusY=2,i.my=n;if(a<0&&i.x<=-l)this.statusX=1,this.box.m=a,this.index==this.maxLen&&(this.box.m=this.getSlowlyNum(a)),this.translateScale(this.bIndex,0),this.translateScale(this.index,0);else if(a>0&&i.x>=l)this.statusX=2,this.box.m=a,0==this.index&&(this.box.m=this.getSlowlyNum(a)),this.translateScale(this.bIndex,0),this.translateScale(this.index,0);else{if(0==a)return;if(this.statusX=3,i.m=a,h>=l){this.statusX=4;c=h-l;i.m=l-i.x+this.getSlowlyNum(c,s)}if(h<=-l){this.statusX=4;var c=h+l;i.m=-l-i.x+this.getSlowlyNum(c,s)}this.translateScale(this.index,0)}}else if(Math.abs(n)>5&&5!=this.statusX){var m=this.getJqElem(this.index),d=m.height-this.winh;if(n>0&&o>0)this.statusX=7,this.allowY=0,i.my=-i.y+this.getSlowlyNum(o,s);else if(n<0&&o<-d)if(this.statusX=7,m.height>this.winh){var g=o+d;this.allowY=-d,i.my=-d-i.y+this.getSlowlyNum(g,s)}else this.allowY=0,i.my=-i.y+this.getSlowlyNum(o,s);else this.statusX=6,i.my=n;this.translateScale(this.index,0)}else{if(6==this.statusX)return;this.statusX=5,0==this.index&&a>0||this.index==this.maxLen&&a<0?this.box.m=this.getSlowlyNum(a):this.box.m=a,this.translateScale(this.bIndex,0)}else{var x=this.getScale(e,t),u=x*i.scale;if(u>=this.maxScale){var w=u-this.maxScale;x=(u=this.maxScale+this.getSlowlyNum(w,this.maxOverScale))/i.scale}i.scalem=x,this.translateScale(this.index,0)}}},i.prototype.endAction=function(e,t){var i=this.getIndexImage(),s=t.x0-e.x0,a=(t.y0,e.y0,t.time-e.time),n=0;if(this.allowMove=!1,1==e.length){switch(Math.abs(s)>10&&event.preventDefault(),this.statusY){case 1:i.y=this.allowY,i.my=0,n=this.slipTime;break;case 2:i.y=i.y+i.my,i.my=0}switch(this.statusX){case 1:this.index!=this.maxLen&&(s<=-this.imageChageNeedX||a<200&&s<-30)?this.changeIndex(1):(this.changeIndex(0),0!=n&&this.translateScale(this.index,n));break;case 2:0!=this.index&&(s>=this.imageChageNeedX||a<200&&s>30)?this.changeIndex(-1):(this.changeIndex(0),0!=n&&this.translateScale(this.index,n));break;case 3:i.x=i.x+i.m,i.m=0,this.translateScale(this.index,n);break;case 4:i.x=this.allowX,i.m=0,n=this.slipTime,this.translateScale(this.index,n);break;case 5:s>=this.imageChageNeedX||a<200&&s>30?this.changeIndex(-1):s<=-this.imageChageNeedX||a<200&&s<-30?this.changeIndex(1):this.changeIndex(0);break;case 6:i.y=i.y+i.my,i.my=0;break;case 7:i.y=this.allowY,i.my=0,this.translateScale(this.index,this.slipTime)}}else{event.preventDefault();var h=i.scale*i.scalem,o=this.getJqElem(this.index);i.scale=h;var r=this.getAllow(this.index);i.x>r.x?(n=this.slipTime,i.x=r.x):i.x<-r.x&&(n=this.slipTime,i.x=-r.x),i.y>r.y0?(n=this.slipTime,i.y=r.y0):i.y<r.y1&&(n=this.slipTime,i.y=r.y1),o.height*i.scale<=this.winh&&(i.y=0),o.width*i.scale<=this.winw&&(i.x=0),i.scalem=1,h>this.maxScale?(i.scale=this.maxScale,n=this.slipTime):h<1&&(this.imgStatusRewrite(),n=this.slipTime),0!=n&&(this.changeIndex(0),this.translateScale(this.index,n))}},i.prototype.getAllow=function(e){var t,i,s=this.getJqElem(e),a=this.getIndexImage(e),n=Math.floor((s.width*a.scale-this.winw)/(2*a.scale));return s.height*a.scale<=this.winh?(t=0,i=0):s.height<=this.winh?i=-(t=Math.floor((s.height*a.scale-this.winh)/(2*a.scale))):(t=Math.floor(s.height*(a.scale-1)/(2*a.scale)),i=-Math.floor((s.height*(a.scale+1)-2*this.winh)/(2*a.scale))),{x:n,y0:t,y1:i}},i.prototype.getSlowlyNum=function(e,t){t=t||this.winw*this.maxOverWidthPercent;return e<0?-(1-(e=-e)/(t+e))*e:(1-e/(t+e))*e},i.prototype.getScale=function(e,t){var i=Math.sqrt(Math.pow(e.x1-e.x0,2)+Math.pow(e.y1-e.y0,2));return Math.sqrt(Math.pow(t.x1-t.x0,2)+Math.pow(t.y1-t.y0,2))/i},i.prototype.imgStatusRewrite=function(e){var e=void 0===e?this.index:e,t=this.imgStatusCache[e];t.x=0,t.y=0,t.m=0,t.my=0,t.scale=1,t.scalem=1,e!=this.index&&this.translateScale(e,this.slipTime)},i.prototype.changeIndex=function(e){this.getIndexImage();var t=this.index;if(0==this.index&&-1==e)this.index=this.index;else if(this.index==this.maxLen&&1==e)this.index=this.index;else{this.index+=e,this.$text.innerHTML="<span class='previewImage-text-index'>"+(this.index+1)+"/</span>"+(this.maxLen+1);var i=this.imgStatusCache[this.index].hash,s=this.imgLoadCache[i];s.isload?s.elem.parentNode.className+=" previewImage-nobackground":(s.elem.src=this.urls[this.index],s.elem.onload=function(){s.elem.parentNode.className+=" previewImage-nobackground",s.isload=!0})}this.box.x=-this.imageChageMoveX*this.index,this.box.m=0,t!=this.index&&this.imgStatusRewrite(t),this.translateScale(this.bIndex,this.slipTime)},i.prototype.getIndexImage=function(e){e=void 0==e?this.index:e;return this.imgStatusCache[this.index]},i.prototype.translateScale=function(e,t){var i=this.imgStatusCache[e];$elem=this.getJqElem(e);var s=i.scale*i.scalem,a="scale3d("+s+","+s+",1)  translate3d("+(i.x+i.m)+"px,"+(i.y+i.my)+"px,0px)",n="transform "+t+"s ease-out";this.addCssPrefix($elem,"transition",n),this.addCssPrefix($elem,"transform",a)},i.prototype.getJqElem=function(e){var t;if((e=void 0==e?this.index:e)<=this.maxLen){var i=this.imgStatusCache[e].hash;t=this.imgLoadCache[i].elem}else{t=this.imgStatusCache[e].elem}return t},i.prototype.addCssPrefix=function(e,t,i){for(var s in this.cssprefix){if(""===this.cssprefix[s])t=t.toLowerCase();else{var a=t.length;t=t.substr(0,1).toUpperCase()+t.substr(1,a).toLowerCase()}if(void 0!==document.body.style[t])return void(e.style[t]=i)}},i.prototype.getTouches=function(e){var t=event.touches.length>0?event.touches:event.changedTouches,i={touches:t,length:t.length};return i.x0=t[0].pageX,i.y0=t[0].pageY,i.time=(new Date).getTime(),t.length>=2&&(i.x1=t[0].pageX,i.y1=t[1].pageY),i},e.previewImage=new i,"function"==typeof define&&define.amd&&define([],function(){return previewImage}),previewImage});