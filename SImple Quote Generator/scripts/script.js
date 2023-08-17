const nature = {
    1: [
        "In every walk with nature, one receives far more than he seeks",
        "John Muir",
    ],
    2: [
        "The clearest way into the Universe is through a forest wilderness",
        "John Muir",
    ],
    3: [
        "Look deep into nature, and then you will understand everything better",
        "Albert Einstein",
    ],
    4: ["The poetry of the earth is never dead", "John Keats"],
    5: [
        "Adopt the pace of nature: her secret is patience",
        "Ralph Waldo Emerson",
    ],
};

const night = {
    1: [
        "I often think that the night is more alive and more richly colored than the day",
        "Vincent van Gogh",
    ],
    2: ["Night is a world lit by itself", "Antonio Porchia"],
    3: [
        "The night is young, and by the grace of magic, so are we",
        "Michael Buckley",
    ],
    4: [
        "The night is alive with stars, and when I look up at the sky, so am I",
        "Neil Gaiman",
    ],
    5: [
        "The night, when the winds that stir the trees are our own thoughts",
        "William Pitt Root",
    ],
};

const life = {
    1: [
        "Life is really simple, but we insist on making it complicated",
        "Confucius",
    ],
    2: ["Life is either a daring adventure or nothing at all", "Helen Keller"],
    3: [
        "Life is short, and it's up to you to make it sweet",
        "Sarah Louise Delany",
    ],
    4: [
        "Life is a journey that must be traveled no matter how bad the roads and accommodations",
        "Oliver Goldsmith",
    ],
    5: ["Life is a balance of holding on and letting go", "Rumi"],
};

const self = {
    1: [
        "Your time is limited, don't waste it living someone else's life",
        "Steve Jobs",
    ],
    2: [
        "To love oneself is the beginning of a lifelong romance",
        "Oscar Wilde",
    ],
    3: [
        "It takes courage to grow up and become who you really are",
        "E.E. Cummings",
    ],
    4: ["You were born an original. Don't die a copy", "John Mason"],
    5: [
        "The more you like yourself, the less you are like anyone else, which makes you unique",
        "Walt Disney",
    ],
};

const deep = {
    1: [
        "We are all in the gutter, but some of us are looking at the stars",
        "Oscar Wilde",
    ],
    2: ["The only way to do great work is to love what you do", "Steve Jobs"],
    3: ["The only true wisdom is in knowing you know nothing", "Socrates"],
    4: [
        "The two most important days in your life are the day you are born and the day you find out why",
        "Mark Twain",
    ],
    5: [
        "The deeper sorrow carves into your being, the more joy you can contain",
        "Kahlil Gibran",
    ],
};

const getQuoteButton = document.querySelector(".btn.generate-quote");
const getSimilarQuoteButton = document.querySelector(".btn.similar-quote");
const choicesList = document.querySelector(".choices");
const description = document.querySelector(".heading");
const helperText = document.querySelector(".helper-text");
const quoteControls = document.querySelector(".quote-controls");
const copyrightText = document.querySelector(".copyright");
const quoteItem = document.querySelector(".quote");
const heroSection = document.querySelector('.hero');
const quoteText = document.querySelector(".quote-item");
const quoteAuthor = document.querySelector(".quote-author");
const categoryText = document.querySelector('.category');
const header = document.querySelector('.header');
let category;
let currentCategoryIndex;

function getQuote(similar) {
    const availableCategories = ["night", "life", "self", "deep", "nature"];
    let inputText = document.querySelector(".category-input") || document.querySelector(".category-input-white");

    if (similar) {
        category = availableCategories[currentCategoryIndex];
    } else {
        category = inputText.value.toLowerCase();
    }

    if (availableCategories.includes(category)) {
        currentCategoryIndex = availableCategories.indexOf(category);
        similarCategory = selectRandomQuote(category);
        choiceDescriptionRemoval();
        showGenerateSimilarButton();
        removeHelperText();
        fixQuoteCopyrightPosition();
    } else {
        helperText.classList.remove("invisible");
    }
    inputText.value = "";
}

function choiceDescriptionRemoval() {
    choicesList.classList.add("invisible");
    description.classList.add("invisible");
}

function showGenerateSimilarButton() {
    getSimilarQuoteButton.classList.remove("invisible");
}

function removeHelperText() {
    helperText.classList.add("invisible");
}

function fixQuoteCopyrightPosition() {
    quoteControls.classList.add("fixed-bottom-right");
    copyrightText.classList.add("fixed-bottom-left");
}

function showQuote() {
    quoteItem.classList.remove("invisible");
}

