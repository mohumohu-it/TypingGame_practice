'use strict';

{
  const words = [
    'apple',
    'blueberry',
    'strawberry',
    'sky',
    'mountain',
    'river',
    'earth',
    'blue',
    'red',
    'yellow',
    'green',
    'dog',
    'cat',
    'middle',
    'set',
    'before',
    'after',
    'morning',
    'night',
    'get',
    'javascript',
    'python',
    'php',
    'ruby',
    'test',
    'good',
  ];
  let word;
  let loc;
  let score;
  let miss;
  const timeLimit = 20 * 1000;
  let startTime;
  let isPlaying = false;

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');

  function updateTarget() {
    let placeholder = '';
    for (let i = 0; i < loc; i++) {
      placeholder += '_';
    }
    target.textContent = placeholder + word.substring(loc);
  }

  function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);

    const timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);

    if (timeLeft < 0) {
      isPlaying = false;

      clearTimeout(timeoutId);
      timerLabel.textContent = '0.00';
      setTimeout(() => {
        showResult();
      }, 100);

      target.textContent = 'click to replay';
    }
  }

  function showResult() {
    const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
    let evaluation = ''
    if (accuracy >= 95 && score >= 50) {
      evaluation = 'Sランクです！めちゃくちゃすごい！'
    } else if (accuracy > 85 && score >= 40) {
      evaluation = 'Aランクです！けっこうすごい！'
    } else if (accuracy > 80 && score >= 30) {
      evaluation = 'Bランクです！まずますです！'
    } else {
      evaluation = 'Cランクです！がんばろう！'
    };
    alert(`${score + miss}文字中、正タイプ${score}、ミスタイプ${miss}で、\n${accuracy.toFixed(2)}%の正答率です!\n\n${evaluation}`);
  }

  window.addEventListener('click', () => {
    if (isPlaying === true) {
      return;
    }
    isPlaying = true;

    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)];

    target.textContent = word;
    startTime = Date.now();
    updateTimer();
  });

  window.addEventListener('keydown', e => {
    if (isPlaying !== true) {
      return;
    }

    if (e.key === word[loc]) {
      loc++;
      if (loc === word.length) {
        word = words[Math.floor(Math.random() * words.length)];
        loc = 0;
      }
      updateTarget();
      score++;
      scoreLabel.textContent = score;
    } else {
      miss++;
      missLabel.textContent = miss;
    }
  });
}
