let potus;
let counts = {};
const ignore = {
  the: true,
  to: true,
  we: true,
  of: true,
  and: true,
  a: true,
  http: true,
  https: true,
  our: true,
};

function preload() {
  potus = loadJSON('potus.json');
}

function setup() {
  createCanvas(700, 450);
  processTweets(potus.tweets);
  noLoop();
}

function draw() {
  drawVisualization();
}

function processTweets(tweets) {
  tweets.forEach(tweet => {
    if (tweet.timestamp && tweet.text) {
      const key = getMonthYearKey(tweet.timestamp);
      updateCounts(key, tweet.text);
    }
  });
}

function getMonthYearKey(timestamp) {
  const date = new Date(...timestamp.split(/[\: -]/));
  const month = date.getMonth() + 1;
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
  background(245, 250, 255);
  stroke(150);
  strokeWeight(1);
  fill(80);
  textSize(16);
  textAlign(LEFT, CENTER);
  text("Tweets per Month with Top Words", 20, 30);

  const months = Object.keys(counts).reverse();
  const maxTweets = Math.max(...months.map(month => counts[month].total));
  const leftMargin = 60;
  const bottomMargin = 80;
  const topMargin = 60;
  const chartHeight = height - bottomMargin - topMargin;
  const barWidth = (width - leftMargin) / months.length;

  // Draw y axis line and label
  line(leftMargin, topMargin, leftMargin, height - bottomMargin + 10);
  push();
  fill(80);
  textSize(14);
  textAlign(CENTER);
  translate(20, height / 2);
  rotate(-HALF_PI);
  text("Number of Tweets", 0, 0);
  pop();

  // Draw x axis line and label
  line(leftMargin, height - bottomMargin, width, height - bottomMargin);
  fill(80);
  textSize(14);
  textAlign(CENTER);
  text("Month / Year", leftMargin + (width - leftMargin) / 2, height - 30);

  // Draw bars, top words, and month labels
  months.forEach((month, i) => {
    const x = leftMargin + i * barWidth;
    const barHeight = map(counts[month].total, 0, maxTweets, 0, chartHeight);
    drawBar(x, barWidth, barHeight);
    drawTopWord(x, barWidth, barHeight, counts[month].words);
    drawMonthLabel(x, barWidth, month);
  });
}

function drawBar(x, barWidth, barHeight) {
  noStroke();
  fill(100, 150, 255);
  rect(x, height - 80 - barHeight, barWidth - 2, barHeight);
}

function drawTopWord(x, barWidth, barHeight, wordCounts) {
  const topWord = getTopWord(wordCounts);
  if (!topWord) return;
  const truncatedWord = topWord.length > 10 ? topWord.substring(0, 10) + '...' : topWord;
  fill(30);
  textSize(11);
  textAlign(CENTER, BOTTOM);
  text(truncatedWord, x + barWidth / 2, height - 80 - barHeight - 6);
}

function getTopWord(wordCounts) {
  return Object.keys(wordCounts).reduce((top, word) => {
    if (!ignore[word] && word.length > 3 && wordCounts[word] > (wordCounts[top] || 0)) {
      return word;
    }
    return top;
  }, '');
}

function drawMonthLabel(x, barWidth, month) {
  fill(80);
  textSize(12);
  textAlign(CENTER, TOP);
  text(month, x + barWidth / 2, height - 77);
}
