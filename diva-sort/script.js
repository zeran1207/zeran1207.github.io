const CONFIG = { API_URL: "https://script.google.com/macros/s/AKfycbxmZeJbTSNcaxoQNLC1t7raCeGl_Rnr0bP1hQE5b03ymf1k-OVPaUvkX3adRGd3PXpptA/exec" };

const characters = [
 {name:"レイ・オーバ",image:"images/rei.svg"},
 {name:"フォンニーナ",image:"images/fonnina.svg"},
 {name:"ディアナ・フルール",image:"images/diana.svg"},
 {name:"ジャンヌ・ドラニエス",image:"images/jeanne.svg"},
 {name:"ゼクシア・テンマ",image:"images/zexia.svg"},
 {name:"グリーフィア・ダルク",image:"images/griefia.svg"},
 {name:"ラビィ・ダーリン",image:"images/ravie.svg"},
 {name:"スピッツ・ドラコニー",image:"images/spitz.svg"}
];

let ranking = [];
let current = 1;
let insertPos = 0;
let candidate = null;
let comparisons = 0;

const $ = id => document.getElementById(id);

function show(id) {
 document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
 $(id).classList.add("active");
}

function startGame() {
 ranking = [characters[0]];
 current = 1;
 comparisons = 0;
 show("battle-screen");
 nextCharacter();
}

function nextCharacter() {
 if (current >= characters.length) {
   finishGame();
   return;
 }
 candidate = characters[current];
 insertPos = 0;
 compare();
}

function compare() {
 const opponent = ranking[insertPos];
 $("image-a").src = candidate.image;
 $("image-a").alt = candidate.name;
 $("name-a").textContent = candidate.name;
 $("image-b").src = opponent.image;
 $("image-b").alt = opponent.name;
 $("name-b").textContent = opponent.name;
 $("progress").textContent = `比較 ${comparisons + 1}`;
}

function chooseCandidate() {
 comparisons++;
 ranking.splice(insertPos, 0, candidate);
 current++;
 nextCharacter();
}

function chooseOpponent() {
 comparisons++;
 insertPos++;
 if (insertPos >= ranking.length) {
   ranking.push(candidate);
   current++;
   nextCharacter();
 } else {
   compare();
 }
}

function finishGame() {
 show("result-screen");
 const list = $("result-list");
 list.innerHTML = "";
 ranking.forEach((c, i) => {
   const li = document.createElement("li");
   const img = document.createElement("img");
   img.src = c.image;
   img.alt = c.name;
   const span = document.createElement("span");
   span.textContent = `${i + 1}位　${c.name}`;
   li.append(img, span);
   list.appendChild(li);
 });
}

async function sendVote() {
 if (!CONFIG.API_URL) {
   $("vote-status").textContent = "script.js の CONFIG.API_URL にApps ScriptのURLを設定してください。";
   return;
 }
 try {
   const res = await fetch(CONFIG.API_URL, {
     method:"POST",
     headers:{"Content-Type":"text/plain;charset=utf-8"},
     body:JSON.stringify({ranking:ranking.map(c=>c.name)})
   });
   if (!res.ok) throw new Error(res.status);
   $("vote-status").textContent = "集計に送信しました！";
 } catch(e) {
   $("vote-status").textContent = "送信できませんでした。設定を確認してください。";
 }
}

$("start-button").addEventListener("click", startGame);
$("choice-a").addEventListener("click", chooseCandidate);
$("choice-b").addEventListener("click", chooseOpponent);
$("retry-button").addEventListener("click", startGame);
$("vote-button").addEventListener("click", sendVote);

// ページを開いた時は必ずスタート画面。
// ここで startGame() を呼ばないのが重要。
show("start-screen");
