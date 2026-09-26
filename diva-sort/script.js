const CONFIG = {
    API_URL: "https://script.google.com/macros/s/AKfycbwGkoVcxqDorlcjh15qygn_SVgGf2jJZ4Xd2mC5EDsH3UpgSnroke34DB2z2Pk39jLDyA/exec"
};
let groups = [],
    groupIndex = 0,
    picked = [],
    mergeLists = [],
    mergeQueue = [],
    mergeResults = [],
    activeMerge = null,
    finalRanking = [];
const $ = id => document.getElementById(id);

function show(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    $(id).classList.add('active')
}

function shuffle(a) {
    const x = [...a];
    for (let i = x.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [x[i], x[j]] = [x[j], x[i]]
    }
    return x
}

function startGame() {
    groups = [];
    for (let i = 0; i < characters.length; i += 9) groups.push(shuffle(characters.slice(i, i + 9)));
    groupIndex = 0;
    picked = [];
    mergeLists = [];
    mergeQueue = [];
    mergeResults = [];
    activeMerge = null;
    finalRanking = [];
    show('group-screen');
    renderGroup()
}

function renderGroup() {
    const remaining = groups[groupIndex];
    $('group-title').textContent = `グループ ${groupIndex + 1} / ${groups.length}`;
    $('group-progress').textContent = `残り ${remaining.length}人 — 好きな順にタップ`;
    const cards = $('group-cards');
    cards.innerHTML = '';
    remaining.forEach((c, i) => {
        const b = document.createElement('button');
        b.className = 'character-card';
        b.type = 'button';
        const img = document.createElement('img');
        img.src = c.image;
        img.alt = c.name;
        img.loading = 'lazy';
        const name = document.createElement('span');
        name.textContent = c.name;
        b.append(img, name);
        b.onclick = () => pickCharacter(i);
        cards.appendChild(b)
    });
    renderPicked()
}

function pickCharacter(index) {
    const remaining = groups[groupIndex];
    picked.push(remaining.splice(index, 1)[0]);
    renderGroup();
    if (remaining.length === 0) {
        groups[groupIndex] = picked;
        picked = [];
        groupIndex++;
        if (groupIndex >= groups.length) beginMerge();
        else renderGroup()
    }
}

function renderPicked() {
    const list = $('picked-list');
    list.innerHTML = '';
    picked.forEach((c, i) => {
        const li = document.createElement('li');
        const r = document.createElement('b');
        r.textContent = `${i + 1}位`;
        const img = document.createElement('img');
        img.src = c.image;
        img.alt = c.name;
        const s = document.createElement('span');
        s.textContent = c.name;
        li.append(r, img, s);
        list.appendChild(li)
    })
}

function beginMerge() {
    mergeLists = groups.map(g => [...g]);
    nextMergeRound()
}

function nextMergeRound() {
    if (mergeLists.length <= 1) {
        finalRanking = mergeLists[0] ? [...mergeLists[0]] : [];
        finishGame();
        return
    }
    mergeQueue = [];
    for (let i = 0; i < mergeLists.length; i += 9) mergeQueue.push(mergeLists.slice(i, i + 9));
    mergeResults = [];
    processMergeQueue()
}

function processMergeQueue() {
    if (mergeQueue.length === 0) {
        mergeLists = mergeResults;
        nextMergeRound();
        return
    }
    const batch = mergeQueue.shift();
    if (batch.length === 1) {
        mergeResults.push(batch[0]);
        processMergeQueue();
        return
    }
    activeMerge = {
        lists: batch,
        pointers: batch.map(() => 0),
        result: []
    };
    show('merge-screen');
    renderMerge()
}

function renderMerge() {
    if (!activeMerge) return;
    const candidates = [];
    activeMerge.lists.forEach((list, i) => {
        if (activeMerge.pointers[i] < list.length) candidates.push({
            character: list[activeMerge.pointers[i]],
            listIndex: i
        })
    });
    if (!candidates.length) {
        mergeResults.push(activeMerge.result);
        activeMerge = null;
        processMergeQueue();
        return
    }
    const total = activeMerge.lists.reduce((n, l) => n + l.length, 0);
    $('merge-progress').textContent = `${activeMerge.result.length + 1} / ${total}位`;
    const cards = $('merge-cards');
    cards.innerHTML = '';
    candidates.forEach(item => {
        const b = document.createElement('button');
        b.className = 'character-card';
        b.type = 'button';
        const img = document.createElement('img');
        img.src = item.character.image;
        img.alt = item.character.name;
        img.loading = 'lazy';
        const s = document.createElement('span');
        s.textContent = item.character.name;
        b.append(img, s);
        b.onclick = () => chooseMergeCandidate(item.listIndex);
        cards.appendChild(b)
    })
}

function chooseMergeCandidate(i) {
    if (!activeMerge) return;
    activeMerge.result.push(activeMerge.lists[i][activeMerge.pointers[i]++]);
    renderMerge()
}

function finishGame() {
    window.ranking = finalRanking;
    show('result-screen');
    $('result-count').textContent = `全${finalRanking.length}人`;
    const list = $('result-list');
    list.innerHTML = '';
    finalRanking.forEach((c, i) => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = c.image;
        img.alt = c.name;
        img.loading = 'lazy';
        const s = document.createElement('span');
        s.textContent = `${i + 1}位　${c.name}`;
        li.append(img, s);
        list.appendChild(li)
    })
}
async function sendVote() {
    if (!CONFIG.API_URL) {
        $('vote-status').textContent = 'CONFIG.API_URLを設定してください。';
        return
    }
    try {
        const res = await fetch(CONFIG.API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify({
                ranking: finalRanking.map(c => c.name)
            })
        });
        if (!res.ok) throw new Error(res.status);
        $('vote-status').textContent = '集計に送信しました！'
    } catch (e) {
        $('vote-status').textContent = '送信できませんでした。設定を確認してください。'
    }
}
$('start-button').addEventListener('click', startGame);
$('retry-button').addEventListener('click', startGame);
$('vote-button').addEventListener('click', sendVote);
show('start-screen');