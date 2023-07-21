const quotes = [
  {
    quote: "명언1",
    author: "저자1",
  },
  {
    quote: "명언2",
    author: "저자2",
  },
  {
    quote: "명언3",
    author: "저자3",
  },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
