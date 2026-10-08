const editor=document.getElementById("editor");
const toast=document.getElementById("toast");
const themeToggle=document.getElementById("themeToggle");
const stat={chars:document.getElementById("statChars"),charsNoSpace:document.getElementById("statCharsNoSpace"),words:document.getElementById("statWords"),sentences:document.getElementById("statSentences"),paragraphs:document.getElementById("statParagraphs"),lines:document.getElementById("statLines"),reading:document.getElementById("statReading")};
const bijoyInput=document.getElementById("bijoyInput");
const unicodeInput=document.getElementById("unicodeInput");
const spellOutput=document.getElementById("spellOutput");
const suggestions=document.getElementById("suggestions");
const spellToggle=document.getElementById("spellToggle");
const digitsBangla="০১২৩৪৫৬৭৮৯";
const digitsEnglish="0123456789";

const PRE_MAP={" +":" ","yy":"y","vv":"v","„„":"„","­­":"­","y&":"y","uy":"yu","u“":"“u","u–":"–u","uƒ":"ƒu","„&":"„","u‚":"‚u","uv":"vu","u…":"…u","u„":"„u","uz":"zu","ux":"xu","u~":"~u","‡u":"u‡","wu":"uw"," ,":","," \\|":"\\|","\\\\ ":""," \\\\":"","\\\\":"","\n +":"\n"," +\n":"\n","\n\n\n\n\n":"\n\n","\n\n\n\n":"\n\n","\n\n\n":"\n\n"};
const B2U={
"Av":"আ","A":"অ","B":"ই","C":"ঈ","D":"উ","E":"ঊ","F":"ঋ","G":"এ","H":"ঐ","I":"ও","J":"ঔ","K":"ক","L":"খ","M":"গ","N":"ঘ","O":"ঙ","P":"চ","Q":"ছ","R":"জ","S":"ঝ","T":"ঞ","U":"ট","V":"ঠ","W":"ড","X":"ঢ","Y":"ণ","Z":"ত","_":"থ","`":"দ","a":"ধ","b":"ন","c":"প","d":"ফ","e":"ব","f":"ভ","g":"ম","h":"য","i":"র","j":"ল","k":"শ","l":"ষ","m":"স","n":"হ","o":"ড়","p":"ঢ়","q":"য়","r":"ৎ","s":"ং","t":"ঃ","u":"ঁ","0":"০","1":"১","2":"২","3":"৩","4":"৪","5":"৫","6":"৬","7":"৭","8":"৮","9":"৯","•":"ঙ্","|":"।","°":"ক্ক","±":"ক্ট","²":"ক্ষ্ণ","³":"ক্ত","´":"ক্ম","µ":"ক্র","¶":"ক্ষ","·":"ক্স","¸":"গু","¹":"জ্ঞ","º":"গ্দ","»":"গ্ধ","¼":"ঙ্ক","½":"ঙ্গ","¾":"জ্জ","¿":"্ত্র","À":"জ্ঝ","Á":"জ্ঞ","Â":"ঞ্চ","Ã":"ঞ্ছ","Ä":"ঞ্জ","Å":"ঞ্ঝ","Æ":"ট্ট","Ç":"ড্ড","È":"ণ্ট","É":"ণ্ঠ","Ê":"ণ্ড","Ë":"ত্ত","Ì":"ত্থ","Î":"ত্র","Ï":"দ্দ","Ð":"ণ্ড","Ñ":"-","Ò":"\"","Ó":"\"","Ô":"'","Õ":"'","×":"দ্ধ","Ø":"দ্ব","Ù":"দ্ম","Ú":"ন্ঠ","Û":"ন্ড","Ü":"ন্ধ","Ý":"ন্স","Þ":"প্ট","ß":"প্ত","à":"প্প","á":"প্স","â":"ব্জ","ã":"ব্দ","ä":"ব্ধ","å":"ভ্র","æ":"ু","ç":"ম্ফ","é":"ল্ক","ê":"ল্গ","ë":"ল্ট","ì":"ল্ড","í":"ল্প","î":"ল্ফ","ï":"শু","ð":"শ্চ","ñ":"শ্ছ","ò":"ষ্ণ","ó":"ষ্ট","ô":"ষ্ঠ","õ":"ষ্ফ","ö":"স্খ","÷":"স্ট","ø":"স্ন","ù":"স্ফ","û":"হু","ü":"হৃ","ý":"হ্ন","þ":"হ্ম"
};
const PRE_SYMBOLS={"®":"ষ্","¯":"স্","”":"চ্","˜":"দ্","™":"দ্","š":"ন্","›":"ন্","¤":"ম্"};
const POST_SYMBOLS={"&":"্‌","ú":"্প","è":"্ন","^":"্ব","‘":"্তু","’":"্থ","‹":"্ক","Œ":"্ক্র","—":"্ত","Í":"্ত","œ":"্ন","Ÿ":"্ব","¡":"্ব","¢":"্ভ","£":"্ভ্র","¥":"্ম","¦":"্ব","§":"্ম","¨":"্য","ª":"্র","«":"্র","¬":"্ল","­":"্ল","Ö":"্র"};
const KAARS={v:"া",w:"ি",x:"ী",y:"ু",z:"ু","“":"ু","–":"ু","~":"ূ","ƒ":"ূ","‚":"ূ","„":"ৃ","…":"ৃ","†":"ে","‡":"ে","ˆ":"ৈ","‰":"ৈ","Š":"ৗ"};
const PRE_ORDER=["Av","ÿ","®","¯","”","˜","™","š","›","¤","©"];
const B2U_KEYS=Object.keys(B2U).sort((a,b)=>b.length-a.length);
const B2U_SYMBOL_KEYS=Object.keys({...PRE_SYMBOLS,...POST_SYMBOLS}).sort((a,b)=>b.length-a.length);
const U2B_CONJ={
"ক্ষ্ণ":"²","ক্ক":"°","ক্ট":"±","ক্ত":"³","ক্ম":"´","ক্র":"µ","ক্ষ":"¶","ক্স":"·","গু":"¸","জ্ঞ":"¹","গ্দ":"º","গ্ধ":"»","ঙ্ক":"¼","ঙ্গ":"½","জ্জ":"¾","্ত্র":"¿","জ্ঝ":"À","ঞ্চ":"Â","ঞ্ছ":"Ã","ঞ্জ":"Ä","ঞ্ঝ":"Å","ট্ট":"Æ","ড্ড":"Ç","ণ্ট":"È","ণ্ঠ":"É","ণ্ড":"Ê","ত্ত":"Ë","ত্থ":"Ì","ত্র":"Î","দ্দ":"Ï","দ্ধ":"×","দ্ব":"Ø","দ্ম":"Ù","ন্ঠ":"Ú","ন্ড":"Û","ন্ধ":"Ü","ন্স":"Ý","প্ট":"Þ","প্ত":"ß","প্প":"à","প্স":"á","ব্জ":"â","ব্দ":"ã","ব্ধ":"ä","ভ্র":"å","ম্ফ":"ç","ল্ক":"é","ল্গ":"ê","ল্ট":"ë","ল্ড":"ì","ল্প":"í","ল্ফ":"î","শু":"ï","শ্চ":"ð","শ্ছ":"ñ","ষ্ণ":"ò","ষ্ট":"ó","ষ্ঠ":"ô","ষ্ফ":"õ","স্খ":"ö","স্ট":"÷","স্ন":"ø","স্ফ":"ù","হু":"û","হৃ":"ü","হ্ন":"ý","হ্ম":"þ","্প":"ú","্ন":"è","্ব":"^","্তু":"‘","্থ":"’","্ক":"‹","্ক্র":"Œ","্ত":"Í","্র":"Ö","্য":"¨","্ল":"¬","্ম":"¥","্ভ":"¢","্ভ্র":"£","র্":"©","ষ্":"®","স্":"¯","চ্":"”","দ্":"˜","ন্":"š","ম্":"¤"
};
const U2B_BASE={"অ":"A","আ":"Av","ই":"B","ঈ":"C","উ":"D","ঊ":"E","ঋ":"F","এ":"G","ঐ":"H","ও":"I","ঔ":"J","ক":"K","খ":"L","গ":"M","ঘ":"N","ঙ":"O","চ":"P","ছ":"Q","জ":"R","ঝ":"S","ঞ":"T","ট":"U","ঠ":"V","ড":"W","ঢ":"X","ণ":"Y","ত":"Z","থ":"_","দ":"`","ধ":"a","ন":"b","প":"c","ফ":"d","ব":"e","ভ":"f","ম":"g","য":"h","র":"i","ল":"j","শ":"k","ষ":"l","স":"m","হ":"n","ড়":"o","ঢ়":"p","য়":"q","ৎ":"r","ং":"s","ঃ":"t","ঁ":"u","০":"0","১":"1","২":"2","৩":"3","৪":"4","৫":"5","৬":"6","৭":"7","৮":"8","৯":"9","।":"|","-":"Ñ","\"":"Ò","'":"Ô"};
const U2B_KAAR={"া":"v","ি":"w","ী":"x","ু":"y","ূ":"~","ৃ":"„","ে":"†","ৈ":"ˆ","ৗ":"Š"};
const U2B_KEYS=Object.keys(U2B_CONJ).sort((a,b)=>b.length-a.length);
const BASE_KEYS=Object.keys(U2B_BASE).sort((a,b)=>b.length-a.length);

