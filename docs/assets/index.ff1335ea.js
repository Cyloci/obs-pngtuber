import{r as i,j as f,O,e as C,E as y,R as M,a as E}from"./vendor.c2f1a328.js";const v=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}};v();const x=(n,o)=>{if(o.kind==="setConnectionState")return o.payload.state;if(n.kind!=="connected")return n;const r=n.obsState;switch(o.kind){case"setMicVolume":r.micVolume=o.payload.micVolume}return n},m=(n,o)=>{const[r,a]=i.exports.useState(""),e=t=>{localStorage.setItem(n,t),a(t)};return i.exports.useEffect(()=>{const t=localStorage.getItem(n);t===null?e(o):a(t)},[n]),[r,e]},s=f.exports.jsx,c=f.exports.jsxs,k=()=>{const[n,o]=m("pngtuberEyesClosedMouthClosedSrc","https://cdn.discordapp.com/attachments/982471426542018620/982471597187301376/pngtuber-eyes-closed-mouth-closed.png"),[r,a]=m("pngtuberEyesClosedMouthOpenSrc","https://cdn.discordapp.com/attachments/982471426542018620/982471597455724564/pngtuber-eyes-closed-mouth-open.png"),[e,t]=m("pngtuberEyesOpenMouthClosedSrc","https://cdn.discordapp.com/attachments/982471426542018620/982471597728350228/pngtuber-eyes-open-mouth-closed.png"),[l,p]=m("pngtuberEyesOpenMouthOpenSrc","https://cdn.discordapp.com/attachments/982471426542018620/982471598000988170/pngtuber-eyes-open-mouth-open.png"),[h,b]=m("address","ws://localhost:4455"),[g,S]=m("password",""),u=new URL(location.href);return u.searchParams.append("pngtuberEyesClosedMouthClosedSrc",n),u.searchParams.append("pngtuberEyesClosedMouthOpenSrc",r),u.searchParams.append("pngtuberEyesOpenMouthClosedSrc",e),u.searchParams.append("pngtuberEyesOpenMouthOpenSrc",l),u.searchParams.append("address",h),u.searchParams.append("password",g),c("div",{children:[c("div",{className:"grid grid-cols-4 gap-2 mb-5",children:[c("div",{children:[s("img",{src:n}),c("label",{children:[s("span",{className:"block my-2 text-sm font-medium text-slate-700",children:"Eyes Closed Mouth Closed"}),s("input",{className:"border-2 rounded-md",value:n,onChange:d=>o(d.target.value)})]})]}),c("div",{children:[s("img",{src:r}),c("label",{children:[s("span",{className:"block my-2 text-sm font-medium text-slate-700",children:"Eyes Closed Mouth Open"}),s("input",{className:"border-2 rounded-md",value:r,onChange:d=>a(d.target.value)})]})]}),c("div",{children:[s("img",{src:e}),c("label",{children:[s("span",{className:"block my-2 text-sm font-medium text-slate-700",children:"Eyes Open Mouth Closed"}),s("input",{className:"border-2 rounded-md",value:e,onChange:d=>t(d.target.value)})]})]}),c("div",{children:[s("img",{src:l}),c("label",{children:[s("span",{className:"block my-2 text-sm font-medium text-slate-700",children:"Eyes Open Mouth Open"}),s("input",{className:"border-2 rounded-md",value:l,onChange:d=>p(d.target.value)})]})]})]}),c("div",{className:"mb-5",children:[c("p",{children:["Make sure you have"," ",s("a",{href:"https://github.com/obsproject/obs-websocket/releases",className:"text-blue-500 hover:text-blue-700",children:"OBS Websocket 5"})," ","installed!"]}),c("label",{children:[s("span",{className:"block my-2 text-sm font-medium text-slate-700",children:"OBS Websocket Address"}),s("input",{className:"border-2 rounded-md",value:h,onChange:d=>b(d.target.value)})]}),c("label",{children:[s("span",{className:"block my-2 text-sm font-medium text-slate-700 mr-1",children:"OBS Websocket Password"}),s("input",{type:"password",className:"border-2 rounded-md",value:g,onChange:d=>S(d.target.value)})]})]}),s("div",{children:c("label",{children:[s("span",{className:"block my-2 text-sm font-medium text-green-700 mr-1",children:"Source URL (Copy into new OBS Browser Source)"}),s("input",{className:"border-2 rounded-md",value:u.toString(),readOnly:!0})]})})]})},N=({state:{micVolume:n,pngtuberSources:o}})=>{const[r,a]=i.exports.useState(Array.from({length:5}).map(()=>-1/0));i.exports.useEffect(()=>{a([...r.slice(1),n])},[n]);const e=Math.sin(Date.now()/1e3)>-.995,t=Math.max(...r)>-30,l=e?t?o.eyesOpen.mouthOpen:o.eyesOpen.mouthClosed:t?o.eyesClosed.mouthOpen:o.eyesClosed.mouthClosed;return s("div",{children:s("img",{className:`${t?"animate-talking":"animate-breathing"}`,src:l})})},P=(n,o)=>{const r=n.find(o);if(!r)throw Error("failed to find item in mustFind");return r},w=n=>20*Math.log10(n);function L(){const n=i.exports.useRef(new O),[o,r]=C(x,{kind:"loggingIn"});return i.exports.useEffect(()=>{n.current.on("InputVolumeMeters",({inputs:a})=>{const t=P(a,({inputName:p})=>p.toLowerCase()==="mic").inputLevelsMul[0][2],l=w(t);r({kind:"setMicVolume",payload:{micVolume:l}})})},[]),i.exports.useEffect(()=>{const a=new URL(location.href),e=a.searchParams.get("address"),t=a.searchParams.get("password"),l=a.searchParams.get("pngtuberEyesClosedMouthClosedSrc"),p=a.searchParams.get("pngtuberEyesClosedMouthOpenSrc"),h=a.searchParams.get("pngtuberEyesOpenMouthClosedSrc"),b=a.searchParams.get("pngtuberEyesOpenMouthOpenSrc");e===null||t===null||l===null||p===null||h===null||b===null||(async()=>{try{await n.current.connect(e,t,{eventSubscriptions:y.All|y.InputVolumeMeters,rpcVersion:1}),console.info("connected to OBS")}catch(g){console.error(g),r({kind:"setConnectionState",payload:{state:{kind:"loggingIn",errorMessage:`Logging in failed: ${g.message}`}}});return}r({kind:"setConnectionState",payload:{state:{kind:"connected",obsState:{micVolume:0,pngtuberSources:{eyesOpen:{mouthOpen:b,mouthClosed:h},eyesClosed:{mouthOpen:p,mouthClosed:l}}}}}})})()},[]),s("div",{className:"p-5",children:o.kind==="connected"?s(N,{state:o.obsState}):s(k,{})})}M.render(s(E.StrictMode,{children:s(L,{})}),document.getElementById("root"));