function selectRandomQuote(category) {
    const randomNumber = Math.floor(Math.random() * 5) + 1;

    switch (category) {
        case "night":
            quoteText.textContent = `"${night[randomNumber][0]}"`;
            quoteAuthor.textContent = `- ${night[randomNumber][1]}`;
            changeQuoteImageAndText("night");
            
            break;
        case "life":
            quoteText.textContent = `"${life[randomNumber][0]}"`;
            quoteAuthor.textContent = `- ${life[randomNumber][1]}`;
            changeQuoteImageAndText("life");
            break;
        case "deep":
            quoteText.textContent = `"${deep[randomNumber][0]}"`;
            quoteAuthor.textContent = `- ${deep[randomNumber][1]}`;
            changeQuoteImageAndText("deep");
            break;
        case "self":
            quoteText.textContent = `"${self[randomNumber][0]}"`;
            quoteAuthor.textContent = `- ${self[randomNumber][1]}`;
            changeQuoteImageAndText("self");
            break;
        case "nature":
            quoteText.textContent = `"${nature[randomNumber][0]}"`;
            quoteAuthor.textContent = `- ${nature[randomNumber][1]}`;
            changeQuoteImageAndText("nature");
            break;
        default:
            console.log("Error " + category + " unavailable");
    }
    showQuote();
}

getQuoteButton.addEventListener(
    "click",
    getQuote.bind(null, (similar = false))
);
getSimilarQuoteButton.addEventListener(
    "click",
    getQuote.bind(null, (similar = true))
);

function changeQuoteImageAndText(category) {

    const categoryInput = document.querySelector('.category-input') || document.querySelector('.category-input-white') ;
    switch (category) {
        case "nature":
            heroSection.style.backgroundImage = "url('/images/nature-bg.jpeg')";
            heroSection.style.backgroundSize = "contain";
            quoteText.classList.add('quote-white-text');
            quoteAuthor.classList.add('quote-white-text');
            copyrightText.classList.add('quote-white-text');
            categoryText.classList.add('quote-white-text');
            getQuoteButton.classList.remove('btn');
            getQuoteButton.classList.add('button-nature-quote');
            getSimilarQuoteButton.classList.remove('btn');
            getSimilarQuoteButton.classList.add('button-nature-quote');
            categoryInput.classList.remove('category-input');
            categoryInput.classList.add('category-input-white');
            break;
        case "night":
            heroSection.style.backgroundImage = "url('/images/night-bg.jpeg')";
            heroSection.style.backgroundSize = "contain";
            quoteText.classList.add('quote-white-text');
            quoteAuthor.classList.add('quote-white-text');
            copyrightText.classList.add('quote-white-text');
            categoryText.classList.add('quote-white-text');
            getQuoteButton.classList.remove('btn');
            getQuoteButton.classList.add('button-nature-quote');
            getSimilarQuoteButton.classList.remove('btn');
            getSimilarQuoteButton.classList.add('button-nature-quote');
            categoryInput.classList.remove('category-input');
            categoryInput.classList.add('category-input-white');
            break;
        case "life":
            heroSection.style.backgroundImage = "url('/images/life-bg.jpeg')";
            heroSection.style.backgroundSize = "contain";
            quoteText.classList.add('quote-white-text');
            quoteAuthor.classList.add('quote-white-text');
            copyrightText.classList.add('quote-white-text');
            categoryText.classList.add('quote-white-text');
            getQuoteButton.classList.remove('btn');
            getQuoteButton.classList.add('button-nature-quote');
            getSimilarQuoteButton.classList.remove('btn');
            getSimilarQuoteButton.classList.add('button-nature-quote');
            categoryInput.classList.remove('category-input');
            categoryInput.classList.add('category-input-white');
            break;
        case "self":
            heroSection.style.backgroundImage = "url('/images/self-bg.jpeg')";
            heroSection.style.backgroundSize = "contain";
            quoteText.classList.add('quote-white-text');
            quoteAuthor.classList.add('quote-white-text');
            copyrightText.classList.add('quote-white-text');
            categoryText.classList.add('quote-white-text');
            getQuoteButton.classList.remove('btn');
            getQuoteButton.classList.add('button-nature-quote');
            getSimilarQuoteButton.classList.remove('btn');
            getSimilarQuoteButton.classList.add('button-nature-quote');
            categoryInput.classList.remove('category-input');
            categoryInput.classList.add('category-input-white');
            break;
        case "deep":    
            heroSection.style.backgroundImage = "url('/images/deep-bg.jpeg')";
            heroSection.style.backgroundSize = "contain";
            quoteText.classList.add('quote-white-text');
            quoteAuthor.classList.add('quote-white-text');
            copyrightText.classList.add('quote-white-text');
            categoryText.classList.add('quote-white-text');
            getQuoteButton.classList.remove('btn');
            getQuoteButton.classList.add('button-nature-quote');
            getSimilarQuoteButton.classList.remove('btn');
            getSimilarQuoteButton.classList.add('button-nature-quote');
            categoryInput.classList.remove('category-input');
            categoryInput.classList.add('category-input-white');
            break; 
        default : console.log("Category not found");
    }   
    header.style.display = 'none';
    heroSection.style.top = '0';
}
