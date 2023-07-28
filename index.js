(function(C,i,t,b,s,U,u,f,A,F){"use strict";const S=function(e,n){return s.storage.useCustomConstants&&e?e:n},Y=S(s.storage.clientId,"1096966363416899624"),q=S(s.storage.baseUrl,"https://decor.fieryflames.dev"),X=S(s.storage.cdnUrl,"https://decorcdn.fieryflames.dev"),J="https://discord.gg/dXp2SdxDcP",h=q+"/api";let m;const v=function(e,n){return fetch(e,{...n,headers:{...n?.headers,Authorization:`Bearer ${s.storage.token}`}}).then(function(a){return a.ok?a:Promise.reject(a)})},Q=async function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"default";return m=new Map(Object.entries(await fetch(h+"/users",{cache:e}).then(function(n){return n.json()})))},Z=async function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"@me";return v(h+`/users/${e}/decorations`).then(function(n){return n.json()})},ee=async function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"@me";return v(h+`/users/${e}/decoration`).then(function(n){return n.json()})},L=async function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"@me";const a=new FormData;return e&&Object.hasOwn(e,"hash")?(e=e,a.append("hash",e.hash)):e?e&&Object.hasOwn(e,"uri")&&(e=e,a.append("image",{uri:e.uri,type:e.fileType,name:e.fileName}),a.append("alt",e.alt)):a.append("hash",null),v(h+`/users/${n}/decoration`,{method:"PUT",body:a}).then(function(r){return e&&Object.hasOwn(e,"uri")?r.json():r.text()})},te=async function(e){await v(h+`/decorations/${e}`,{method:"DELETE"})},ne=async function(){return fetch(h+"/decorations/presets").then(function(e){return e.json()})},{pushModal:ae,popModal:_}=i.findByProps("pushModal"),re=i.findByName("OAuth2AuthorizeModal");function ie(){return ae({key:"oauth2-authorize",modal:{key:"oauth2-authorize",modal:re,animation:"slide-up",shouldPersistUnderModals:!1,props:{clientId:Y,redirectUri:h+"/authorize",scopes:["identify"],responseType:"code",permissions:0n,cancelCompletesFlow:!1,callback:async function(e){let{location:n}=e;const a=new URL(n);a.searchParams.append("client","vendetta");const r=await fetch(a);r?.ok?s.storage.token=await r.text():_("oauth2-authorize")},dismissOAuthModal:function(){return _("oauth2-authorize")}},closable:!0}})}function E(e){return`decor_${e.animated?"a_":""}${e.hash}`}const oe=t.ReactNative.NativeModules.DCDFileManager??t.ReactNative.NativeModules.RTNFileManager;async function se(e){return e.startsWith("file://")&&(e=e.slice(7)),oe.readFile(e,"base64")}const{View:x}=f.General,ce=i.findByName("HeaderAvatar"),{AvatarColumn:le}=i.findByProps("AvatarColumn"),de=i.findByStoreName("UserStore"),O=t.stylesheet.createThemedStyleSheet({headerAvatarContainer:{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:A.semanticColors.BACKGROUND_FLOATING,width:208,height:208,borderRadius:4},container:{flexDirection:"row",width:"100%",justifyContent:"center",alignItems:"center",paddingHorizontal:16,paddingTop:16}});function k(e){let{decorationData:n}=e;const a=n?{hash:n}:null;return React.createElement(x,{style:O.container},React.createElement(x,{style:O.headerAvatarContainer},React.createElement(ce,{user:de.getCurrentUser(),pendingAvatarDecoration:a,size:"editAvatarDecoration",decorationStyle:{margin:-12}})),React.createElement(le,{pendingAvatarDecoration:a}))}const ue=i.findByName("create"),{subscribeWithSelector:fe}=i.findByProps("subscribeWithSelector"),he=i.findByStoreName("UserStore"),p=ue(fe(function(e,n){return{decorations:[],selectedDecoration:null,fetched:!1,fetch:async function(){return e({decorations:await Z(),selectedDecoration:await ee(),fetched:!0})},create:async function(a){const r=await L(a);e({decorations:[...n().decorations,r]})},delete:async function(a){const r=typeof a=="object"?a.hash:a;await te(r);const{selectedDecoration:o,decorations:l}=n();let c={decorations:l.filter(function(d){return d.hash!==r})};o?.hash===r&&(c.selectedDecoration=null),e(c)},select:async function(a){e({selectedDecoration:a})},clear:function(){return e({decorations:[],selectedDecoration:null,fetched:!1})}}})),pe=p.subscribe(function(e){return[e.selectedDecoration,e.fetched]},t.lodash.debounce(function(e,n){let[a,r]=e,[o,l]=n;if(r!==l||a?.hash===o?.hash)return;L(a);const c=he.getCurrentUser();c.avatarDecoration=a?E(a):null,t.FluxDispatcher.dispatch({type:"USER_UPDATE",user:c})},1e3)),{FormIcon:ye}=f.Forms;function y(e){let{source:n}=e;return React.createElement(ye,{source:n,style:{opacity:1}})}const{ScrollView:ge,View:M}=t.ReactNative,{FormSection:Re,FormRow:ve,FormArrow:Ee,FormInput:De,FormDivider:Ce,FormHint:w}=f.Forms,{popModal:be}=i.findByProps("pushModal"),{launchImageLibrary:Ae}=i.findByProps("launchImageLibrary"),{useSafeAreaInsets:Se}=i.findByProps("useSafeAreaInsets");function me(){const[e,n]=t.React.useState(null),[a,r]=t.React.useState(""),o=Se(),l=p(function(c){return c.create});return t.React.createElement(ge,{contentContainerStyle:{flexGrow:1}},t.React.createElement(M,{style:{flex:1}},t.React.createElement(k,{decorationData:e?.uri}),t.React.createElement(Re,null,t.React.createElement(ve,{label:"Select Image",leading:t.React.createElement(y,{source:u.getAssetIDByName("ic_image")}),trailing:Ee,onPress:function(){Ae({mediaType:"photo",maxWidth:768,maxHeight:768},function(c){if(!c||c.didCancel){n(null);return}const d=c.assets[0];d&&n(d)})}}),t.React.createElement(Ce,null),t.React.createElement(De,{value:a,onChange:r,placeholder:"Apeture Science Logo",title:"Name / Alt Text"})),t.React.createElement(w,null,"Avatar decorations are 1.2 times the size of a avatar."),t.React.createElement(w,null,"Your decoration will be reviewed before you can use it. If approved, it will be set as your selected decoration."),t.ReactNative.Platform.OS!=="ios"&&t.React.createElement(w,null,"Animated PNGs will not animate in the preview above on your platform.")),t.React.createElement(M,{style:{justifyContent:"flex-end",paddingHorizontal:16,paddingBottom:o.bottom}},t.React.createElement(f.Button,{text:"Create Decoration",color:"brand",size:"medium",onPress:async function(){if(!e)return;const c="data:"+e.type+";base64,"+await se(e.uri);await l({uri:c,fileName:e.fileName,fileType:e.type,alt:a}),be("create-decoration")},disabled:!e||!a})))}const{default:we,getRenderCloseButton:Ne}=i.findByProps("getRenderCloseButton"),{popModal:$e}=i.findByProps("pushModal");function Pe(){return React.createElement(we,{initialRouteName:"CREATE_DECORATION",screens:{CREATE_DECORATION:{headerLeft:Ne(function(){return $e("create-decoration")}),render:me,title:"Create Decoration"}}})}const{pushModal:Ie}=i.findByProps("pushModal");function Te(){return Ie({key:"create-decoration",modal:{key:"create-decoration",modal:Pe,animation:"slide-up",shouldPersistUnderModals:!1,closable:!0}})}function z(){return F.useProxy(s.storage),!!s.storage.token}const{View:H,TouchableOpacity:Be}=t.ReactNative,{triggerHapticFeedback:Ue,HapticFeedbackTypes:Fe}=i.findByProps("triggerHapticFeedback"),D=t.stylesheet.createThemedStyleSheet({container:{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:A.semanticColors.BACKGROUND_FLOATING,width:72,height:72,borderRadius:4},inner:{display:"flex",justifyContent:"space-evenly",alignItems:"center"},selected:{borderWidth:2,borderColor:A.semanticColors.BUTTON_OUTLINE_BRAND_BORDER_ACTIVE},disabled:{opacity:.5}}),j=function(e){Ue(Fe.IMPACT_LIGHT),e()};function V(e){let{onPress:n=void 0,onLongPress:a=void 0,disabled:r=void 0,lookDisabled:o=void 0,selected:l=!1,children:c}=e;return React.createElement(Be,{onPress:n?function(){return j(n)}:void 0,onLongPress:a?function(){return j(a)}:void 0,disabled:r},React.createElement(H,{style:[D.container,l?D.selected:null]},React.createElement(H,{style:[D.inner,(r||o)&&D.disabled]},c)))}const{TextStyleSheet:Le,Text:_e}=i.findByProps("TextStyleSheet");function N(e){let{source:n,label:a,onPress:r,disabled:o,selected:l=!1}=e;return React.createElement(V,{onPress:r,disabled:o,selected:l},React.createElement(y,{source:n}),React.createElement(_e,{style:[Le["text-sm/medium"]]},a))}const xe=i.findByProps("getAvatarDecorationURL","default"),{showSimpleActionSheet:Oe}=i.findByProps("showSimpleActionSheet"),{hideActionSheet:ke}=i.findByProps("openLazy","hideActionSheet"),Me=i.findByStoreName("UserStore"),{Image:ze}=t.ReactNative;function He(e){return Oe({key:"DecorationActionSheet",header:{title:e.alt??"Decoration",icon:React.createElement(ze,{source:{uri:xe.getAvatarDecorationURL({avatarDecoration:E(e)})},style:{width:24,height:24,marginRight:8}}),onClose:function(){return ke()}},options:[...e.authorId===Me.getCurrentUser().id?[{icon:u.getAssetIDByName("ic_message_delete"),label:"Delete",isDestructive:!0,onPress:function(){return U.showConfirmationAlert({title:"Delete Decoration",content:`Are you sure you want to delete ${e.alt??"this decoration"}?`,confirmText:"Delete",cancelText:"Cancel",confirmColor:"red",onConfirm:function(){return t.ReactNative.unstable_batchedUpdates(function(){return p.getState().delete(e)})}})}}]:[]]})}const je=i.findByName("CutoutableAvatarDecoration");function G(e){let{decoration:n,onPress:a=void 0,selectable:r=void 0,disabled:o=void 0}=e;const{selectedDecoration:l,select:c}=p(function(d){return{selectedDecoration:d.selectedDecoration,select:d.select}});return r??=n.reviewed===null||n.reviewed===!0,a??=function(){return c(n)},React.createElement(V,{onPress:r?a:void 0,onLongPress:function(){return He(n)},selected:l?.hash===n.hash,disabled:o,lookDisabled:!r},React.createElement(je,{avatarDecoration:E(n),size:56,animate:!1}))}const{FormTitle:Ve}=f.Forms,{View:$,FlatList:Ge}=t.ReactNative,{TextStyleSheet:We,Text:Ke}=i.findByProps("TextStyleSheet");function Ye(e){let{preset:n}=e;const a=p(function(o){return o.select}),r=t.NavigationNative.useNavigation();return React.createElement($,null,React.createElement($,null,React.createElement(Ve,{title:n.name}),n.description&&React.createElement(Ke,{style:[We["text-sm/medium"],{paddingHorizontal:16,paddingBottom:8}]},n.description)),React.createElement(Ge,{horizontal:!0,showsHorizontalScrollIndicator:!1,data:n.decorations,renderItem:function(o){let{item:l}=o;return React.createElement(G,{decoration:l,onPress:function(){a(l),r.pop()}})},ItemSeparatorComponent:function(){return React.createElement($,{style:{width:4}})},snapToInterval:74,decelerationRate:"fast",contentContainerStyle:{paddingHorizontal:8}}))}const{FlatList:qe}=t.ReactNative;function Xe(){const[e,n]=t.React.useState([]);return t.React.useEffect(function(){ne().then(function(a){return n(a)})},[]),t.React.createElement(qe,{data:e,renderItem:function(a){let{item:r}=a;return t.React.createElement(Ye,{preset:r})}})}const{FlatList:Je,View:P,ActivityIndicator:Qe}=t.ReactNative,{FormTitle:Ze}=f.Forms;function et(){const[e,n]=t.React.useState(!1),{decorations:a,selectedDecoration:r,fetch:o,clear:l,select:c}=p(),d=z();t.React.useEffect(function(){d?(o().then(function(){return n(!1)}).catch(function(K){return n(null)}),n(!0)):(l(),n(!1))},[d]);const yt=t.NavigationNative.useNavigation();return t.React.createElement(t.React.Fragment,null,t.React.createElement(k,{decorationData:r?E(r):null}),t.React.createElement(Ze,{title:"Decorations",icon:e?t.React.createElement(Qe,null):e===null?t.React.createElement(y,{source:u.getAssetIDByName("ic_warning_24px")}):void 0}),t.React.createElement(Je,{horizontal:!0,showsHorizontalScrollIndicator:!1,data:a,renderItem:function(K){let{item:gt}=K;return t.React.createElement(G,{decoration:gt,disabled:!d||e===null})},snapToInterval:74,decelerationRate:"fast",ItemSeparatorComponent:function(){return t.React.createElement(P,{style:{width:4}})},ListHeaderComponent:function(){return t.React.createElement(N,{source:u.getAssetIDByName("img_none"),label:"None",onPress:function(){c(null)},disabled:!d||e===null,selected:!r})},ListHeaderComponentStyle:{paddingRight:a.length===0?2:4},ListFooterComponent:function(){return t.React.createElement(P,{style:{flexDirection:"row"}},t.React.createElement(N,{source:u.getAssetIDByName("smile"),label:"Presets",onPress:function(){yt.push("VendettaCustomPage",{title:"Presets",render:Xe})},selected:r&&r.presetId!==null,disabled:!d||e===null}),t.React.createElement(P,{style:{width:4}}),t.React.createElement(N,{source:u.getAssetIDByName("ic_add_24px"),label:"New..",onPress:Te,disabled:!d||e===null}))},ListFooterComponentStyle:{paddingLeft:a.length===0?2:4},contentContainerStyle:{paddingHorizontal:8}}))}const{Messages:R}=i.findByProps("Messages"),{triggerHapticFeedback:tt,HapticFeedbackTypes:nt}=i.findByProps("triggerHapticFeedback"),{ScrollView:Rt,View:W}=t.ReactNative,{FormSection:I,FormRow:T,FormArrow:at,FormSwitchRow:rt,FormCTAButton:it,FormDivider:ot,FormInput:st}=f.Forms,ct=f.HelpMessage,{KeyboardAwareScrollView:lt}=i.findByProps("KeyboardAwareScrollView");function dt(){F.useProxy(s.storage);const e=z();return t.React.createElement(lt,null,!e&&t.React.createElement(W,{style:{padding:8}},t.React.createElement(ct,{messageType:0},"You need to Authorize with Decor before you can get custom decorations.")),t.React.createElement(et,null),!e&&t.React.createElement(I,null,t.React.createElement(T,{label:"Authorize with Decor",leading:t.React.createElement(y,{source:u.getAssetIDByName("ic_link_24px")}),trailing:at,onPress:ie})),t.React.createElement(I,null,t.React.createElement(T,{label:"Discord Server",leading:t.React.createElement(y,{source:u.getAssetIDByName("Discord")}),trailing:T.Arrow,onPress:function(){return t.url.openDeeplink(J)},onLongPress:function(){tt(nt.IMPACT_LIGHT),s.storage.developerMode=!s.storage.developerMode}})),e&&t.React.createElement(it,{color:"danger",label:R.LOGOUT,onPress:function(){return U.showConfirmationAlert({title:R.LOGOUT,content:R.USER_SETTINGS_CONFIRM_LOGOUT,confirmText:R.LOGOUT,confirmColor:"red",cancelText:R.CANCEL,onConfirm:function(){return s.storage.token=void 0}})}}),s.storage.developerMode&&t.React.createElement(I,{title:"Developer Settings"},t.React.createElement(rt,{label:"Use Custom Constants",subLabel:"Override constants with custom values.",leading:t.React.createElement(y,{source:u.getAssetIDByName("ic_link_24px")}),value:s.storage.useCustomConstants,onValueChange:function(n){return s.storage.useCustomConstants=n}}),[{title:"Client ID",placeholder:"012345678910",key:"clientId"},{title:"Base URL",placeholder:"http://example.com",key:"baseUrl"},{title:"CDN URL",placeholder:"http://example.com",key:"cdnUrl"}].map(function(n){let{title:a,placeholder:r,key:o}=n;return t.React.createElement(t.React.Fragment,null,t.React.createElement(ot,null),t.React.createElement(st,{title:a,placeholder:r,value:s.storage[o],onChange:function(l){return s.storage[o]=l},disabled:!s.storage.useCustomConstants}))})),t.React.createElement(W,{style:{height:40}}))}const ut=i.findByStoreName("UserStore"),ft=i.findByProps("getAvatarDecorationURL","default"),{CollectiblesExperiment:B}=i.findByProps("useCollectiblesExperiment"),ht=i.findByProps("isAnimatedAvatarDecoration");let g=[];var pt={onLoad:async function(){g.push(pe),g.push(b.after("getUser",ut,function(e,n){n&&!n.avatarDecoration?.startsWith("decor_")&&m?.has(n.id)&&(n.avatarDecoration=`decor_${m?.get(n.id)}`)})),g.push(b.after("getAvatarDecorationURL",ft,function(e,n){let[{avatarDecoration:a,canAnimate:r}]=e;if(a?.startsWith("decor")){const o=a.split("_").slice(1);return!r&&o[0]==="a"&&o.shift(),X+`/${o.join("_")}.png`}else if(a?.startsWith("file://"))return a})),g.push(b.after("isAnimatedAvatarDecoration",ht,function(e,n){let[a]=e;if(t.ReactNative.Platform.OS==="ios"&&a?.startsWith("file://"))return!0})),g.push(function(){const e=B.getCurrentConfig().canUseAvatarDecorations;return B.getCurrentConfig().canUseAvatarDecorations=!0,function(){return B.getCurrentConfig().canUseAvatarDecorations=e}}()),s.storage.developerMode??=!1,Q()},onUnload:function(){g.forEach(function(e){return e()})},settings:dt};return C.default=pt,Object.defineProperty(C,"__esModule",{value:!0}),C})({},vendetta.metro,vendetta.metro.common,vendetta.patcher,vendetta.plugin,vendetta.ui.alerts,vendetta.ui.assets,vendetta.ui.components,vendetta.ui,vendetta.storage);