function replaceMap(text,map,keys){
let out="";
for(let i=0;i<text.length;){
let found="";
for(const k of keys){if(text.startsWith(k,i)){found=k;break}}
if(found){out+=map[found];i+=found.length}else{out+=text[i];i++}
}
return out;
}
function reorderUnicodePreSigns(text){
const chars=[...text];
let out="";
const consonant=/[কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহড়ঢ়য়ৎ]/u;
for(let i=0;i<chars.length;){
const ch=chars[i];
if(ch==="ে"||ch==="ৈ"){
let j=i+1;
while(j<chars.length&&consonant.test(chars[j])){
out+=chars[j];
j++;
if(chars[j]==="্"){
out+=chars[j];
j++;
if(j<chars.length&&consonant.test(chars[j])){out+=chars[j];j++;}
}
}
out+=ch;
i=j;
}else{
out+=ch;
i++;
}
}
return out.replaceAll("ো","ো").replaceAll("ৌ","ৌ");
}
function bijoyToUnicode(text){
let s=text;
for(const [a,b] of Object.entries(PRE_MAP)) s=s.replaceAll(a,b);
s=replaceMap(s,PRE_SYMBOLS,Object.keys(PRE_SYMBOLS).sort((a,b)=>b.length-a.length));
s=s.replaceAll("©","র্");
s=replaceMap(s,B2U,B2U_KEYS);
s=replaceMap(s,POST_SYMBOLS,B2U_SYMBOL_KEYS);
s=replaceMap(s,KAARS,Object.keys(KAARS).sort((a,b)=>b.length-a.length));
s=reorderUnicodePreSigns(s);
s=s.replaceAll("্্","্");
s=s.replaceAll("ো","ো");
s=s.replaceAll("ো","ো");
s=s.replaceAll("ৌ","ৌ");
s=s.replace(/([^\u0980-\u09FF])ঃ/g,"$1:");
return s;
}
function reorderBijoyPreSigns(text){
return text.replace(/([A-Za-z_`~ƒ‚„…‡ˆ‰Š°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÎÏÑÒÓÔÕ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþ©®¯”˜™š›¤])([†ˆ])/g,"$2$1");
}
function unicodeToBijoy(text){
let s=text.normalize("NFC");
s=s.replaceAll("ো","ো").replaceAll("ৌ","ৌ");
s=s.replace(/([০-৯])ঃ/g,"$1:");
s=s.replaceAll("ঃ", "t");
s=s.replaceAll("র্","©");
s=replaceMap(s,U2B_CONJ,U2B_KEYS);
s=s.replace(/([ক-হড়ঢ়য়ৎক্ষ])্র/g,"$1Ö");
s=s.replaceAll("্র","Ö");
s=replaceMap(s,U2B_KAAR,Object.keys(U2B_KAAR).sort((a,b)=>b.length-a.length));
s=replaceMap(s,U2B_BASE,BASE_KEYS);
s=s.replaceAll("†a","a†");
s=s.replaceAll("†","†");
s=s.replaceAll("ৗ","Š");
s=s.replaceAll("্‌","&").replaceAll("্","&");
s=reorderBijoyPreSigns(s);
return s;
}

function showToast(message){
toast.textContent=message;
toast.classList.add("show");
clearTimeout(showToast.timer);
showToast.timer=setTimeout(()=>toast.classList.remove("show"),1800);
}
function updateStats(){
const t=editor.value;
const words=t.trim()?t.trim().split(/\s+/u).length:0;
const sentences=(t.match(/[।!?]+|[!?]+/gu)||[]).length;
const paragraphs=t.trim()?t.trim().split(/\n\s*\n+/u).filter(Boolean).length:0;
const lines=t?t.split(/\n/).length:0;
const reading=words?Math.max(1,Math.ceil(words/180)):0;
stat.chars.textContent=[...t].length;
stat.charsNoSpace.textContent=[...t.replace(/\s/gu,"")].length;
stat.words.textContent=words;
stat.sentences.textContent=sentences;
stat.paragraphs.textContent=paragraphs;
stat.lines.textContent=lines;
stat.reading.textContent=`${reading} মি`;
updateSpell();
}
function setText(value,label="আপডেট হয়েছে"){
editor.value=value;
updateStats();
showToast(label);
editor.focus();
}
function cleanSpaces(t){return t.replace(/[ \t]+/gu," ").replace(/ +\n/gu,"\n").replace(/\n +/gu,"\n")}
function cleanLinebreaks(t){return t.replace(/\r\n?/gu,"\n").replace(/\n{3,}/gu,"\n\n")}
function cleanPunctuation(t){return t.replace(/[“”″]/gu,'"').replace(/[‘’′]/gu,"'").replace(/[—–−]/gu,"-").replace(/\.{3,}/gu,"...")}
function titleCase(t){return t.toLowerCase().replace(/\b([a-z])/g,(m,c)=>c.toUpperCase())}
function sentenceCase(t){
let lower=t.toLowerCase();
let out="";
let capitalize=true;
for(const ch of lower){
if(capitalize&&/[a-z]/.test(ch)){out+=ch.toUpperCase();capitalize=false}else out+=ch;
if(/[.!?।]/.test(ch)) capitalize=true;
}
return out;
}
function digits(t,from,to){
let table=new Map([...from].map((x,i)=>[x,to[i]]));
return [...t].map(ch=>table.get(ch)||ch).join("");
}
function sortBangla(lines,reverse){
return lines.slice().sort((a,b)=>a.localeCompare(b,"bn",{numeric:true,sensitivity:"base"}))[reverse?"reverse":"slice"]();
}
function lineOp(type){
const raw=editor.value.split(/\n/);
if(type==="dedupe") return [...new Set(raw.map(x=>x.trim()).filter(Boolean))].join("\n");
if(type==="sort-az") return sortBangla(raw.filter(x=>x.trim()),false).join("\n");
if(type==="sort-za") return sortBangla(raw.filter(x=>x.trim()),true).join("\n");
if(type==="reverse-lines") return raw.reverse().join("\n");
return editor.value;
}
function levenshtein(a,b){
const aa=[...a],bb=[...b];
let prev=Array(bb.length+1).fill(0).map((_,i)=>i);
for(let i=1;i<=aa.length;i++){
let cur=[i];
for(let j=1;j<=bb.length;j++) cur[j]=Math.min(cur[j-1]+1,prev[j]+1,prev[j-1]+(aa[i-1]===bb[j-1]?0:1));
prev=cur;
}
return prev[bb.length];
}
function tokenizeBangla(t){
return t.match(/[ঀ-৿A-Za-z0-9০-৯]+/gu)||[];
}
let spellTimer;
function updateSpell(){
if(!spellToggle.checked){
spellOutput.textContent="লাইভ বানান চেক বন্ধ আছে।";
suggestions.innerHTML="";
return;
}
clearTimeout(spellTimer);
spellTimer=setTimeout(()=>{
const text=editor.value;
if(!text.trim()){
spellOutput.textContent="লেখা শুরু করলে সম্ভাব্য বানান ভুল এখানে হাইলাইট হবে।";
suggestions.innerHTML="";
return;
}
const tokens=tokenizeBangla(text);
const errors=[];
for(const token of tokens){
if(/[ঀ-৿]/u.test(token)&&token.length>1&&!BANGLA_DICTIONARY.has(token)) errors.push(token);
}
let htmlOut="";
let last=0;
const tokenRegex=/[ঀ-৿A-Za-z0-9০-৯]+/gu;
let match;
while((match=tokenRegex.exec(text))){
const token=match[0];
htmlOut+=escapeHtml(text.slice(last,match.index));
const err=/[ঀ-৿]/u.test(token)&&token.length>1&&!BANGLA_DICTIONARY.has(token);
htmlOut+=err?`<span class="misspelled" data-word="${escapeAttr(token)}">${escapeHtml(token)}</span>`:escapeHtml(token);
last=match.index+token.length;
}
htmlOut+=escapeHtml(text.slice(last));
spellOutput.innerHTML=htmlOut;
const unique=[...new Set(errors)].slice(0,5);
suggestions.innerHTML="";
unique.forEach(word=>{
const close=[...BANGLA_DICTIONARY].filter(x=>Math.abs([...x].length-[...word].length)<=3).map(x=>({x,d:levenshtein(word,x)})).sort((a,b)=>a.d-b.d||a.x.length-b.x.length).slice(0,3).map(x=>x.x);
close.forEach(item=>{
const b=document.createElement("button");
b.type="button";b.className="suggestion";b.textContent=`${word} → ${item}`;
b.addEventListener("click",()=>replaceWord(word,item));
suggestions.appendChild(b);
});
});
},80);
}
function replaceWord(from,to){
const re=new RegExp(`(^|\\s|[।!?।,;:])${escapeRegExp(from)}(?=\\s|[।!?.,;:]|$)`,"gu");
editor.value=editor.value.replace(re,(m,p)=>p+to);
updateStats();
showToast("বানান সাজেশন প্রয়োগ হয়েছে");
}
function escapeHtml(value){return value.replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[ch]))}
function escapeAttr(value){return escapeHtml(value)}
function escapeRegExp(value){return value.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}
async function copyText(text,label="কপি হয়েছে"){
try{await navigator.clipboard.writeText(text);showToast(label)}catch{
const ta=document.createElement("textarea");ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove();showToast(label)
}
}
function downloadText(){
const blob=new Blob(["\ufeff",editor.value],{type:"text/plain;charset=utf-8"});
const url=URL.createObjectURL(blob);
const a=document.createElement("a");
a.href=url;a.download="bangla-text.txt";a.click();
setTimeout(()=>URL.revokeObjectURL(url),500);
showToast("bangla-text.txt ডাউনলোড হচ্ছে");
}

document.querySelectorAll("[data-action]").forEach(btn=>{
btn.addEventListener("click",()=>{
const a=btn.dataset.action;
if(["trim","spaces","linebreaks","punctuation","reverse"].includes(a)){
let value=editor.value;
if(a==="trim") value=value.trim();
if(a==="spaces") value=cleanSpaces(value);
if(a==="linebreaks") value=cleanLinebreaks(value);
if(a==="punctuation") value=cleanPunctuation(value);
if(a==="reverse") value=[...value].reverse().join("");
setText(value,"টেক্সট আপডেট হয়েছে");
return;
}
if(["dedupe","sort-az","sort-za","reverse-lines"].includes(a)){setText(lineOp(a),"লাইন আপডেট হয়েছে");return}
if(a==="upper"){setText(editor.value.toUpperCase(),"UPPER CASE প্রয়োগ হয়েছে");return}
if(a==="lower"){setText(editor.value.toLowerCase(),"lower case প্রয়োগ হয়েছে");return}
if(a==="title"){setText(titleCase(editor.value),"Title Case প্রয়োগ হয়েছে");return}
if(a==="sentence"){setText(sentenceCase(editor.value),"Sentence case প্রয়োগ হয়েছে");return}
if(a==="digits-b2e"){setText(digits(editor.value,digitsBangla,digitsEnglish),"বাংলা ডিজিট → ইংরেজি ডিজিট");return}
if(a==="digits-e2b"){setText(digits(editor.value,digitsEnglish,digitsBangla),"ইংরেজি ডিজিট → বাংলা ডিজিট");return}
});
});

editor.addEventListener("input",()=>{
updateStats();
document.getElementById("saveStatus").textContent="পরিবর্তন হয়েছে • শুধু আপনার ডিভাইসে";
});

document.getElementById("copyBtn").addEventListener("click",()=>copyText(editor.value,"লেখা কপি হয়েছে"));
document.getElementById("downloadBtn").addEventListener("click",downloadText);
document.getElementById("clearBtn").addEventListener("click",()=>{
editor.value="";
updateStats();
showToast("লেখা ক্লিয়ার হয়েছে");
editor.focus();
});
document.getElementById("bijoyToUnicode").addEventListener("click",()=>{
unicodeInput.value=bijoyToUnicode(bijoyInput.value);
showToast("Bijoy → Unicode সম্পন্ন");
});
document.getElementById("unicodeToBijoy").addEventListener("click",()=>{
bijoyInput.value=unicodeToBijoy(unicodeInput.value);
showToast("Unicode → Bijoy সম্পন্ন");
});
document.getElementById("swapConverter").addEventListener("click",()=>{
const a=bijoyInput.value;
bijoyInput.value=unicodeInput.value;
unicodeInput.value=a;
showToast("দুই বক্স Swap হয়েছে");
});
document.getElementById("bijoyCopy").addEventListener("click",()=>copyText(bijoyInput.value,"Bijoy লেখা কপি হয়েছে"));
document.getElementById("unicodeCopy").addEventListener("click",()=>copyText(unicodeInput.value,"Unicode লেখা কপি হয়েছে"));

themeToggle.addEventListener("click",()=>{
document.body.classList.toggle("dark");
localStorage.setItem("btt-theme",document.body.classList.contains("dark")?"dark":"light");
themeToggle.textContent=document.body.classList.contains("dark")?"☀":"☾";
});
if(localStorage.getItem("btt-theme")==="dark"){document.body.classList.add("dark");themeToggle.textContent="☀"}

spellToggle.addEventListener("change",updateSpell);
updateStats();
