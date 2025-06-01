let potus;
let counts = {};
const ignore = {
  "the": true,
  "to": true,
  "we": true,
  "of": true,
  "and": true,
  "a": true,
  "http": true,
  "https": true,
  "our": true,
};

function preload() {
  potus = loadJSON('potus.json');
}

function setup() {
  createCanvas(600, 400);
  processTweets(potus.tweets);
  drawVisualization();
}

function processTweets(tweets) {
  tweets.forEach(tweet => {
    if (tweet.timestamp && tweet.text) { // Ensure valid data
      const key = getMonthYearKey(tweet.timestamp);
      updateCounts(key, tweet.text);
    }
  });
}

function getMonthYearKey(timestamp) {
  const date = new Date(...timestamp.split(/[\: -]/));
  const month = date.getMonth() + 1; // Convert to 1-based month index
  const year = date.getFullYear();
  return `${month}/${year}`;
}

function updateCounts(key, text) {
  if (!counts[key]) {
    counts[key] = { total: 0, words: {} };
  }
  counts[key].total++;

  const words = text.split(/\W+/).map(w => w.toLowerCase());
  words.forEach(word => {
    if (word.length > 0) {
      counts[key].words[word] = (counts[key].words[word] || 0) + 1;
    }
  });
}

function drawVisualization() {
  background(0);
  const months = Object.keys(counts).reverse();
  const maxTweets = Math.max(...months.map(month => counts[month].total));
  const barWidth = width / months.length;

  months.forEach((month, i) => {
    const barHeight = map(counts[month].total, 0, maxTweets, 0, 300);
    drawBar(i, barWidth, barHeight);
    drawTopWord(i, barWidth, barHeight, counts[month].words);
  });
}

function drawBar(index, barWidth, barHeight) {
  fill(200);
  rect(index * barWidth, height - barHeight, barWidth - 1, barHeight);
}

function drawTopWord(index, barWidth, barHeight, wordCounts) {
  const topWord = getTopWord(wordCounts);
  const truncatedWord = topWord.length > 10 ? topWord.substring(0, 10) + '...' : topWord;
  fill(255);
  textSize(10);
  textAlign(CENTER);
  text(truncatedWord, index * barWidth + barWidth / 2, height - barHeight - 5);
}

function getTopWord(wordCounts) {
  return Object.keys(wordCounts).reduce((top, word) => {
    if (!ignore[word] && word.length > 3 && wordCounts[word] > (wordCounts[top] || 0)) {
      return word;
    }
    return top;
  }, '');
}
