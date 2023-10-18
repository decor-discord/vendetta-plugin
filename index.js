(function(_,o,r,F,de,x,v,R,w,O){"use strict";const fe="https://decor.fieryflames.dev",D=fe+"/api",he=D+"/authorize",pe="https://decorcdn.fieryflames.dev",ge="1096966363416899624",E="100101099111114",H="11497119";var ye=Object.defineProperty,G=Object.getOwnPropertySymbols,ve=Object.prototype.hasOwnProperty,Re=Object.prototype.propertyIsEnumerable,j=function(e,n,t){return n in e?ye(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t},m=function(e,n){for(var t in n||(n={}))ve.call(n,t)&&j(e,t,n[t]);if(G)for(var t of G(n))Re.call(n,t)&&j(e,t,n[t]);return e};const P=function(e){return function(n){try{const t=e(n);return t instanceof Promise?t:{then(a){return P(a)(t)},catch(a){return this}}}catch(t){return{then(a){return this},catch(a){return P(a)(t)}}}}},Se=function(e,n){return function(t,a,s){let i=m({getStorage:function(){return localStorage},serialize:JSON.stringify,deserialize:JSON.parse,partialize:function(c){return c},version:0,merge:function(c,p){return m(m({},p),c)}},n);(i.blacklist||i.whitelist)&&console.warn(`The ${i.blacklist?"blacklist":"whitelist"} option is deprecated and will be removed in the next version. Please use the 'partialize' option instead.`);let l=!1;const d=new Set,g=new Set;let f;try{f=i.getStorage()}catch{}if(f)f.removeItem||console.warn(`[zustand persist middleware] The given storage for item '${i.name}' does not contain a 'removeItem' method, which will be required in v4.`);else return e(function(){for(var c=arguments.length,p=new Array(c),u=0;u<c;u++)p[u]=arguments[u];console.warn(`[zustand persist middleware] Unable to update item '${i.name}', the given storage is currently unavailable.`),t(...p)},a,s);const h=P(i.serialize),S=function(){const c=i.partialize(m({},a()));i.whitelist&&Object.keys(c).forEach(function(y){var ue;!((ue=i.whitelist)!=null&&ue.includes(y))&&delete c[y]}),i.blacklist&&i.blacklist.forEach(function(y){return delete c[y]});let p;const u=h({state:c,version:i.version}).then(function(y){return f.setItem(i.name,y)}).catch(function(y){p=y});if(p)throw p;return u},jt=s.setState;s.setState=function(c,p){jt(c,p),S()};const ce=e(function(){for(var c=arguments.length,p=new Array(c),u=0;u<c;u++)p[u]=arguments[u];t(...p),S()},a,s);let I;const le=function(){var c;if(!f)return;l=!1,d.forEach(function(u){return u(a())});const p=((c=i.onRehydrateStorage)==null?void 0:c.call(i,a()))||void 0;return P(f.getItem.bind(f))(i.name).then(function(u){if(u)return i.deserialize(u)}).then(function(u){if(u)if(typeof u.version=="number"&&u.version!==i.version){if(i.migrate)return i.migrate(u.state,u.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return u.state}).then(function(u){var y;return I=i.merge(u,(y=a())!=null?y:ce),t(I,!0),S()}).then(function(){p?.(I,void 0),l=!0,g.forEach(function(u){return u(I)})}).catch(function(u){p?.(void 0,u)})};return s.persist={setOptions:function(c){i=m(m({},i),c),c.getStorage&&(f=c.getStorage())},clearStorage:function(){var c;(c=f?.removeItem)==null||c.call(f,i.name)},rehydrate:function(){return le()},hasHydrated:function(){return l},onHydrate:function(c){return d.add(c),function(){d.delete(c)}},onFinishHydration:function(c){return g.add(c),function(){g.delete(c)}}},le(),I||ce}},K=o.findByName("create"),De=r.ReactNative.NativeModules.MMKVManager,V=o.findByStoreName("UserStore"),N=K(Se(function(e,n){return{token:null,tokens:{},init:function(){return e({token:n().tokens[V.getCurrentUser().id]??null})},setToken:function(t){return e({token:t,tokens:{...n().tokens,[V.getCurrentUser().id]:t}})},isAuthorized:function(){return!!n().token}}},{name:"decor-auth",getStorage:function(){return De},partialize:function(e){return{tokens:e.tokens}},onRehydrateStorage:function(){return function(e){return e.init()}}})),be=r.FluxDispatcher.subscribe("CONNECTION_OPEN",function(){return N.getState().init()}),{pushModal:we,popModal:W}=o.findByProps("pushModal"),Ee=o.findByName("OAuth2AuthorizeModal");function me(){return we({key:"oauth2-authorize",modal:{key:"oauth2-authorize",modal:Ee,animation:"slide-up",shouldPersistUnderModals:!1,props:{clientId:ge,redirectUri:he,scopes:["identify"],responseType:"code",permissions:0n,cancelCompletesFlow:!1,callback:async function(e){let{location:n}=e;const t=new URL(n);t.searchParams.append("client","vendetta");const a=await fetch(t);a?.ok?N.getState().setToken(await a.text()):W("oauth2-authorize")},dismissOAuthModal:function(){return W("oauth2-authorize")}},closable:!0}})}const Ae=r.ReactNative.NativeModules.DCDFileManager??r.ReactNative.NativeModules.RTNFileManager;async function Ne(e){return e.startsWith("file://")&&(e=e.slice(7)),Ae.readFile(e,"base64")}const{View:Q}=R.General,Ce=o.findByName("HeaderAvatar"),{AvatarColumn:Ie}=o.findByProps("AvatarColumn"),Pe=o.findByStoreName("UserStore"),Y=r.stylesheet.createThemedStyleSheet({headerAvatarContainer:{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:w.semanticColors.BACKGROUND_FLOATING,width:208,height:208,borderRadius:4},container:{flexDirection:"row",width:"100%",justifyContent:"center",alignItems:"center",paddingHorizontal:16,paddingTop:16}});function J(e){let{pendingAvatarDecoration:n}=e;return React.createElement(Q,{style:Y.container},React.createElement(Q,{style:Y.headerAvatarContainer},React.createElement(Ce,{user:Pe.getCurrentUser(),pendingAvatarDecoration:n,size:"editAvatarDecoration",decorationStyle:{margin:-12}})),React.createElement(Ie,{pendingAvatarDecoration:n}))}async function $(e,n){const t=await fetch(e,{...n,headers:{...n?.headers,Authorization:`Bearer ${N.getState().token}`}});if(t.ok)return t;throw new Error(await t.text())}const $e=async function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:void 0;const n=new URL(D+"/users");return e&&e.length!==0&&n.searchParams.set("ids",JSON.stringify(e)),await fetch(n).then(function(t){return t.json()})},Te=async function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"@me";return $(D+`/users/${e}/decorations`).then(function(n){return n.json()})},Be=async function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"@me";return $(D+`/users/${e}/decoration`).then(function(n){return n.json()})},q=async function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"@me";const t=new FormData;return e&&Object.hasOwn(e,"hash")?(e=e,t.append("hash",e.hash)):e?e&&Object.hasOwn(e,"uri")&&(e=e,t.append("image",{uri:e.uri,type:e.fileType,name:e.fileName}),t.append("alt",e.alt)):t.append("hash",null),$(D+`/users/${n}/decoration`,{method:"PUT",body:t}).then(function(a){return e&&Object.hasOwn(e,"uri")?a.json():a.text()})},Ue=async function(e){await $(D+`/decorations/${e}`,{method:"DELETE"})},_e=async function(){return fetch(D+"/decorations/presets").then(function(e){return e.json()})};function k(e){return`${e.animated?"a_":""}${e.hash}`}const Fe=o.findByName("create"),{subscribeWithSelector:Oe}=o.findByProps("subscribeWithSelector"),ke=o.findByStoreName("UserStore"),A=Fe(Oe(function(e,n){return{decorations:[],selectedDecoration:null,fetched:!1,fetch:async function(){return e({decorations:await Te(),selectedDecoration:await Be(),fetched:!0})},create:async function(t){const a=await q(t);e({decorations:[...n().decorations,a]})},delete:async function(t){const a=typeof t=="object"?t.hash:t;await Ue(a);const{selectedDecoration:s,decorations:i}=n();let l={decorations:i.filter(function(d){return d.hash!==a})};s?.hash===a&&(l.selectedDecoration=null),e(l)},select:async function(t){e({selectedDecoration:t})},clear:function(){return e({decorations:[],selectedDecoration:null,fetched:!1})}}})),Le=A.subscribe(function(e){return[e.selectedDecoration,e.fetched]},r.lodash.debounce(function(e,n){let[t,a]=e,[s,i]=n;if(a!==i||t?.hash===s?.hash)return;q(t);const l=ke.getCurrentUser();l.avatarDecoration=t?k(t):null,r.FluxDispatcher.dispatch({type:"USER_UPDATE",user:l})},1e3)),{FormIcon:ze}=R.Forms;function T(e){let{source:n}=e;return React.createElement(ze,{source:n,style:{opacity:1}})}const{ScrollView:Me,View:X}=r.ReactNative,{FormSection:xe,FormRow:He,FormArrow:Ge,FormInput:je,FormDivider:Ke,FormHint:B}=R.Forms,{popModal:Ve}=o.findByProps("pushModal"),{launchImageLibrary:We}=o.findByProps("launchImageLibrary"),{useSafeAreaInsets:Qe}=o.findByProps("useSafeAreaInsets"),Ye=o.findByProps("parseTopic"),Je=r.stylesheet.createThemedStyleSheet({errorHint:{paddingTop:16,color:w.semanticColors.TEXT_DANGER}});function qe(){const[e,n]=r.React.useState(null),[t,a]=r.React.useState(""),[s,i]=r.React.useState(!1),[l,d]=r.React.useState(null);r.React.useEffect(function(){l&&d(null)},[e]);const g=Qe(),f=A(function(h){return h.create});return r.React.createElement(Me,{contentContainerStyle:{flexGrow:1}},r.React.createElement(X,{style:{flex:1}},r.React.createElement(J,{pendingAvatarDecoration:e?{asset:e?.uri,skuId:H}:null}),l!==null&&r.React.createElement(B,{style:Je.errorHint},l.message),r.React.createElement(xe,null,r.React.createElement(He,{label:"Select Image",leading:r.React.createElement(T,{source:v.getAssetIDByName("ic_image")}),trailing:Ge,onPress:function(){We({mediaType:"photo"},function(h){if(!h||h.didCancel){n(null);return}const S=h.assets[0];S&&n(S)})}}),r.React.createElement(B,null,"File should be APNG or PNG."),r.React.createElement(Ke,null),r.React.createElement(je,{value:t,onChange:a,placeholder:"Companion Cube",title:"Name"})),r.React.createElement(B,null,Ye.parse("Make sure your decoration does not violate [the guidelines](https://github.com/decor-discord/.github/blob/main/GUIDELINES.md) before creating your decoration.",!0,{allowLinks:!0})),r.ReactNative.Platform.OS==="android"&&r.React.createElement(B,null,"APNGs will not animate in the preview above on Android.")),r.React.createElement(X,{style:{justifyContent:"flex-end",paddingHorizontal:16,paddingBottom:g.bottom}},r.React.createElement(R.Button,{text:"Create",color:"brand",size:"medium",onPress:async function(){i(!0);try{let h;r.ReactNative.Platform.OS==="ios"?h="data:"+e.type+";base64,"+await Ne(e.uri):h=e.uri,await f({uri:h,fileName:e.fileName,fileType:e.type,alt:t}),Ve("create-decoration"),O.showToast("Decoration created and pending review.",v.getAssetIDByName("Check"))}catch(h){d(h),i(!1)}},loading:s,disabled:!e||!t||e.type!=="image/png"||!!l})))}const Xe=o.findByName("Navigator")??o.findByProps("Navigator")?.Navigator,Ze=o.findByProps("getRenderCloseButton")?.getRenderCloseButton??o.findByProps("getHeaderCloseButton")?.getHeaderCloseButton,{popModal:et}=o.findByProps("pushModal");function tt(){return React.createElement(Xe,{initialRouteName:"CREATE_DECORATION",screens:{CREATE_DECORATION:{headerLeft:Ze(function(){return et("create-decoration")}),render:qe,title:"Create Decoration"}}})}const{pushModal:nt}=o.findByProps("pushModal");function rt(){return nt({key:"create-decoration",modal:{key:"create-decoration",modal:tt,animation:"slide-up",shouldPersistUnderModals:!1,closable:!0}})}const{View:Z,TouchableOpacity:at}=r.ReactNative,{triggerHapticFeedback:it,HapticFeedbackTypes:ot}=o.findByProps("triggerHapticFeedback"),U=r.stylesheet.createThemedStyleSheet({container:{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:w.semanticColors.BACKGROUND_FLOATING,width:72,height:72,borderRadius:4},inner:{display:"flex",justifyContent:"space-evenly",alignItems:"center"},selected:{borderWidth:2,borderColor:w.semanticColors.BUTTON_OUTLINE_BRAND_BORDER_ACTIVE},disabled:{opacity:.5}}),ee=function(e){it(ot.IMPACT_LIGHT),e()};function te(e){let{onPress:n=void 0,onLongPress:t=void 0,disabled:a=void 0,lookDisabled:s=void 0,selected:i=!1,children:l}=e;return React.createElement(at,{onPress:n?function(){return ee(n)}:void 0,onLongPress:t?function(){return ee(t)}:void 0,disabled:a},React.createElement(Z,{style:[U.container,i?U.selected:null]},React.createElement(Z,{style:[U.inner,(a||s)&&U.disabled]},l)))}const{TextStyleSheet:st,Text:ct}=o.findByProps("TextStyleSheet");function L(e){let{source:n,label:t,onPress:a,disabled:s,lookDisabled:i=!1,selected:l=!1}=e;return React.createElement(te,{onPress:a,disabled:s,lookDisabled:i,selected:l},React.createElement(T,{source:n}),React.createElement(ct,{style:[st["text-sm/medium"]]},t))}const lt=o.findByProps("getAvatarDecorationURL","default"),{showSimpleActionSheet:ut}=o.findByProps("showSimpleActionSheet"),{hideActionSheet:dt}=o.findByProps("openLazy","hideActionSheet"),ft=o.findByStoreName("UserStore"),{Image:ht}=r.ReactNative;function pt(e){return ut({key:"DecorationActionSheet",header:{title:e.alt??"Decoration",icon:React.createElement(ht,{source:{uri:lt.getAvatarDecorationURL({avatarDecoration:k(e)})},style:{width:24,height:24,marginRight:8}}),onClose:function(){return dt()}},options:[...e.authorId===ft.getCurrentUser().id?[{icon:v.getAssetIDByName("ic_message_delete"),label:"Delete",isDestructive:!0,onPress:function(){return x.showConfirmationAlert({title:"Delete Decoration",content:`Are you sure you want to delete ${e.alt??"this decoration"}?`,confirmText:"Delete",cancelText:"Cancel",confirmColor:"red",onConfirm:function(){return r.ReactNative.unstable_batchedUpdates(function(){return A.getState().delete(e)})}})}}]:[]]})}function ne(e){return{asset:k(e),skuId:E}}const gt=o.findByName("CutoutableAvatarDecoration");function re(e){let{decoration:n,onPress:t=void 0,selectable:a=void 0,disabled:s=void 0}=e;const{selectedDecoration:i,select:l}=A(function(g){return{selectedDecoration:g.selectedDecoration,select:g.select}});a??=n.reviewed===null||n.reviewed===!0,t??=a?function(){return l(n)}:function(){return O.showToast("This decoration has not been approved yet.",v.getAssetIDByName("img_none"))};const d=i?.hash===n.hash;return React.createElement(te,{onPress:t,onLongPress:function(){return pt(n)},selected:d,disabled:s,lookDisabled:!a},React.createElement(gt,{avatarDecoration:ne(n),size:56,animate:d}))}const{FormTitle:yt}=R.Forms,{View:z,FlatList:vt}=r.ReactNative,{TextStyleSheet:Rt,Text:St}=o.findByProps("TextStyleSheet"),{default:Dt,OverflowCircle:bt}=o.findByName("SummarizedIconRow",!1),{type:wt}=o.findByProps("AvatarSizes").default,ae=r.stylesheet.createThemedStyleSheet({wrapper:{borderWidth:2,borderRadius:20,borderColor:w.semanticColors.BACKGROUND_SECONDARY,backgroundColor:w.semanticColors.BACKGROUND_SECONDARY}}),Et=o.findByStoreName("UserStore");function mt(e){if(e)return React.createElement(wt,{user:e,size:"size16"})}function At(e){let{preset:n}=e;const t=A(function(s){return s.select}),a=r.NavigationNative.useNavigation();return React.createElement(z,null,React.createElement(z,null,React.createElement(yt,{title:n.name,icon:React.createElement(Dt,{iconWrapperStyle:ae.wrapper,items:n.authorIds.map(function(s){return Et.getUser(s)}),max:5,offsetAmount:-8,overflowComponent:bt,overflowStyle:ae.wrapper,style:{height:16},renderItem:mt})}),n.description&&React.createElement(St,{style:[Rt["text-sm/medium"],{paddingHorizontal:16,paddingBottom:8}]},n.description)),React.createElement(vt,{horizontal:!0,showsHorizontalScrollIndicator:!1,data:n.decorations,renderItem:function(s){let{item:i}=s;return React.createElement(re,{decoration:i,onPress:function(){t(i),a.pop()}})},ItemSeparatorComponent:function(){return React.createElement(z,{style:{width:4}})},snapToInterval:74,decelerationRate:"fast",contentContainerStyle:{paddingHorizontal:8}}))}const{FlatList:Nt}=r.ReactNative;function Ct(){const[e,n]=r.React.useState([]);return r.React.useEffect(function(){_e().then(function(t){return n(t)})},[]),r.React.createElement(Nt,{data:e,renderItem:function(t){let{item:a}=t;return r.React.createElement(At,{preset:a})}})}const{FlatList:It,View:M,ActivityIndicator:Pt}=r.ReactNative,{FormTitle:$t}=R.Forms;function Tt(){const[e,n]=r.React.useState(!1),{decorations:t,selectedDecoration:a,fetch:s,clear:i,select:l}=A(),{isAuthorized:d}=N();r.React.useEffect(function(){d()?(s().then(function(){return n(!1)}).catch(function(h){return n(null)}),n(!0)):(i(),n(!1))},[d]);const g=r.NavigationNative.useNavigation(),f=t.some(function(h){return h.reviewed===!1});return r.React.createElement(r.React.Fragment,null,r.React.createElement(J,{pendingAvatarDecoration:a?ne(a):null}),r.React.createElement($t,{title:"Decorations",icon:e?r.React.createElement(Pt,null):e===null?r.React.createElement(T,{source:v.getAssetIDByName("ic_warning_24px")}):void 0}),r.React.createElement(It,{horizontal:!0,showsHorizontalScrollIndicator:!1,data:t,renderItem:function(h){let{item:S}=h;return r.React.createElement(re,{decoration:S,disabled:!d()||e===null})},snapToInterval:74,decelerationRate:"fast",ItemSeparatorComponent:function(){return r.React.createElement(M,{style:{width:4}})},ListHeaderComponent:function(){return r.React.createElement(L,{source:v.getAssetIDByName("img_none"),label:"None",onPress:function(){l(null)},disabled:!d()||e===null,selected:!a})},ListHeaderComponentStyle:{paddingRight:t.length===0?2:4},ListFooterComponent:function(){return r.React.createElement(M,{style:{flexDirection:"row"}},r.React.createElement(L,{source:v.getAssetIDByName("smile"),label:"Presets",onPress:function(){g.push("VendettaCustomPage",{title:"Presets",render:Ct})},selected:a&&a.presetId!==null,disabled:!d()||e===null}),r.React.createElement(M,{style:{width:4}}),r.React.createElement(L,{source:v.getAssetIDByName("ic_add_24px"),label:"New..",onPress:f?function(){return O.showToast("You already have a decoration pending review!",v.getAssetIDByName("img_none"))}:rt,lookDisabled:f,disabled:!d()||e===null}))},ListFooterComponentStyle:{paddingLeft:t.length===0?2:4},contentContainerStyle:{paddingHorizontal:8}}))}const{Messages:C}=o.findByProps("Messages");o.findByProps("triggerHapticFeedback");const{ScrollView:Kt,View:ie}=r.ReactNative,{FormSection:Bt,FormRow:Ut,FormArrow:_t,FormSwitchRow:Vt,FormCTAButton:Ft,FormDivider:Wt,FormInput:Qt}=R.Forms,Ot=R.HelpMessage,{KeyboardAwareScrollView:kt}=o.findByProps("KeyboardAwareScrollView");function Lt(){const{isAuthorized:e}=N();return r.React.createElement(kt,null,!e()&&r.React.createElement(ie,{style:{padding:8}},r.React.createElement(Ot,{messageType:0},"You need to Authorize with Decor before you can get custom decorations.")),r.React.createElement(Tt,null),!e()&&r.React.createElement(Bt,null,r.React.createElement(Ut,{label:"Authorize with Decor",leading:r.React.createElement(T,{source:v.getAssetIDByName("ic_link_24px")}),trailing:_t,onPress:me})),e()&&r.React.createElement(Ft,{color:"danger",label:C.LOGOUT,onPress:function(){return x.showConfirmationAlert({title:C.LOGOUT,content:C.USER_SETTINGS_CONFIRM_LOGOUT,confirmText:C.LOGOUT,confirmColor:"red",cancelText:C.CANCEL,onConfirm:function(){return de.storage.token=void 0}})}}),r.React.createElement(ie,{style:{height:40}}))}const zt=o.findByStoreName("UserStore"),oe=K(function(e,n){return{usersDecorations:new Map,fetchQueue:new Set,bulkFetch:r.lodash.debounce(async function(){const{fetchQueue:t,usersDecorations:a}=n();e({fetchQueue:new Set});const s=Array.from(t),i=await $e(s),l=new Map(a);for(const[d,g]of Object.entries(i)){l.set(d,g);const f=zt.getUser(d);f&&(f.avatarDecoration=g?{asset:g,skuId:E}:null,f.avatarDecorationData=f.avatarDecoration,r.FluxDispatcher.dispatch({type:"USER_UPDATE",user:f}))}for(const d of s)l.has(d)||l.set(d,null);e({usersDecorations:l})}),async fetch(t){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;const{usersDecorations:s,fetchQueue:i,bulkFetch:l}=n();!a&&s.has(t)||(e({fetchQueue:new Set(i).add(t)}),l())},async fetchMany(t){if(!t.length)return;const{usersDecorations:a,fetchQueue:s,bulkFetch:i}=n(),l=new Set(s);for(const d of t)a.has(d)||l.add(d);e({fetchQueue:l}),i()},get(t){return n().usersDecorations.get(t)},has(t){return n().usersDecorations.has(t)},set(t,a){const{usersDecorations:s}=n(),i=new Map(s);i.set(t,a),e({usersDecorations:i})}}}),se=[];se.push(r.FluxDispatcher.subscribe("LOAD_MESSAGES_SUCCESS",function(e){let{messages:n}=e;oe.getState().fetchMany(n.map(function(t){return t.author.id}))}));const Mt=o.findByStoreName("UserStore"),xt=o.findByProps("getAvatarDecorationURL","default"),Ht=o.findByProps("isAnimatedAvatarDecoration");let b=[];var Gt={onLoad:async function(){b.push(Le),b.push(be),b.push(...se),b.push(F.after("getUser",Mt,function(e,n){const t=oe.getState();if(n&&t.has(n.id)){const a=t.get(n.id);a&&n.avatarDecoration?.skuId!==E?n.avatarDecoration={asset:a,skuId:E}:!a&&n.avatarDecoration&&n.avatarDecoration?.skuId===E&&(n.avatarDecoration=null),n.avatarDecorationData=n.avatarDecoration}})),b.push(F.after("getAvatarDecorationURL",xt,function(e,n){let[{avatarDecoration:t,canAnimate:a}]=e;if(t?.skuId===E){const s=t.asset.split("_");return!a&&s[0]==="a"&&s.shift(),pe+`/${s.join("_")}.png`}else if(t?.skuId===H)return t.asset})),b.push(F.after("isAnimatedAvatarDecoration",Ht,function(e,n){let[t]=e;if(r.ReactNative.Platform.OS==="ios"&&t?.asset?.startsWith("file://"))return!0}))},onUnload:function(){b.forEach(function(e){return e()})},settings:Lt};return _.default=Gt,Object.defineProperty(_,"__esModule",{value:!0}),_})({},vendetta.metro,vendetta.metro.common,vendetta.patcher,vendetta.plugin,vendetta.ui.alerts,vendetta.ui.assets,vendetta.ui.components,vendetta.ui,vendetta.ui.toasts);
