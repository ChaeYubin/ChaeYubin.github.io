const quote = document.querySelector("#quote span:first-child");

const quotesUrl = `https://api.adviceslip.com/advice`;
fetch(quotesUrl)
  .then((response) => response.json())
  .then((res) => {
    quote.innerText = res.slip.advice;
  });
