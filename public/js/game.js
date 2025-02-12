 
document.getElementById("startGame").addEventListener("click", startGame);

let attempts = 0;
let selectedTiles = [];
let matchedPairs = 0;

function startGame() {
    const difficulty = document.querySelector("input[name='difficulty']:checked").value;
    const pairs = { easy: 4, normal: 8, hard: 16 }[difficulty];
    let numbers = [...Array(pairs).keys(), ...Array(pairs).keys()];
    numbers.sort(() => Math.random() - 0.5);

    const container = document.querySelector(".cells_container");
    container.innerHTML = "";
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.width = `${Math.sqrt(pairs * 2) * 110}px`;

    numbers.forEach((num, index) => {
        const tile = document.createElement("div");
        tile.classList.add("cell", "hidden");
        tile.dataset.index = index;
        tile.dataset.value = num;
        tile.textContent = num;
        tile.addEventListener("click", () => handleTileClick(tile));
        container.appendChild(tile);
    });
}

function handleTileClick(tile) {
    if (!tile.classList.contains("hidden") || selectedTiles.length >= 2) return;

    tile.classList.remove("hidden");
    selectedTiles.push(tile);

    if (selectedTiles.length === 2) {
        attempts++;
        if (selectedTiles[0].dataset.value === selectedTiles[1].dataset.value) {
            matchedPairs++;
            selectedTiles = [];
            if (matchedPairs === document.querySelectorAll(".cell").length / 2) {
                alert(`Game Over! Attempts: ${attempts}`);
            }
        } else {
            setTimeout(() => {
                selectedTiles.forEach(t => t.classList.add("hidden"));
                selectedTiles = [];
            }, 1000);
        }
    }
}
