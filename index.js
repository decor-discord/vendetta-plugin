(function(M,o,r,H,Se,W,h,S,C,_){"use strict";const Ee="https://decor.fieryflames.dev",D=Ee+"/api",De=D+"/authorize",be="https://decorcdn.fieryflames.dev",we="1096966363416899624",A="100101099111114",Q="11497119";var Ne=Object.defineProperty,Y=Object.getOwnPropertySymbols,me=Object.prototype.hasOwnProperty,Ce=Object.prototype.propertyIsEnumerable,J=function(e,t,n){return t in e?Ne(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n},I=function(e,t){for(var n in t||(t={}))me.call(t,n)&&J(e,n,t[n]);if(Y)for(var n of Y(t))Ce.call(t,n)&&J(e,n,t[n]);return e};const $=function(e){return function(t){try{const n=e(t);return n instanceof Promise?n:{then(i){return $(i)(n)},catch(i){return this}}}catch(n){return{then(i){return this},catch(i){return $(i)(n)}}}}},Ae=function(e,t){return function(n,i,s){let a=I({getStorage:function(){return localStorage},serialize:JSON.stringify,deserialize:JSON.parse,partialize:function(c){return c},version:0,merge:function(c,g){return I(I({},g),c)}},t);(a.blacklist||a.whitelist)&&console.warn(`The ${a.blacklist?"blacklist":"whitelist"} option is deprecated and will be removed in the next version. Please use the 'partialize' option instead.`);let l=!1;const f=new Set,y=new Set;let d;try{d=a.getStorage()}catch{}if(d)d.removeItem||console.warn(`[zustand persist middleware] The given storage for item '${a.name}' does not contain a 'removeItem' method, which will be required in v4.`);else return e(function(){for(var c=arguments.length,g=new Array(c),u=0;u<c;u++)g[u]=arguments[u];console.warn(`[zustand persist middleware] Unable to update item '${a.name}', the given storage is currently unavailable.`),n(...g)},i,s);const p=$(a.serialize),E=function(){const c=a.partialize(I({},i()));a.whitelist&&Object.keys(c).forEach(function(v){var Re;!((Re=a.whitelist)!=null&&Re.includes(v))&&delete c[v]}),a.blacklist&&a.blacklist.forEach(function(v){return delete c[v]});let g;const u=p({state:c,version:a.version}).then(function(v){return d.setItem(a.name,v)}).catch(function(v){g=v});if(g)throw g;return u},z=s.setState;s.setState=function(c,g){z(c,g),E()};const R=e(function(){for(var c=arguments.length,g=new Array(c),u=0;u<c;u++)g[u]=arguments[u];n(...g),E()},i,s);let m;const ve=function(){var c;if(!d)return;l=!1,f.forEach(function(u){return u(i())});const g=((c=a.onRehydrateStorage)==null?void 0:c.call(a,i()))||void 0;return $(d.getItem.bind(d))(a.name).then(function(u){if(u)return a.deserialize(u)}).then(function(u){if(u)if(typeof u.version=="number"&&u.version!==a.version){if(a.migrate)return a.migrate(u.state,u.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return u.state}).then(function(u){var v;return m=a.merge(u,(v=i())!=null?v:R),n(m,!0),E()}).then(function(){g?.(m,void 0),l=!0,y.forEach(function(u){return u(m)})}).catch(function(u){g?.(void 0,u)})};return s.persist={setOptions:function(c){a=I(I({},a),c),c.getStorage&&(d=c.getStorage())},clearStorage:function(){var c;(c=d?.removeItem)==null||c.call(d,a.name)},rehydrate:function(){return ve()},hasHydrated:function(){return l},onHydrate:function(c){return f.add(c),function(){f.delete(c)}},onFinishHydration:function(c){return y.add(c),function(){y.delete(c)}}},ve(),m||R}},q=o.findByName("create");function P(e,t){return r.FluxDispatcher.subscribe(e,t),function(){return void r.FluxDispatcher.unsubscribe(e,t)}}const Ie=r.ReactNative.NativeModules.MMKVManager,X=o.findByStoreName("UserStore"),T=q(Ae(function(e,t){return{token:null,tokens:{},init:function(){return e({token:t().tokens[X.getCurrentUser().id]??null})},setToken:function(n){return e({token:n,tokens:{...t().tokens,[X.getCurrentUser().id]:n}})},isAuthorized:function(){return!!t().token}}},{name:"decor-auth",getStorage:function(){return Ie},partialize:function(e){return{tokens:e.tokens}},onRehydrateStorage:function(){return function(e){return e.init()}}})),Pe=P("CONNECTION_OPEN",function(){return T.getState().init()}),{pushModal:Te,popModal:Z}=o.findByProps("pushModal"),Be=o.findByName("OAuth2AuthorizeModal");function _e(){return Te({key:"oauth2-authorize",modal:{key:"oauth2-authorize",modal:Be,animation:"slide-up",shouldPersistUnderModals:!1,props:{clientId:we,redirectUri:De,scopes:["identify"],responseType:"code",permissions:0n,cancelCompletesFlow:!1,callback:async function(e){let{location:t}=e;const n=new URL(t);n.searchParams.append("client","vendetta");const i=await fetch(n);i?.ok?T.getState().setToken(await i.text()):Z("oauth2-authorize")},dismissOAuthModal:function(){return Z("oauth2-authorize")}},closable:!0}})}const $e=r.ReactNative.NativeModules.DCDFileManager??r.ReactNative.NativeModules.RTNFileManager;async function Ue(e){return e.startsWith("file://")&&(e=e.slice(7)),$e.readFile(e,"base64")}const{View:ee}=S.General,Oe=o.findByName("HeaderAvatar"),{AvatarColumn:Fe}=o.findByProps("AvatarColumn"),ke=o.findByStoreName("UserStore"),te=r.stylesheet.createThemedStyleSheet({headerAvatarContainer:{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:C.semanticColors.BACKGROUND_FLOATING,width:208,height:208,borderRadius:4},container:{flexDirection:"row",width:"100%",justifyContent:"center",alignItems:"center",paddingHorizontal:16,paddingTop:16}});function ne(e){let{pendingAvatarDecoration:t}=e;return React.createElement(ee,{style:te.container},React.createElement(ee,{style:te.headerAvatarContainer},React.createElement(Oe,{user:ke.getCurrentUser(),pendingAvatarDecoration:t,size:"editAvatarDecoration",decorationStyle:{margin:-12}})),React.createElement(Fe,{pendingAvatarDecoration:t}))}async function U(e,t){const n=await fetch(e,{...t,headers:{...t?.headers,Authorization:`Bearer ${T.getState().token}`}});if(n.ok)return n;throw new Error(await n.text())}const Le=async function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:void 0;const t=new URL(D+"/users");return e&&e.length!==0&&t.searchParams.set("ids",JSON.stringify(e)),await fetch(t).then(function(n){return n.json()})},xe=async function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"@me";return U(D+`/users/${e}/decorations`).then(function(t){return t.json()})},ze=async function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"@me";return U(D+`/users/${e}/decoration`).then(function(t){return t.json()})},re=async function(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"@me";const n=new FormData;return e&&Object.hasOwn(e,"hash")?(e=e,n.append("hash",e.hash)):e?e&&Object.hasOwn(e,"uri")&&(e=e,n.append("image",{uri:e.uri,type:e.fileType,name:e.fileName}),n.append("alt",e.alt)):n.append("hash",null),U(D+`/users/${t}/decoration`,{method:"PUT",body:n}).then(function(i){return e&&Object.hasOwn(e,"uri")?i.json():i.text()})},Me=async function(e){await U(D+`/decorations/${e}`,{method:"DELETE"})},ae=async function(){return fetch(D+"/decorations/presets").then(function(e){return e.json()})};function ie(e){return`${e.animated?"a_":""}${e.hash}`}const oe=o.findByStoreName("UserStore"),se=o.findByStoreName("SelectedChannelStore"),b=q(function(e,t){return{usersDecorations:new Map,fetchQueue:new Set,bulkFetch:r.lodash.debounce(async function(){const{fetchQueue:n,usersDecorations:i}=t();e({fetchQueue:new Set});const s=Array.from(n),a=await Le(s),l=new Map(i);for(const[f,y]of Object.entries(a)){l.set(f,y);const d=oe.getUser(f);d&&(d.avatarDecoration=y?{asset:y,skuId:A}:null,d.avatarDecorationData=d.avatarDecoration,r.FluxDispatcher.dispatch({type:"USER_UPDATE",user:d}))}for(const f of s)l.has(f)||l.set(f,null);e({usersDecorations:l})}),async fetch(n){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;const{usersDecorations:s,fetchQueue:a,bulkFetch:l}=t();!i&&s.has(n)||(e({fetchQueue:new Set(a).add(n)}),l())},async fetchMany(n){if(!n.length)return;const{usersDecorations:i,fetchQueue:s,bulkFetch:a}=t(),l=new Set(s);for(const f of n)i.has(f)||l.add(f);e({fetchQueue:l}),a()},get(n){return t().usersDecorations.get(n)},has(n){return t().usersDecorations.has(n)},set(n,i){const{usersDecorations:s}=t(),a=new Map(s);a.set(n,i),e({usersDecorations:a})}}}),He=[P("LOAD_MESSAGES_SUCCESS",function(e){let{messages:t}=e;b.getState().fetchMany(t.map(function(n){return n.author.id}))}),P("CONNECTION_OPEN",function(){b.getState().fetch(oe.getCurrentUser().id,!0)}),P("MESSAGE_CREATE",function(e){const t=se.getChannelId();e.channelId===t&&b.getState().fetch(e.message.author.id)}),P("TYPING_START",function(e){const t=se.getChannelId();e.channelId===t&&b.getState().fetch(e.userId)})];function O(e){return{asset:ie(e),skuId:A}}const Ge=o.findByName("create"),{subscribeWithSelector:je}=o.findByProps("subscribeWithSelector"),Ve=o.findByStoreName("UserStore");function Ke(e){const t=Ve.getCurrentUser();t.avatarDecoration=e?O(e):null,t.avatarDecorationData=t.avatarDecoration,b.getState().set(t.id,e?ie(e):null),r.FluxDispatcher.dispatch({type:"CURRENT_USER_UPDATE",user:t}),r.FluxDispatcher.dispatch({type:"USER_SETTINGS_ACCOUNT_SUBMIT_SUCCESS"})}const w=Ge(je(function(e,t){return{decorations:[],selectedDecoration:null,fetched:!1,fetch:async function(){return e({decorations:await xe(),selectedDecoration:await ze(),fetched:!0})},create:async function(n){const i=await re(n);e({decorations:[...t().decorations,i]})},delete:async function(n){const i=typeof n=="object"?n.hash:n;await Me(i);const{selectedDecoration:s,decorations:a}=t();let l={decorations:a.filter(function(f){return f.hash!==i})};s?.hash===i&&(l.selectedDecoration=null),e(l)},select:async function(n){e({selectedDecoration:n})},clear:function(){return e({decorations:[],selectedDecoration:null,fetched:!1})}}})),We=[w.subscribe(function(e){return[e.selectedDecoration,e.fetched]},r.lodash.debounce(function(e,t){let[n,i]=e,[s,a]=t;i!==a||n?.hash===s?.hash||(re(n),Ke(n))},1e3)),P("CONNECTION_OPEN",function(){return w.getState().clear()})],{FormIcon:Qe}=S.Forms;function F(e){let{source:t}=e;return React.createElement(Qe,{source:t,style:{opacity:1}})}const{ScrollView:Ye,View:ce}=r.ReactNative,{FormSection:Je,FormRow:qe,FormArrow:Xe,FormInput:Ze,FormDivider:et,FormHint:k}=S.Forms,{popModal:tt}=o.findByProps("pushModal"),{launchImageLibrary:nt}=o.findByProps("launchImageLibrary"),{useSafeAreaInsets:rt}=o.findByProps("useSafeAreaInsets"),at=o.findByProps("parseTopic"),it=r.stylesheet.createThemedStyleSheet({errorHint:{paddingTop:16,color:C.semanticColors.TEXT_DANGER}});function ot(){const[e,t]=r.React.useState(null),[n,i]=r.React.useState(""),[s,a]=r.React.useState(!1),[l,f]=r.React.useState(null);r.React.useEffect(function(){l&&f(null)},[e]);const y=rt(),d=w(function(p){return p.create});return r.React.createElement(Ye,{contentContainerStyle:{flexGrow:1}},r.React.createElement(ce,{style:{flex:1}},r.React.createElement(ne,{pendingAvatarDecoration:e?{asset:e?.uri,skuId:Q}:null}),l!==null&&r.React.createElement(k,{style:it.errorHint},l.message),r.React.createElement(Je,null,r.React.createElement(qe,{label:"Select Image",leading:r.React.createElement(F,{source:h.getAssetIDByName("ic_image")}),trailing:Xe,onPress:function(){nt({mediaType:"photo"},function(p){if(!p||p.didCancel){t(null);return}const E=p.assets[0];E&&t(E)})}}),r.React.createElement(k,null,"File should be APNG or PNG."),r.React.createElement(et,null),r.React.createElement(Ze,{value:n,onChange:i,placeholder:"Companion Cube",title:"Name"})),r.React.createElement(k,null,at.parse("Make sure your decoration does not violate [the guidelines](https://github.com/decor-discord/.github/blob/main/GUIDELINES.md) before creating your decoration.",!0,{allowLinks:!0})),r.ReactNative.Platform.OS==="android"&&r.React.createElement(k,null,"APNGs will not animate in the preview above on Android.")),r.React.createElement(ce,{style:{justifyContent:"flex-end",paddingHorizontal:16,paddingBottom:y.bottom}},r.React.createElement(S.Button,{text:"Create",color:"brand",size:"medium",onPress:async function(){a(!0);try{let p;r.ReactNative.Platform.OS==="ios"?p="data:"+e.type+";base64,"+await Ue(e.uri):p=e.uri,await d({uri:p,fileName:e.fileName,fileType:e.type,alt:n}),tt("create-decoration"),_.showToast("Decoration created and pending review.",h.getAssetIDByName("Check"))}catch(p){f(p),a(!1)}},loading:s,disabled:!e||!n||e.type!=="image/png"||!!l})))}const st=o.findByName("Navigator")??o.findByProps("Navigator")?.Navigator,ct=o.findByProps("getRenderCloseButton")?.getRenderCloseButton??o.findByProps("getHeaderCloseButton")?.getHeaderCloseButton,{popModal:lt}=o.findByProps("pushModal");function ut(){return React.createElement(st,{initialRouteName:"CREATE_DECORATION",screens:{CREATE_DECORATION:{headerLeft:ct(function(){return lt("create-decoration")}),render:ot,title:"Create Decoration"}}})}const{pushModal:dt}=o.findByProps("pushModal");function ft(){return dt({key:"create-decoration",modal:{key:"create-decoration",modal:ut,animation:"slide-up",shouldPersistUnderModals:!1,closable:!0}})}const{View:le,TouchableOpacity:ht}=r.ReactNative,{triggerHapticFeedback:gt,HapticFeedbackTypes:pt}=o.findByProps("triggerHapticFeedback"),L=r.stylesheet.createThemedStyleSheet({container:{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:C.semanticColors.BACKGROUND_FLOATING,width:72,height:72,borderRadius:4},inner:{display:"flex",justifyContent:"space-evenly",alignItems:"center"},selected:{borderWidth:2,borderColor:C.semanticColors.BUTTON_OUTLINE_BRAND_BORDER_ACTIVE},disabled:{opacity:.5}}),ue=function(e){gt(pt.IMPACT_LIGHT),e()};function de(e){let{onPress:t=void 0,onLongPress:n=void 0,disabled:i=void 0,lookDisabled:s=void 0,selected:a=!1,children:l}=e;return React.createElement(ht,{onPress:t?function(){return ue(t)}:void 0,onLongPress:n?function(){return ue(n)}:void 0,disabled:i},React.createElement(le,{style:[L.container,a?L.selected:null]},React.createElement(le,{style:[L.inner,(i||s)&&L.disabled]},l)))}const{TextStyleSheet:yt,Text:vt}=o.findByProps("TextStyleSheet");function G(e){let{source:t,label:n,onPress:i,disabled:s,lookDisabled:a=!1,selected:l=!1}=e;return React.createElement(de,{onPress:i,disabled:s,lookDisabled:a,selected:l},React.createElement(F,{source:t}),React.createElement(vt,{style:[yt["text-sm/medium"]]},n))}const Rt=o.findByProps("getAvatarDecorationURL","default"),{showSimpleActionSheet:St}=o.findByProps("showSimpleActionSheet"),{hideActionSheet:Et}=o.findByProps("openLazy","hideActionSheet"),Dt=o.findByStoreName("UserStore"),{Image:bt}=r.ReactNative;function wt(e){return St({key:"DecorationActionSheet",header:{title:e.alt??"Decoration",icon:React.createElement(bt,{source:{uri:Rt.getAvatarDecorationURL({avatarDecoration:O(e)})},style:{width:24,height:24,marginRight:8}}),onClose:function(){return Et()}},options:[{icon:h.getAssetIDByName("ic_message_copy"),label:"Copy Decoration Hash",onPress:function(){r.clipboard.setString(e.hash),_.showToast("Copied Decoration Hash!",h.getAssetIDByName("toast_copy_message"))}},...e.authorId===Dt.getCurrentUser().id?[{icon:h.getAssetIDByName("ic_message_delete"),label:"Delete",isDestructive:!0,onPress:function(){return W.showConfirmationAlert({title:"Delete Decoration",content:`Are you sure you want to delete ${e.alt??"this decoration"}?`,confirmText:"Delete",cancelText:"Cancel",confirmColor:"red",onConfirm:function(){return r.ReactNative.unstable_batchedUpdates(function(){return w.getState().delete(e)})}})}}]:[]]})}const Nt=o.findByName("CutoutableAvatarDecoration");function fe(e){let{decoration:t,onPress:n=void 0,selectable:i=void 0,disabled:s=void 0}=e;const{selectedDecoration:a,select:l}=w(function(y){return{selectedDecoration:y.selectedDecoration,select:y.select}});i??=t.reviewed===null||t.reviewed===!0,n??=i?function(){return l(t)}:function(){return _.showToast("This decoration has not been approved yet.",h.getAssetIDByName("img_none"))};const f=a?.hash===t.hash;return React.createElement(de,{onPress:n,onLongPress:function(){return wt(t)},selected:f,disabled:s,lookDisabled:!i},React.createElement(Nt,{avatarDecoration:O(t),size:56,animate:f}))}const{FormTitle:mt}=S.Forms,{View:j,FlatList:Ct,Image:At}=r.ReactNative,{TextStyleSheet:It,Text:Pt}=o.findByProps("TextStyleSheet"),{default:Tt,OverflowCircle:Bt}=o.findByName("SummarizedIconRow",!1),{type:_t}=o.findByProps("AvatarSizes").default,he=r.stylesheet.createThemedStyleSheet({wrapper:{borderWidth:2,borderRadius:20,borderColor:C.semanticColors.BACKGROUND_SECONDARY,backgroundColor:C.semanticColors.BACKGROUND_SECONDARY}}),$t=o.findByProps("getUser","fetchCurrentUser"),Ut=o.findByStoreName("UserStore"),Ot=[h.getAssetIDByName("default_avatar_0"),h.getAssetIDByName("default_avatar_1"),h.getAssetIDByName("default_avatar_2"),h.getAssetIDByName("default_avatar_3"),h.getAssetIDByName("default_avatar_4"),h.getAssetIDByName("default_avatar_5")];function Ft(e){let{user:t,id:n}=e;if(t)return React.createElement(_t,{user:t,size:"size16"});{const i=Number((BigInt(n)>>22n)%6n);return React.createElement(At,{source:Ot[i],style:{width:16,height:16,borderRadius:8}})}}function kt(e){let{preset:t}=e;const n=w(function(s){return s.select}),i=r.NavigationNative.useNavigation();return React.createElement(j,null,React.createElement(j,null,React.createElement(mt,{title:t.name,icon:React.createElement(Tt,{iconWrapperStyle:he.wrapper,items:t.authorIds.map(function(s){const a=Ut.getUser(s);return a||$t.getUser(s),{user:a,id:s}}),max:5,offsetAmount:-8,overflowComponent:Bt,overflowStyle:he.wrapper,style:{height:16},renderItem:Ft})}),t.description&&React.createElement(Pt,{style:[It["text-sm/medium"],{paddingHorizontal:16,paddingBottom:8}]},t.description)),React.createElement(Ct,{horizontal:!0,showsHorizontalScrollIndicator:!1,data:t.decorations,renderItem:function(s){let{item:a}=s;return React.createElement(fe,{decoration:a,onPress:function(){n(a),i.pop()}})},ItemSeparatorComponent:function(){return React.createElement(j,{style:{width:4}})},snapToInterval:74,decelerationRate:"fast",contentContainerStyle:{paddingHorizontal:8}}))}const{View:Lt}=S.General,{FlatList:xt}=r.ReactNative;function zt(){const[e,t]=r.React.useState([]);return r.React.useEffect(function(){ae().then(function(n){return t(n)})},[]),r.React.createElement(xt,{data:e,renderItem:function(n){let{item:i}=n;return r.React.createElement(kt,{preset:i})},ListFooterComponent:function(){return r.React.createElement(Lt,{style:{height:18}})}})}const{FlatList:Mt,View:x,ActivityIndicator:Ht,Pressable:Gt}=r.ReactNative,{FormTitle:jt}=S.Forms,{TextStyleSheet:V,Text:K}=o.findByProps("TextStyleSheet"),Vt=o.findByStoreName("UserStore"),Kt=o.findByProps("parse","parseToAST"),{showUserProfile:ge}=o.findByProps("showUserProfile"),Wt=o.findByProps("getUser","fetchCurrentUser");function Qt(){const[e,t]=r.React.useState(!1),[n,i]=r.React.useState([]),{decorations:s,selectedDecoration:a,fetch:l,clear:f,select:y}=w(),{isAuthorized:d}=T();r.React.useEffect(function(){d()?(ae().then(function(R){return i(R)}).catch(function(){}),l().then(function(){return t(!1)}).catch(function(){return t(null)}),t(!0)):(f(),t(!1))},[d]);const p=r.NavigationNative.useNavigation(),E=s.some(function(R){return R.reviewed===!1}),z=n&&a&&n.find(function(R){return R.id===a.presetId});return r.React.createElement(r.React.Fragment,null,r.React.createElement(ne,{pendingAvatarDecoration:a?O(a):null}),a&&r.React.createElement(x,{style:{marginTop:12,paddingHorizontal:16,gap:8}},r.React.createElement(K,{style:V["text-lg/semibold"]},a.alt),z&&r.React.createElement(K,{style:V.eyebrow},"Part of the ",z.name," Preset"),r.React.createElement(K,{style:V["text-md/normal"]},"Created by"," ",r.React.createElement(Gt,{onPress:function(){return Vt.getUser(a.authorId)?ge({userId:a.authorId}):Wt.getUser(a.authorId).then(function(){return ge({userId:a.authorId})})},pointerEvents:"box-only",style:{flexGrow:0,flexShrink:0}},Kt.parse(`<@${a.authorId}>`,!0)))),r.React.createElement(jt,{title:"Decorations",icon:e?r.React.createElement(Ht,null):e===null?r.React.createElement(F,{source:h.getAssetIDByName("ic_warning_24px")}):void 0}),r.React.createElement(Mt,{horizontal:!0,showsHorizontalScrollIndicator:!1,data:s,renderItem:function(R){let{item:m}=R;return r.React.createElement(fe,{decoration:m,disabled:!d()||e===null})},snapToInterval:74,decelerationRate:"fast",ItemSeparatorComponent:function(){return r.React.createElement(x,{style:{width:4}})},ListHeaderComponent:function(){return r.React.createElement(G,{source:h.getAssetIDByName("img_none"),label:"None",onPress:function(){y(null)},disabled:!d()||e===null,selected:!a})},ListHeaderComponentStyle:{paddingRight:s.length===0?2:4},ListFooterComponent:function(){return r.React.createElement(x,{style:{flexDirection:"row"}},r.React.createElement(G,{source:h.getAssetIDByName("smile"),label:"Presets",onPress:function(){p.push("VendettaCustomPage",{title:"Presets",render:zt})},selected:a&&a.presetId!==null,disabled:!d()||e===null}),r.React.createElement(x,{style:{width:4}}),r.React.createElement(G,{source:h.getAssetIDByName("ic_add_24px"),label:"New..",onPress:E?function(){return _.showToast("You already have a decoration pending review!",h.getAssetIDByName("img_none"))}:ft,lookDisabled:E,disabled:!d()||e===null}))},ListFooterComponentStyle:{paddingLeft:s.length===0?2:4},contentContainerStyle:{paddingHorizontal:8}}))}const{Messages:B}=o.findByProps("Messages");o.findByProps("triggerHapticFeedback");const{ScrollView:on,View:pe}=r.ReactNative,{FormSection:Yt,FormRow:Jt,FormArrow:qt,FormSwitchRow:sn,FormCTAButton:Xt,FormDivider:cn,FormInput:ln}=S.Forms,Zt=S.HelpMessage,{KeyboardAwareScrollView:en}=o.findByProps("KeyboardAwareScrollView");function tn(){const{isAuthorized:e}=T();return r.React.createElement(en,null,!e()&&r.React.createElement(pe,{style:{padding:8}},r.React.createElement(Zt,{messageType:0},"You need to Authorize with Decor before you can get custom decorations.")),r.React.createElement(Qt,null),!e()&&r.React.createElement(Yt,null,r.React.createElement(Jt,{label:"Authorize with Decor",leading:r.React.createElement(F,{source:h.getAssetIDByName("ic_link_24px")}),trailing:qt,onPress:_e})),e()&&r.React.createElement(Xt,{color:"danger",label:B.LOGOUT,onPress:function(){return W.showConfirmationAlert({title:B.LOGOUT,content:B.USER_SETTINGS_CONFIRM_LOGOUT,confirmText:B.LOGOUT,confirmColor:"red",cancelText:B.CANCEL,onConfirm:function(){return Se.storage.token=void 0}})}}),r.React.createElement(pe,{style:{height:40}}))}const ye=o.findByStoreName("UserStore"),nn=o.findByProps("getAvatarDecorationURL","default"),rn=o.findByProps("isAnimatedAvatarDecoration");let N=[];var an={onLoad:async function(){N.push(Pe),N.push(...He),N.push(...We),N.push(H.after("getUser",ye,function(e,t){const n=b.getState();if(t&&n.has(t.id)){const i=n.get(t.id);i&&t.avatarDecoration?.skuId!==A?t.avatarDecoration={asset:i,skuId:A}:!i&&t.avatarDecoration&&t.avatarDecoration?.skuId===A&&(t.avatarDecoration=null),t.avatarDecorationData=t.avatarDecoration}})),N.push(H.instead("getAvatarDecorationURL",nn,function(e,t){const[{avatarDecoration:n,canAnimate:i}]=e;if(n?.skuId===A){const s=n.asset.split("_");return!i&&s[0]==="a"&&s.shift(),be+`/${s.join("_")}.png`}else return n?.skuId===Q?n.asset:t(...e)})),N.push(H.after("isAnimatedAvatarDecoration",rn,function(e,t){let[n]=e;if(r.ReactNative.Platform.OS==="ios"&&n?.asset?.startsWith("file://"))return!0})),b.getState().fetch(ye.getCurrentUser().id,!0)},onUnload:function(){N.forEach(function(e){return e()})},settings:tn};return M.default=an,Object.defineProperty(M,"__esModule",{value:!0}),M})({},vendetta.metro,vendetta.metro.common,vendetta.patcher,vendetta.plugin,vendetta.ui.alerts,vendetta.ui.assets,vendetta.ui.components,vendetta.ui,vendetta.ui.toasts);