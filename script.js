const NAME_TSV = "data/name.tsv";
const POSSESS_TSV = "data/possess.tsv";

let allData = [];

// TSVを読み込む
async function loadTSV(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${url} の読み込みに失敗しました`);
  }

  const text = await response.text();

  return parseTSV(text);
}

// TSVを配列に変換
function parseTSV(text) {
  const lines = text
    .trim()
    .split(/\r?\n/)
    .filter(line => line.trim() !== "");

  if (lines.length === 0) {
    return [];
  }

  const headers = lines[0].split("\t");

  return lines.slice(1).map(line => {
    const values = line.split("\t");
    const row = {};

    headers.forEach((header, index) => {
      row[header] = values[index] ?? "";
    });

    return row;
  });
}

// idを使って2つのTSVを結合
function combineData(nameData, possessData) {
  const possessMap = new Map();

  possessData.forEach(row => {
    possessMap.set(row.id, row.possess);
  });

  return nameData.map(row => ({
    id: row.id,
    name: row.name,
    possess: possessMap.get(row.id) ?? ""
  }));
}

// テーブルを表示
function renderTable(data) {
  const tableBody = document.getElementById("tableBody");
  const resultCount = document.getElementById("resultCount");

  tableBody.innerHTML = "";

  data.forEach(row => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${escapeHTML(row.id)}</td>
      <td>${escapeHTML(row.name)}</td>
      <td>${escapeHTML(row.possess)}</td>
    `;

    tableBody.appendChild(tr);
  });

  resultCount.textContent = `${data.length}件`;
}

// HTMLとして解釈されないようにする
function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// 検索
function searchTable(keyword) {
  const searchWord = keyword.trim().toLowerCase();

  if (searchWord === "") {
    renderTable(allData);
    return;
  }

  const filteredData = allData.filter(row => {
    return (
      row.id.toLowerCase().includes(searchWord) ||
      row.name.toLowerCase().includes(searchWord) ||
      row.possess.toLowerCase().includes(searchWord)
    );
  });

  renderTable(filteredData);
}

// 初期化
async function init() {
  const errorMessage = document.getElementById("errorMessage");

  try {
    const [nameData, possessData] = await Promise.all([
      loadTSV(NAME_TSV),
      loadTSV(POSSESS_TSV)
    ]);

    allData = combineData(nameData, possessData);

    renderTable(allData);

  } catch (error) {
    console.error(error);

    errorMessage.textContent =
      "データの読み込みに失敗しました。TSVファイルの場所を確認してください。";

    document.getElementById("resultCount").textContent = "エラー";
  }
}

// 検索ボックス
document
  .getElementById("searchInput")
  .addEventListener("input", event => {
    searchTable(event.target.value);
  });

init();
