(function(n,o,i){"use strict";const f=o.findByStoreName("UserStore"),d=o.findByProps("getAvatarDecorationURL","default"),c="https://decor.fieryflames.dev";let r,a=[];var h={onLoad:async function(){a.push(i.after("getUser",f,function(t,e){e&&r?.has(e.id)&&(e.avatarDecoration=`decor_${r?.get(e.id)}`)})),a.push(i.after("getAvatarDecorationURL",d,function(t,e){let[{avatarDecoration:s}]=t;if(s?.startsWith("decor")){const u=s.split("_");return u.shift(),c+`/${u.join("_")}.png`}})),r=new Map(Object.entries(await fetch(c+"/users.json").then(function(t){return t.json()})))},onUnload:function(){a.forEach(function(t){return t()})}};return n.default=h,Object.defineProperty(n,"__esModule",{value:!0}),n})({},vendetta.metro,vendetta.patcher);
