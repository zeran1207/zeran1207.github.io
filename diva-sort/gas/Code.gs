/*
 * バトスピ ディーバ キャラソート 集計用
 *
 * 1. Googleスプレッドシートを1枚作る
 * 2. 拡張機能 → Apps Script
 * 3. このコードを貼り付けて保存
 * 4. デプロイ → 新しいデプロイ → ウェブアプリ
 * 5. 実行するユーザー：自分
 * 6. アクセスできるユーザー：全員
 * 7. 発行された /exec URL を GitHub側 script.js の CONFIG.API_URL に貼る
 */

const SHEET_NAME = "投票";

const CHARACTERS = [
  "レイ・オーバ",
  "フォンニーナ",
  "ディアナ・フルール",
  "ジャンヌ・ドラニエス",
  "ゼクシア・テンマ",
  "グリーフィア・ダルク",
  "ラビィ・ダーリン",
  "スピッツ・ドラコニー"
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (!Array.isArray(data.ranking)) {
      return output({ok:false, error:"rankingがありません"});
    }
    if (data.ranking.length !== CHARACTERS.length) {
      return output({ok:false, error:"キャラクター数が不正です"});
    }

    const valid = data.ranking.every(name => CHARACTERS.includes(name));
    if (!valid) {
      return output({ok:false, error:"不正なキャラクターが含まれています"});
    }

    const unique = new Set(data.ranking);
    if (unique.size !== CHARACTERS.length) {
      return output({ok:false, error:"同じキャラクターが重複しています"});
    }

    const sheet = getSheet();
    sheet.appendRow([new Date(), ...data.ranking]);

    return output({ok:true});
  } catch (error) {
    return output({ok:false, error:String(error)});
  }
}

function doGet() {
  const sheet = getSheet();
  const values = sheet.getDataRange().getValues();

  if (values.length <= 1) {
    return output({ok:true, votes:0, ranking:[]});
  }

  const scores = {};
  CHARACTERS.forEach(name => {
    scores[name] = {name, first:0, total:0};
  });

  for (let r = 1; r < values.length; r++) {
    for (let i = 0; i < CHARACTERS.length; i++) {
      const name = values[r][i + 1];
      if (!scores[name]) continue;

      const rank = i + 1;
      scores[name].total += rank;
      if (rank === 1) scores[name].first++;
    }
  }

  const voteCount = values.length - 1;

  const ranking = Object.values(scores)
    .map(item => ({
      name: item.name,
      first: item.first,
      average: voteCount > 0 ? item.total / voteCount : 0
    }))
    .sort((a, b) => {
      if (a.average !== b.average) return a.average - b.average;
      return b.first - a.first;
    });

  return output({ok:true, votes:voteCount, ranking});
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["日時", ...CHARACTERS]);
  }

  return sheet;
}

function output(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
