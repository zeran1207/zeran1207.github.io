/*
 * バトスピ ディーバ キャラソート
 * GitHub Pages側の設定は CONFIG.API_URL だけです。
 *
 * 集計を使わない場合は空欄のままでも遊べます。
 */
const CONFIG = {
  API_URL: "" // Google Apps Scriptの /exec URLをここに貼る
};

const CHARACTERS = [
  { name: "レイ・オーバ", image: "images/rei.svg" },
  { name: "フォンニーナ", image: "images/fonnina.svg" },
  { name: "ディアナ・フルール", image: "images/diana.svg" },
  { name: "ジャンヌ・ドラニエス", image: "images/jeanne.svg" },
  { name: "ゼクシア・テンマ", image: "images/zexia.svg" },
  { name: "グリーフィア・ダルク", image: "images/griefia.svg" },
  { name: "ラビィ・ダーリン", image: "images/ravie.svg" },
  { name: "スピッツ・ドラコニー", image: "images/spitz.svg" }
];

let comparisons = 0;
let totalComparisons = 0;
let current = null;

/*
 * ユーザーの二択を使ったマージソート。
 * 「Aを選ぶ」= AをBより上にする。
 * 8人程度なら比較回数も少なく、単純な入れ替え式より安定します。
 */
function startSort() {
  const shuffled = [...CHARACTERS].sort(() => Math.random() - 0.5);
  current = {
    queue: [shuffled],
    nextQueue: [],
    left: null,
    right: null,
    result: [],
    phase: "prepare"
  };
  comparisons = 0;
  totalComparisons = Math.ceil(Math.log2(CHARACTERS.length)) * CHARACTERS.length;
  show("game-screen");
  prepareMerge();
}

function prepareMerge() {
  if (current.queue.length <= 1) {
    if (current.queue.length === 1) {
      current.result = current.queue[0];
    }
    showResult();
    return;
  }
  current.nextQueue = [];
  current.mergeIndex = 0;
  current.mergeLeft = current.queue[0];
  current.mergeRight = current.queue[1];
  current.queue = current.queue.slice(2);
  current.merged = [];
  askNext();
}

function askNext() {
  const a = current.mergeLeft[current.mergeIndex || 0];
  const b = current.mergeRight[current.mergeIndexRight || 0];

  if (!a) {
    current.merged.push(...current.mergeRight.slice(current.mergeIndexRight || 0));
    finishMerge();
    return;
  }
  if (!b) {
    current.merged.push(...current.mergeLeft.slice(current.mergeIndex || 0));
    finishMerge();
    return;
  }

  current.a = a;
  current.b = b;
  renderChoice(a, b);
}

function choose(name) {
  if (!current || !current.a || !current.b) return;

  if (name === current.a.name) {
    current.merged.push(current.a);
    current.mergeIndex = (current.mergeIndex || 0) + 1;
  } else {
    current.merged.push(current.b);
    current.mergeIndexRight = (current.mergeIndexRight || 0) + 1;
  }

  comparisons++;
  updateProgress();
  askNext();
}

function finishMerge() {
  current.nextQueue.push(current.merged);
  current.mergeIndex = 0;
  current.mergeIndexRight = 0;

  if (current.queue.length > 0) {
    current.mergeLeft = current.queue[0];
    current.mergeRight = current.queue[1];
    current.queue = current.queue.slice(2);
    current.merged = [];
    askNext();
  } else {
    current.queue = current.nextQueue;
    current.nextQueue = [];
    if (current.queue.length === 1) {
      current.result = current.queue[0];
      showResult();
    } else {
      prepareMerge();
    }
  }
}

function renderChoice(a, b) {
  setText("name-a", a.name);
  setText("name-b", b.name);
  setImage("img-a", a);
  setImage("img-b", b);
  document.getElementById("choice-a").onclick = () => choose(a.name);
  document.getElementById("choice-b").onclick = () => choose(b.name);
}

function updateProgress() {
  const max = Math.max(totalComparisons, comparisons + 1);
  document.getElementById("progress-bar").style.width =
    Math.min(95, (comparisons / max) * 100) + "%";
  setText("progress-text", `比較 ${comparisons} 回目`);
}

function showResult() {
  show("result-screen");
  const list = document.getElementById("result-list");
  list.innerHTML = "";
  current.result.forEach((c, i) => {
    const li = document.createElement("li");
    li.textContent = `${c.name}`;
    list.appendChild(li);
  });
}

async function sendVote() {
  const status = document.getElementById("send-status");
  if (!CONFIG.API_URL) {
    status.textContent = "集計URLがまだ設定されていません。script.js の CONFIG.API_URL を設定してください。";
    return;
  }

  const ranking = current.result.map(c => c.name);
  status.textContent = "送信中…";

  try {
    const response = await fetch(CONFIG.API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ranking })
    });
    const data = await response.json();
    if (!data.ok) throw new Error(data.error || "送信に失敗しました");
    status.textContent = "投票を送信しました！ありがとう！";
  } catch (e) {
    status.textContent = "送信できませんでした。集計URLやApps Scriptの公開設定を確認してください。";
    console.error(e);
  }
}

async function loadStats() {
  if (!CONFIG.API_URL) {
    alert("集計URLがまだ設定されていません。");
    return;
  }

  try {
    const response = await fetch(CONFIG.API_URL, { method: "GET" });
    const data = await response.json();
    if (!data.ok) throw new Error(data.error || "取得失敗");

    setText("vote-count", `現在の投票数：${data.votes}票`);
    const list = document.getElementById("stats-list");
    list.innerHTML = "";

    data.ranking.forEach(item => {
      const li = document.createElement("li");
      li.textContent =
        `${item.name}　平均 ${Number(item.average).toFixed(2)}位　1位 ${item.first}票`;
      list.appendChild(li);
    });

    show("stats-screen");
  } catch (e) {
    alert("集計結果を取得できませんでした。");
    console.error(e);
  }
}

function restart() {
  show("start-screen");
}

function show(id) {
  ["start-screen", "game-screen", "result-screen", "stats-screen"]
    .forEach(x => document.getElementById(x).classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

function setImage(id, character) {
  const img = document.getElementById(id);
  img.src = character.image;
  img.alt = character.name;
  img.onerror = () => {
    // 画像が未配置でもキャラソート自体は遊べるようにする
    img.src = makePlaceholder(character.name);
  };
}

function makePlaceholder(text) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
    <rect width="600" height="600" fill="#f1f1f1"/>
    <text x="300" y="300" text-anchor="middle" dominant-baseline="middle"
      font-size="42" font-family="sans-serif" fill="#888">${escapeXml(text)}</text>
  </svg>`;
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

function escapeXml(s) {
  return s.replace(/[<>&'"]/g, c => ({
    "<":"&lt;", ">":"&gt;", "&":"&amp;", "'":"&apos;", '"':"&quot;"
  }[c]));
}

document.getElementById("start-button").onclick = startSort;
document.getElementById("send-button").onclick = sendVote;
document.getElementById("stats-button").onclick = loadStats;
document.getElementById("restart-button").onclick = restart;
document.getElementById("back-button").onclick = () => show("result-screen");
