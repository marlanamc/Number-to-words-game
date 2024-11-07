let currentNumber;
let correctCount = 0;
let incorrectCount = 0;
let totalQuestions = 0;

function getRandomNumber() {
  const type = document.getElementById('numberType').value;
  let min = 0;
  let max = 99;

  if (type === 'benchmark') {
    const benchmarkNumbers = [
      100,            // one hundred
      1000,           // one thousand
      5000,           // five thousand
      10000,          // ten thousand
      50000,          // fifty thousand
      100000,         // one hundred thousand
      500000,         // five hundred thousand
      1000000,        // one million
      5000000,        // five million
      10000000,       // ten million
      50000000,       // fifty million
      100000000,      // one hundred million
      500000000,      // five hundred million
      1000000000,     // one billion
      5000000000,     // five billion
      10000000000,    // ten billion
      50000000000,    // fifty billion
      100000000000,   // one hundred billion
      500000000000,   // five hundred billion
      1000000000000,  // one trillion
      5000000000000,  // five trillion
      10000000000000  // ten trillion
    ];
    return benchmarkNumbers[Math.floor(Math.random() * benchmarkNumbers.length)];
  } else if (type === 'all') {
    const categories = [
      { min: 0, max: 99 },            // basic
      { min: 100, max: 999 },         // hundreds
      { min: 1000, max: 9999 },       // thousands
      { min: 10000, max: 99999 },     // ten thousands
      { min: 100000, max: 999999 },   // hundred thousands
      { min: 1000000, max: 999999999 },       // millions
      { min: 1000000000, max: 999999999999 }, // billions
      { min: 1000000000000, max: 999999999999999 } // trillions
    ];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    min = randomCategory.min;
    max = randomCategory.max;
  } else {
    switch(type) {
      case '':
        return null;
      case 'basic':
        max = 99;
        break;
      case 'hundreds':
        min = 100;
        max = 999;
        break;
      case 'thousands':
        min = 1000;
        max = 9999;
        break;
      case 'ten-thousands':
        min = 10000;
        max = 99999;
        break;
      case 'hundred-thousands':
        min = 100000;
        max = 999999;
        break;
      case 'millions':
        min = 1000000;
        max = 999999999;
        break;
      case 'billions':
        min = 1000000000;
        max = 999999999999;
        break;
      case 'trillions':
        min = 1000000000000;
        max = 999999999999999;
        break;
      case 'ordinal':
        min = 1;
        max = 100;
        break;
      case 'years':
        min = 1100;
        max = 2099;
        break;
    }
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getOrdinalSuffix(num) {
  const lastDigit = num % 10;
  const lastTwoDigits = num % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return 'th';
  }
  
  switch (lastDigit) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

function numberToWords(num, isOrdinal = false) {
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const scales = ['', 'thousand', 'million', 'billion', 'trillion'];
  const ordinalOnes = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth'];
  const ordinalTens = ['', '', 'twentieth', 'thirtieth', 'fortieth', 'fiftieth', 'sixtieth', 'seventieth', 'eightieth', 'ninetieth'];

  function processGroup(n, isLast) {
    let result = '';

    if (n >= 100) {
      result += ones[Math.floor(n / 100)] + ' hundred ';
      n %= 100;
      if (n > 0) result += 'and ';
    }

    if (n >= 10 && n <= 19) {
      result += (isOrdinal && isLast) ? teens[n - 10] + 'th' : teens[n - 10];
    } else {
      if (n >= 20) {
        if (isOrdinal && isLast && n % 10 === 0) {
          result += ordinalTens[Math.floor(n / 10)];
        } else {
          result += tens[Math.floor(n / 10)];
          if (n % 10 > 0) {
            result += '-' + (isOrdinal && isLast ? ordinalOnes[n % 10] : ones[n % 10]);
          } else if (isOrdinal && isLast) {
            result += 'th';
          }
        }
      } else if (n > 0) {
        result += (isOrdinal && isLast) ? ordinalOnes[n] : ones[n];
      }
    }

    return result.trim();
  }

  if (num === 0) return isOrdinal ? 'zeroth' : 'zero';

  const type = document.getElementById('numberType').value;
  if (type === 'years') {
    if (num >= 2000) {
      const lastTwo = num % 100;
      let format1, format2;
      format1 = 'two thousand' + (lastTwo > 0 ? ' and ' + numberToWords(lastTwo) : '');
      
      if (lastTwo < 10) {
        return format1;
      } else {
        const firstTwo = Math.floor(num / 100);
        let firstPart = numberToWords(firstTwo);
        let secondPart = lastTwo <= 19 ? teens[lastTwo - 10] : numberToWords(lastTwo);
        format2 = firstPart + ' ' + secondPart;
        return `${format1}|${format2}`;
      }
    } else if (num < 2000) {
      const century = Math.floor(num / 100);
      const remainder = num % 100;

      let centuryWord = '';
      if (century >= 20) {
        centuryWord = tens[Math.floor(century / 10)] + '-' + ones[century % 10];
      } else if (century >= 10) {
        centuryWord = teens[century - 10];
      } else {
        centuryWord = ones[century];
      }

      if (remainder === 0) {
        return centuryWord + ' hundred';
      } else {
        if (remainder < 10) {
          return centuryWord + ' oh ' + ones[remainder];
        } else if (remainder >= 10 && remainder <= 19) {
          return centuryWord + ' ' + teens[remainder - 10];
        } else {
          let remainderWord = tens[Math.floor(remainder / 10)];
          if (remainder % 10 > 0) {
            remainderWord += '-' + ones[remainder % 10];
          }
          return centuryWord + ' ' + remainderWord;
        }
      }
    }
  }

  let result = '';
  let groupCount = 0;

  while (num > 0) {
    const group = num % 1000;
    if (group !== 0) {
      const groupText = processGroup(group, isOrdinal && groupCount === 0);
      if (groupCount > 0) {
        result = groupText + ' ' + scales[groupCount] + ' ' + result;
      } else {
        result = groupText;
      }
    }
    groupCount++;
    num = Math.floor(num / 1000);
  }

  return result.trim();
}

function generateNewNumber() {
  currentNumber = getRandomNumber();
  const type = document.getElementById('numberType').value;

  // Format the display number
  let displayNum;
  if (type === 'ordinal') {
    const suffix = getOrdinalSuffix(currentNumber);
    displayNum = `${currentNumber}${suffix}`;
  } else if (type === 'years') {
    displayNum = currentNumber.toString(); // No formatting for years
  } else {
    displayNum = currentNumber.toLocaleString(); // Add commas for other numbers
  }

  // Clear all feedback elements
  document.getElementById('numberDisplay').textContent = displayNum;
  document.getElementById('answer').value = '';
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = 'feedback';
  document.getElementById('standardFormat').textContent = '';
  document.getElementById('incorrectStat').innerHTML = 'Incorrect: <span id="incorrectCount">'+incorrectCount+'</span>';
  document.getElementById('answer').focus();
}

function normalizeAnswer(answer) {
  return answer.toLowerCase()
    .replace(/[-,]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function updatePercentage() {
  const percentage = totalQuestions === 0 ? 0 : Math.round((correctCount / totalQuestions) * 100);
  const percentageElement = document.getElementById('percentage');
  const successRateLabel = document.getElementById('successRateLabel');
  percentageElement.textContent = percentage + '%';

  // Change color based on percentage value
  if (percentage === 0) {
    percentageElement.style.color = '#63c4f1'; // Blue for 0%
  } else if (percentage > 70) {
    percentageElement.style.color = 'green'; // Green for above 70%
  } else {
    percentageElement.style.color = 'red'; // Red for below 70%
  }
  // Set a specific color for "Success Rate" label text
  successRateLabel.style.color = '#FFFFFF';
}

function checkAnswer() {
  const userAnswer = document.getElementById('answer').value.trim();
  const type = document.getElementById('numberType').value;
  const isOrdinal = type === 'ordinal';
  let correctAnswer = numberToWords(currentNumber, isOrdinal);
  totalQuestions++;

  const feedback = document.getElementById('feedback');
  const standardFormat = document.getElementById('standardFormat');
  const incorrectStat = document.getElementById('incorrectStat');

  const normalizedUser = normalizeAnswer(userAnswer);

  // Handle multiple correct answers for years
  let isCorrect = false;
  if (type === 'years' && correctAnswer.includes('|')) {
    const possibleAnswers = correctAnswer.split('|');
    isCorrect = possibleAnswers.some(answer => normalizeAnswer(answer) === normalizedUser);
    // Use the first format as the standard display format
    correctAnswer = possibleAnswers[0];
  } else {
    isCorrect = normalizeAnswer(correctAnswer) === normalizedUser;
  }

  if (isCorrect) {
    correctCount++;
    feedback.textContent = 'Correct!';
    feedback.className = 'feedback correct';
    standardFormat.textContent = `You typed: "${userAnswer}"`;
    if (userAnswer !== correctAnswer) {
      standardFormat.textContent += `\nStandard format: "${correctAnswer}"`;
    }
    incorrectStat.innerHTML = 'Incorrect: <span id="incorrectCount">'+incorrectCount+'</span>';
  } else {
    incorrectCount++;
    feedback.textContent = 'Incorrect!';
    feedback.className = 'feedback incorrect';
    standardFormat.textContent = ''; // Clear the correct box
    incorrectStat.innerHTML = 'Incorrect: <span id="incorrectCount">'+incorrectCount+'</span>' +
      '<div style="font-size: 0.9em; margin-top: 4px;">You typed: "'+userAnswer+'"<br>Correct: "'+correctAnswer+'"</div>';
  }

  document.getElementById('correctCount').textContent = correctCount;
  updatePercentage();
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    checkAnswer();
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    generateNewNumber();
  }
});

// Listen for category changes
document.getElementById('numberType').addEventListener('change', generateNewNumber);

// Initialize the game
generateNewNumber();
