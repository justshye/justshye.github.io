const setup = () => {
    let firstCard = undefined;
    let secondCard = undefined;
    let canFlip = false;
    let clickCount = 0;
    let pairsMatched = 0;
    let pairsLeft = 0;
    let timerInterval = null;
    const totalPairs = $(".card").length / 2;

    $("#start-button").on("click", startGame);
    $("#reset-button").on("click", resetGame);

    $(".card").on(("click"), function () {
        if (!canFlip) return;

        $(this).toggleClass("flip");
        clickCount++;

        if (!firstCard)
            firstCard = $(this).find(".front_face")[0];
        else {
            secondCard = $(this).find(".front_face")[0];
            console.log(firstCard, secondCard);
            if (firstCard.src == secondCard.src) {
                console.log("match");
                $(`#${firstCard.id}`).parent().off("click");
                $(`#${secondCard.id}`).parent().off("click");
                resetCards();
                pairsMatched++;
                pairsLeft--;
                updateGameInfo();
                checkVictory();
            } else {
                console.log("no match");
                canFlip = false;
                setTimeout(() => {
                    $(`#${firstCard.id}`).parent().toggleClass("flip");
                    $(`#${secondCard.id}`).parent().toggleClass("flip");
                    resetCards();
                }, 1000);
            }
        }

        updateGameInfo();
    });

    function startGame() {
        resetGame();
        canFlip = true;
        pairsLeft = totalPairs;
        updateGameInfo();
        startTimer(60); // 60 seconds timer
    }

    function resetGame() {
        stopTimer();
        resetCards();
        clickCount = 0;
        pairsMatched = 0;
        pairsLeft = 0;
        canFlip = false;
        updateGameInfo();
        $(".card").removeClass("flip").on("click");

        // Remove the victory message if it exists
        $(".victory-message").remove();
    }


    function resetCards() {
        firstCard = undefined;
        secondCard = undefined;
        canFlip = true;
    }

    function checkVictory() {
        if (pairsMatched === totalPairs) {
            displayVictoryMessage();
            stopTimer();
        }
    }

    function updateGameInfo() {
        $("#click-count").text(`Clicks: ${clickCount}`);
        $("#pairs-left").text(`Pairs Left: ${pairsLeft}`);
        $("#pairs-matched").text(`Pairs Matched: ${pairsMatched}`);
        $("#total-pairs").text(`Total Pairs: ${totalPairs}`);
    }

    function displayVictoryMessage() {
        const victoryMessage = $("<div>")
            .addClass("victory-message")
            .text("Congratulations! You found all the pairs!");

        $("body").append(victoryMessage);
    }

    function startTimer(duration) {
        let timer = duration * 1000; // Convert seconds to milliseconds
        let minutes, seconds;

        timerInterval = setInterval(function () {
            minutes = Math.floor((timer / (1000 * 60)) % 60);
            seconds = Math.floor((timer / 1000) % 60);

            minutes = minutes.toString().padStart(2, "0");
            seconds = seconds.toString().padStart(2, "0");

            $("#time-left").text(`Time Left: ${minutes}:${seconds}`);

            if (timer <= 0) {
                clearInterval(timerInterval);
                $("#time-left").text("Time's up!");
                canFlip = false;
            }

            timer -= 1000;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    $("#light-theme-button").on("click", function () {
        $("body").removeClass("dark-theme");
    });

    $("#dark-theme-button").on("click", function () {
        $("body").addClass("dark-theme");
    });

};

$(document).ready(setup);
