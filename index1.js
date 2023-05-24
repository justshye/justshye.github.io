let firstCard = undefined;
let secondCard = undefined;
let moves = 0;
let pairsLeft = 3;
let pairsMatched = 0;

const fetchPokemonSprites = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200");
    const data = await response.json();
    const pokemonSprites = data.results.map((pokemon) => pokemon.sprites.front_default);
    return pokemonSprites;
};

const updateMovesCounter = () => {
    moves++;
    $("#moves_counter").text(`Moves: ${moves}`);
};

const updatePairsLeftCounter = () => {
    pairsLeft--;
    $("#pairs_left_counter").text(`Pairs Left: ${pairsLeft}`);
};

const updatePairsMatchedCounter = () => {
    pairsMatched++;
    $("#pairs_matched_counter").text(`Pairs Matched: ${pairsMatched}`);
};

const setup = async () => {
    const totalPairs = 3; // Set the total number of pairs
    const totalCards = totalPairs * 2;
  
    const pokemonSprites = await fetchPokemonSprites();
    const sprites = [...pokemonSprites, ...pokemonSprites];
  
    const gameGrid = $("#game_grid");
    gameGrid.empty();
  
    sprites.forEach((sprite, index) => {
      const card = $("<div>").addClass("card");
      const frontFace = $("<img>")
        .addClass("front_face")
        .attr("src", sprite)
        .attr("id", `img${index + 1}`);
      const backFace = $("<img>").addClass("back_face").attr("src", "back.webp");
  
      card.append(frontFace, backFace);
      gameGrid.append(card);
    });
  
    let flippedCards = [];
  
    $(".card").on("click", function () {
      if (flippedCards.length < 2 && !$(this).hasClass("flip")) {
        $(this).addClass("flip");
        flippedCards.push($(this));
  
        if (flippedCards.length === 2) {
          setTimeout(() => {
            if (
              flippedCards[0].find(".front_face").attr("src") ===
              flippedCards[1].find(".front_face").attr("src")
            ) {
              flippedCards.forEach((card) => card.off("click"));
              flippedCards = [];
              updatePairsMatchedCounter();
              if (pairsMatched === totalPairs) {
                alert("Congratulations! You've matched all pairs.");
              }
            } else {
              flippedCards.forEach((card) => card.removeClass("flip"));
              flippedCards = [];
            }
          }, 1000);
        }
      }
    });
  };
  
  
  

$(document).ready(() => {
    $("#start_button").on("click", setup);

    $("#reset_button").on("click", () => {
        firstCard = undefined;
        secondCard = undefined;
        moves = 0;
        pairsLeft = 3;
        pairsMatched = 0;
        $("#moves_counter").text("Moves: 0");
        $("#pairs_left_counter").text("Pairs Left: 3");
        $("#pairs_matched_counter").text("Pairs Matched: 0");
        $(".card").removeClass("flip");
    });

    $("#dark_theme_button").on("click", () => {
        $("body").addClass("dark-theme");
    });

    $("#light_theme_button").on("click", () => {
        $("body").removeClass("dark-theme");
    });
});
