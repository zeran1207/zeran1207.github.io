const CONFIG = { API_URL: "https://script.google.com/macros/s/AKfycbxmZeJbTSNcaxoQNLC1t7raCeGl_Rnr0bP1hQE5b03ymf1k-OVPaUvkX3adRGd3PXpptA/exec" };

const characters = [
  {name:"レイ・オーバ",image:"images/img_01-01.jpg"},
  {name:"グリーフィア・ダルク",image:"images/img_01-02.jpg"},
  {name:"ラビィ・ダーリン",image:"images/img_01-03.jpg"},
  {name:"エマ・ジーン",image:"images/img_01-04.jpg"},
  {name:"ホクト・アポロニア",image:"images/img_01-05.jpg"},
  {name:"ノア・フルール",image:"images/img_01-06.jpg"},
  {name:"ラン・ブレイセア",image:"images/img_01-07.jpg"},
  {name:"ジークフリーダ",image:"images/img_01-08.jpg"},
  {name:"サヤ・シャイン",image:"images/img_01-09.jpg"},
  {name:"ローラ・ビャクラン",image:"images/img_01-10.jpg"},
  {name:"ライザ・ダイノーブ",image:"images/img_01-11.jpg"},
  {name:"シンリィ・オーリュー",image:"images/img_01-12.jpg"},
  {name:"スピッツ・ドラコニー",image:"images/img_01-13.jpg"},
  {name:"バーシャ・ダレス",image:"images/img_02-01.jpg"},
  {name:"リゼ・クロムウェル",image:"images/img_02-02.jpg"},
  {name:"フォンニーナ",image:"images/img_02-03.jpg"},
  {name:"デリス・ペルティオ",image:"images/img_02-04.jpg"},
  {name:"フリーダ・ライファ",image:"images/img_02-05.jpg"},
  {name:"マリモ・イーディス",image:"images/img_02-06.jpg"},
  {name:"ナナカ・シロナガ",image:"images/img_02-07.jpg"},
  {name:"ジャコミーナ・キット",image:"images/img_02-08.jpg"},
  {name:"ヒルダ・マーガレット",image:"images/img_02-09.jpg"},
  {name:"ローズ・ベリィ",image:"images/img_02-10.jpg"},
  {name:"ミリア・サンデー",image:"images/img_02-11.jpg"},
  {name:"ガーネット・ルーティ",image:"images/img_02-12.jpg"},
  {name:"リーファ・シアーズ",image:"images/img_02-13.jpg"},
  {name:"オルティーナ・クラン",image:"images/img_02-14.jpg"},
  {name:"リューネ・マト",image:"images/img_02-15.jpg"},
  {name:"タウリース・キング",image:"images/img_02-16.jpg"},
  {name:"オージェリア・ディーン",image:"images/img_02-17.jpg"},
  {name:"ヴァレリー・ヴァース",image:"images/img_02-18.jpg"},
  {name:"キャロン・ポーン",image:"images/img_02-19.jpg"},
  {name:"レーヴァ・ティーン",image:"images/img_02-20.jpg"},
  {name:"ミナレア・アオキ",image:"images/img_02-21.jpg"},
  {name:"ソルディシア・A・ペンドラゴン",image:"images/img_02-22.jpg"},
  {name:"ラグナリア・ロックウェル",image:"images/img_02-23.jpg"},
  {name:"バロレッタ・ボルドー",image:"images/img_02-24.jpg"},
  {name:"クインステル・メドゥーク",image:"images/img_02-25.jpg"},
  {name:"ネイ・ランテイル",image:"images/img_03-01.jpg"},
  {name:"ジャンヌ・ドラニエス",image:"images/img_03-02.jpg"},
  {name:"キャシー・レイム",image:"images/img_03-03.jpg"},
  {name:"セイナ・リューミン",image:"images/img_03-04.jpg"},
  {name:"ソニア・A・ワスプ",image:"images/img_03-05.jpg"},
  {name:"シエラ・ムルセーヌ",image:"images/img_03-06.jpg"},
  {name:"フラム・サンドリア",image:"images/img_03-07.jpg"},
  {name:"ディアナ・フルール",image:"images/img_03-08.jpg"},
  {name:"マイ・アスカ",image:"images/img_03-09.jpg"},
  {name:"マグノリリア・マイザー",image:"images/img_03-10.jpg"},
  {name:"ルーナ・ヴァンディル",image:"images/img_03-11.jpg"},
  {name:"イルマ・イマージュ",image:"images/img_03-12.jpg"},
  {name:"ベルゼリア・ビート",image:"images/img_03-13.jpg"},
  {name:"アクシェラ・マシュルーン ",image:"images/img_03-14.jpg"},
  {name:"ダイヤ・ルーン",image:"images/img_04-01.jpg"},
  {name:"アン",image:"images/img_04-02.jpg"},
  {name:"ショコ",image:"images/img_04-03.jpg"},
  {name:"ムゥ",image:"images/img_04-04.jpg"},
  {name:"ローリア・シープス",image:"images/img_04-05.jpg"},
  {name:"ミスティ・ライルビット",image:"images/img_04-06.jpg"},
  {name:"リオル・ティーダ",image:"images/img_04-07.jpg"},
  {name:"ウェンディ・ケイト",image:"images/img_04-08.jpg"},
  {name:"シュウ",image:"images/img_04-09.jpg"},
  {name:"ドーラ・クルセイル",image:"images/img_04-10.jpg"},
  {name:"シンラ・シージェン",image:"images/img_04-11.jpg"},
  {name:"リアス・ウロヴォルン",image:"images/img_04-12.jpg"},
  {name:"ムーンライラ・ランドック",image:"images/img_05-01.jpg"},
  {name:"ウィーゼ・Z・サンダー",image:"images/img_05-02.jpg"},
  {name:"ネガズボッ子",image:"images/img_05-03.jpg"},
  {name:"コフィーナ",image:"images/img_05-04.jpg"},
  {name:"ケリュネ・ライトニング",image:"images/img_05-05.jpg"},
  {name:"リュキア・オース",image:"images/img_05-06.jpg"},
  {name:"セイクレア・メトゥーム",image:"images/img_05-07.jpg"},
  {name:"サンディ・Z・レオノーラ",image:"images/img_05-08.jpg"},
  {name:"シルキー・サンセット",image:"images/img_05-09.jpg"},
  {name:"ガーヤトリー・フォックス",image:"images/img_05-10.jpg"},
  {name:"ピスティナ・ガレオン",image:"images/img_06-01.jpg"},
  {name:"アクアエール・シオン",image:"images/img_06-02.jpg"},
  {name:"スピニア・スコール",image:"images/img_06-03.jpg"},
  {name:"キリン・ムソーシン",image:"images/img_06-04.jpg"},
  {name:"ボル美",image:"images/img_06-05.jpg"},
  {name:"ドラゴモニカ・タウラス",image:"images/img_06-06.jpg"},
  {name:"ヴィエルジェ",image:"images/img_06-07.jpg"},
  {name:"セフィ・アリエス",image:"images/img_06-08.jpg"},
  {name:"レオナ・ライクブーム",image:"images/img_06-09.jpg"},
  {name:"キャンディ・サード",image:"images/img_06-10.jpg"},
  {name:"ポロン・サジータ",image:"images/img_06-11.jpg"},
  {name:"ジェミナ＆ナイズル",image:"images/img_06-12.jpg"},
  {name:"リヴィー・ラ・フォーレム",image:"images/img_06-13.jpg"},
  {name:"フォーミュリア・エグゼシータ",image:"images/img_07-01.jpg"},
  {name:"ゲイル・フェニーク",image:"images/img_07-02.jpg"},
  {name:"マウ・チュッチュ",image:"images/img_07-03.jpg"},
  {name:"アメディス・ソーニャック",image:"images/img_07-04.jpg"},
  {name:"ツル",image:"images/img_08-01.jpg"},
  {name:"謡",image:"images/img_08-02.jpg"},
  {name:"萌菜可",image:"images/img_08-03.jpg"},
  {name:"由月",image:"images/img_08-04.jpg"},
  {name:"真姫奈",image:"images/img_08-05.jpg"},
  {name:"バンリ・ソラ",image:"images/img_08-06.jpg"},
  {name:"センリ・タイガ",image:"images/img_08-07.jpg"},
  {name:"サイカ・ウンディーネ",image:"images/img_08-08.jpg"},
  {name:"カサネ",image:"images/img_08-09.jpg"},
  {name:"バンリ・ゼル",image:"images/img_08-10.jpg"},
  {name:"ゼクシア・テンマ",image:"images/img_08-11.jpg"},
  {name:"モモ・ギュウモンジェ",image:"images/img_08-12.jpg"},
  {name:"レイヤ・クワトロ",image:"images/img_08-13.jpg"},
  {name:"ムドゥーニャ・ロクブーショカ",image:"images/img_08-14.jpg"},
  {name:"フーガ・リン",image:"images/img_08-15.jpg"},
  {name:"シシノ・クワトロ",image:"images/img_08-16.jpg"},
  {name:"フロマージュ",image:"images/img_09-01.jpg"},
  {name:"イエロー・マーリン",image:"images/img_09-02.jpg"},
  {name:"ラクェル",image:"images/img_09-03.jpg"},
  {name:"トリックスター",image:"images/img_09-04.jpg"},
  {name:"ブラックスター",image:"images/img_09-05.jpg"},
  {name:"ロメーダ",image:"images/img_09-06.jpg"},
  {name:"カノン",image:"images/img_09-07.jpg"},
  {name:"エンジュ",image:"images/img_09-08.jpg"},
  {name:"アヴリエル",image:"images/img_09-09.jpg"},
  {name:"カトレア",image:"images/img_09-10.jpg"},
  {name:"アリス",image:"images/img_09-11.jpg"},
  {name:"ソフィア",image:"images/img_09-12.jpg"},
  {name:"アーシア",image:"images/img_09-13.jpg"},
  {name:"マリカ",image:"images/img_09-14.jpg"},
  {name:"ココ",image:"images/img_09-15.jpg"},
  {name:"ミレファ",image:"images/img_09-16.jpg"},
  {name:"シンデレラ",image:"images/img_09-17.jpg"},
  {name:"リリカ・レム",image:"images/img_10-01.jpg"},
  {name:"モア",image:"images/img_10-02.jpg"},
  {name:"雪",image:"images/img_10-03.jpg"},
  {name:"サワエル",image:"images/img_10-04.jpg"},
  {name:"孫市／キリカ",image:"images/img_10-05.jpg"},
  {name:"ミズノ",image:"images/img_10-06.jpg"},
  {name:"シャイニング・ガンタン",image:"images/img_10-07.jpg"},
  {name:"モモミン",image:"images/img_10-08.jpg"},
  {name:"ライラ姉妹",image:"images/img_10-09.jpg"},
  {name:"アジルス",image:"images/img_10-10.jpg"},
  {name:"ことね",image:"images/img_10-11.jpg"},
  {name:"ほちゃー",image:"images/img_10-12.jpg"},
  {name:"ワルツ",image:"images/img_10-13.jpg"},
  {name:"マール",image:"images/img_10-14.jpg"},
  {name:"ラムディエル",image:"images/img_10-15.jpg"},
  {name:"エアリフェル",image:"images/img_10-16.jpg"},
  {name:"アラフィエル",image:"images/img_10-17.jpg"},
  {name:"ミレディエル",image:"images/img_10-18.jpg"},
  {name:"クラーラ",image:"images/img_10-19.jpg"},
  {name:"黒曜の徒",image:"images/img_10-20.jpg"},
  {name:"ウィンディ・ベヒモス様",image:"images/img_10-21.jpg"},
  {name:"フェニル",image:"images/img_10-22.jpg"},
  {name:"フェルマ",image:"images/img_10-23.jpg"},
  {name:"カミュ",image:"images/img_10-24.jpg"},
  {name:"ダルニア",image:"images/img_10-25.jpg"},
  {name:"フラウ",image:"images/img_10-26.jpg"},
  {name:"伝説の詩姫ライラさん",image:"images/img_10-27.jpg"},
  {name:"マリー・アント・零須",image:"images/img_10-28.jpg"},
  {name:"天罰の大天使",image:"images/img_10-29.jpg"},
  {name:"ベルガモット・ミント",image:"images/img_10-30.jpg"},
  {name:"リリサ",image:"images/img_10-31.jpg"},
  {name:"ジェーン・ボゥ",image:"images/26RDB01-001.jpg"},
  {name:"ムーシャ・コッコ",image:"images/26RDB01-003.jpg"},
  {name:"アーク・ライア",image:"images/26RDB01-007.jpg"},
  {name:"ジーン・ローズ",image:"images/26RDB01-008.jpg"},
  {name:"シャニエル",image:"images/26RDB01-009.jpg"},
  {name:"サラスヴァティー",image:"images/26RDB01-015.jpg"},
  {name:"アロエ・トール",image:"images/26RDB01-016.jpg"},
  {name:"バーバラ・チョウティ",image:"images/26RDB01-018.jpg"},
  {name:"オリンディアス",image:"images/26RDB01-019.jpg"},
  {name:"スクィーディナ",image:"images/26RDB01-022.jpg"},
  {name:"シーン・エイラ",image:"images/26RDB01-027.jpg"},
  {name:"カイザリン・アトゥラス",image:"images/26RDB01-029.jpg"},
  {name:"モリガン",image:"images/26RDB01-030.jpg"},
  {name:"メル・ラック",image:"images/26RDB01-035.jpg"},
  {name:"マリー・ドッグ",image:"images/26RDB01-037.jpg"},
  {name:"ファラン・シュバイソン",image:"images/26RDB01-040.jpg"},
  {name:"カーラミィ・ティボア",image:"images/26RDB01-041.jpg"},
  {name:"ソフィーユ・クルプニール",image:"images/26RDB01-044.jpg"},
  {name:"ライカ・ロンシア",image:"images/26RDB01-046.jpg"},
  {name:"クローディア",image:"images/26RDB01-047.jpg"},
  {name:"ヴァルディナ・ガイヤ",image:"images/26RDB01-X01.jpg"},
  {name:"メルディア・マルルフィン",image:"images/26RDB01-X03.jpg"},
  {name:"ティア・マドゥーラ",image:"images/26RDB01-X06.jpg"},
  {name:"ディアン・テリオン",image:"images/26RDB01-X07.jpg"},
  {name:"アマールナ",image:"images/26RSD08-001.jpg"},
  {name:"カオリ・ペガサロス",image:"images/26RSD08-002.jpg"},
  {name:"ルクシア・ランス",image:"images/26RSD08-005.jpg"},
  {name:"ララファ・エル",image:"images/26RSD08-006.jpg"},
  {name:"ティアラ・ノーザウラン",image:"images/26RSD08-009.jpg"},
  {name:"ゼーロティア",image:"images/26RSD08-X01.jpg"},
  {name:"ペディラ・マイ",image:"images/BSC32-005.jpg"},
  {name:"アレックス",image:"images/BSC33-CP01.jpg"},
  {name:"リリ",image:"images/BSC33-CP02.jpg"},
  {name:"アルテミス",image:"images/BSC35-036.jpg"},
  {name:"プリン・ガーフィールド",image:"images/BSC46-X08.jpg"},
  {name:"ヘラ",image:"images/BSC35-037.jpg"},
  {name:"リリナ",image:"images/P18-09.jpg"},
  {name:"レムリエル",image:"images/P17-22.jpg"},
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
