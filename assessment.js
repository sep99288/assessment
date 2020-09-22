'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
/**
 * 指定した要素の子供をすべて削除する
 * @param {HTMLElement} element HTML の要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}


assessmentButton.onclick = ()　=> {
    const userName = userNameInput.value;
    if (userName.length === 0) { // !userNameでも良い
        return;
    }
    removeAllChildren(resultDivided);

    // TODO 診断結果表示エリアの作成
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);
    
    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
    
    // TODO ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 
    'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('あなたのいいところ')
    +'&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);

    //scritpタグを作る
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

// Enterキーを押したときに診断を実行
userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
};

const answers = [
    '{置き換える名前}のいいところは声です。{置き換える名前}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{置き換える名前}のいいところはまなざしです。{置き換える名前}に見つめられた人は、気になって仕方がないでしょう。',
    '{置き換える名前}のいいところは情熱です。{置き換える名前}の情熱に周りの人は感化されます。',
    '{置き換える名前}のいいところは厳しさです。{置き換える名前}の厳しさがものごとをいつも成功に導きます。',
    '{置き換える名前}のいいところは知識です。博識な{置き換える名前}を多くの人が頼りにしています。',
    '{置き換える名前}のいいところはユニークさです。{置き換える名前}だけのその特徴が皆を楽しくさせます。',
    '{置き換える名前}のいいところは用心深さです。{置き換える名前}の洞察に、多くの人が助けられます。',
    '{置き換える名前}のいいところは見た目です。内側から溢れ出る{置き換える名前}の良さに皆が気を惹かれます。',
    '{置き換える名前}のいいところは決断力です。{置き換える名前}がする決断にいつも助けられる人がいます。',
    '{置き換える名前}のいいところは思いやりです。{置き換える名前}に気をかけてもらった多くの人が感謝しています。',
    '{置き換える名前}のいいところは感受性です。{置き換える名前}が感じたことに皆が共感し、わかりあうことができます。',
    '{置き換える名前}のいいところは節度です。強引すぎない{置き換える名前}の考えに皆が感謝しています。',
    '{置き換える名前}のいいところは好奇心です。新しいことに向かっていく{置き換える名前}の心構えが多くの人に魅力的に映ります。',
    '{置き換える名前}のいいところは気配りです。{置き換える名前}の配慮が多くの人を救っています。',
    '{置き換える名前}のいいところはその全てです。ありのままの{置き換える名前}自身がいいところなのです。',
    '{置き換える名前}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{置き換える名前}が皆から評価されています。',
    '{userName}のいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */

function assessment(userName) {
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    //文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{置き換える名前\}/g, userName);
    return result;
}

// テストコード
console.assert(
    assessment('太郎')　===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
