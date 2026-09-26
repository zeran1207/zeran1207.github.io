/**
 * バトスピ ディーバ キャラソート 集計用 Apps Script
 *
 * このスクリプトを「集計先スプレッドシート」に紐づけてください。
 * Webアプリとしてデプロイすると、index.htmlからランキングを受け取って
 * 「Votes」シートへ1プレイ=1行で保存します。
 */

const SHEET_NAME = 'Votes';

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: 'Diva sorter API is running.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('POSTデータがありません。');
    }

    const data = JSON.parse(e.postData.contents);
    const ranking = data.ranking;

    if (!Array.isArray(ranking) || ranking.length === 0) {
      throw new Error('ranking が空です。');
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      throw new Error('スプレッドシートに紐づいたApps Scriptではありません。');
    }

    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // 初回だけヘッダーを作成。
    if (sheet.getLastRow() === 0) {
      const headers = ['timestamp', ...ranking.map((_, i) => `rank_${i + 1}`)];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }

    const row = [new Date(), ...ranking.map(String)];
    sheet.getRange(sheet.getLastRow() + 1, 1, 1, row.length).setValues([row]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error.message || error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
