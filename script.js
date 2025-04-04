function showRandomQuote() {
    const quotes = [
        "Jackson earned the nickname \"Old Hickory\" because he was said to be as tough and resilient as the wood",
        "Andrew Jackson was a prisoner of war",
        "Andrew Jackson was the adoptive father to two Native American boys",
        "Andrew Jackson challenged Charles Dickinson to a duel by that he won killing him",
        "Jackson opposed the concept of a national bank but his portrait is displayed on the twenty dollar bill.",
        "Jackson is the first U.S. president to survive an assassination attempt.",
        "Jackson was the first U.S. president born in a log cabin",
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteElement = document.getElementById("quote");
    quoteElement.textContent = quotes[randomIndex];
}