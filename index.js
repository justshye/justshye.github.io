const setup = () => {
    let firstCard = undefined;
    let secondCard = undefined;
    let canFlip = true; // Add a flag to control flipping of cards
    let pairsFound = 0; // Counter for the number of pairs found
    const totalPairs = $(".card").length / 2; // Calculate the total number of pairs
  
    $(".card").on(("click"), function () {
      // Check if flipping is allowed
      if (!canFlip) return;
  
      $(this).toggleClass("flip");
  
      if (!firstCard)
        firstCard = $(this).find(".front_face")[0];
      else {
        secondCard = $(this).find(".front_face")[0];
        console.log(firstCard, secondCard);
        if (firstCard.src == secondCard.src) {
          console.log("match");
          $(`#${firstCard.id}`).parent().off("click");
          $(`#${secondCard.id}`).parent().off("click");
          resetCards(); // Reset the selected cards
          pairsFound++;
          checkVictory(); // Check if all pairs have been found
        } else {
          console.log("no match");
          canFlip = false; // Disable flipping temporarily
          setTimeout(() => {
            $(`#${firstCard.id}`).parent().toggleClass("flip");
            $(`#${secondCard.id}`).parent().toggleClass("flip");
            resetCards(); // Reset the selected cards
          }, 1000);
        }
      }
    });
  
    // Light Theme button click event
    $("#light-theme").on("click", function () {
      $("body").removeClass("dark-theme").addClass("light-theme");
      $(".card").removeClass("dark-theme").addClass("light-theme");
      $(".theme-button").removeClass("dark-theme").addClass("light-theme");
    });
  
    // Dark Theme button click event
    $("#dark-theme").on("click", function () {
      $("body").removeClass("light-theme").addClass("dark-theme");
      $(".card").removeClass("light-theme").addClass("dark-theme");
      $(".theme-button").removeClass("light-theme").addClass("dark-theme");
    });
  
    // Function to reset the selected cards
    function resetCards() {
      firstCard = undefined;
      secondCard = undefined;
      canFlip = true; // Re-enable flipping
    }
  
    // Function to check if all pairs have been found
    function checkVictory() {
      if (pairsFound === totalPairs) {
        displayVictoryMessage();
      }
    }
  
    // Function to display the victory message
    function displayVictoryMessage() {
      // Create a div element for the message
      const victoryMessage = $("<div>")
        .addClass("victory-message")
        .text("Congratulations! You found all the pairs!");
  
      // Append the message to the body
      $("body").append(victoryMessage);
    }
  };
  
  $(document).ready(setup);
  
  