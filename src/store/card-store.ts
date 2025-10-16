import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { card, cardValue } from "../types";
import { router } from "../router";

export const useCardStore = defineStore("card", () => {
  const cardValues: cardValue[] = [
    { name: "A", value: 11 },
    { name: "2", value: 2 },
    { name: "3", value: 3 },
    { name: "4", value: 4 },
    { name: "5", value: 5 },
    { name: "6", value: 6 },
    { name: "7", value: 7 },
    { name: "8", value: 8 },
    { name: "9", value: 9 },
    { name: "10", value: 10 },
    { name: "J", value: 10 },
    { name: "Q", value: 10 },
    { name: "K", value: 10 },
  ];
  const cardTypes: string[] = ["♥", "♦", "♣", "♠"];
  const winner = ref<string>("");

  const cards = ref<card[]>([]);
  const playerCards = ref<card[]>([]);
  const dealerCards = ref<card[]>([]);
  const playerPoints = ref<number>(0);
  const dealerPoints = ref<number>(0);

  const playerName = ref<string>("Player");
  const nameError = ref<string>("");
  const bidError = ref<string>("");
  const walletMoney = ref<number>(1000);
  const bidAmount = ref<number>(0);
  const status = ref<boolean>(false);
  const hitController = ref<boolean>(false);
  const standController = ref<boolean>(false);

  const resetRound = (): void => {
    winner.value = "";
    dealerPoints.value = 0;
    playerPoints.value = 0;
    bidAmount.value = 0;
    playerCards.value = [];
    dealerCards.value = [];
    hitController.value = false;
    standController.value = false;
    status.value = false;
  };

  const deckGenerator = (): card[] => {
    let deck: card[] = [];
    for (let i = 0; i < cardValues.length; i++) {
      for (let j = 0; j < cardTypes.length; j++) {
        deck.push({
          value: { name: cardValues[i]!.name, value: cardValues[i]!.value },
          symbol: cardTypes[j]!,
        });
      }
    }
    return deck;
  };

  const randomCardGenerator = (): card | null => {
    if (cards.value.length === 0) return null;
    const index = Math.floor(Math.random() * cards.value.length);
    const c = cards.value[index]!;
    cards.value.splice(index, 1);
    return c;
  };

  const givePlayerPoints = (cards: card[]): number => {
    let points = 0;
    let aceCount = 0;
    for (let i = 0; i < cards.length; i++) {
      let cardValue = cards[i]?.value.value;
      // Track Aces
      if (cards[i]?.value.name === "A") {
        aceCount++;
        cardValue = 11; // initially treat Ace as 11
      }
      points += cardValue!;
    }
    // Adjust Aces from 11 -> 1 if bust
    while (points > 21 && aceCount > 0) {
      points -= 10; // convert one Ace from 11 to 1
      aceCount--;
    }
    return points;
  };

  watch(
    () => cards.value.length,
    (newLength) => {
      if (newLength < 11) {
        cards.value = deckGenerator();
      }
    }
  );

  const giveDealerPoints = (cards: card[]): number => {
    let points = 0;
    let aceCount = 0;
    for (let i = 0; i < cards.length; i++) {
      let cardValue = cards[i]?.value.value;
      // Track Aces
      if (cards[i]?.value.name === "A") {
        aceCount++;
        cardValue = 11; // initially treat Ace as 11
      }
      points += cardValue!;
    }

    // Adjust Aces from 11 -> 1 if bust
    while (points > 21 && aceCount > 0) {
      points -= 10; // convert one Ace from 11 to 1
      aceCount--;
    }

    return points;
  };

  const giveCardToPlayer = (): void => {
    const drawn = randomCardGenerator();
    if (!drawn) return; // deck empty guard
    playerCards.value.push(drawn);
    playerPoints.value = givePlayerPoints(playerCards.value);
    console.log("player: " + playerPoints.value);
  };

  const giveCardToDealer = (): void => {
    const drawn = randomCardGenerator();
    if (!drawn) return;
    dealerCards.value.push(drawn); // only push visible cards
    dealerPoints.value = giveDealerPoints(dealerCards.value);
    console.log(dealerCards.value);
    console.log("dealer: " + dealerPoints.value);
  };

  const validatePlayer = (): boolean => {
    nameError.value = "";
    if (!playerName.value.trim()) {
      nameError.value = "Name cannot be empty";
      return false;
    }
    return true;
  };

  const validateBidAmount = (): boolean => {
    bidError.value = "";
    if (bidAmount.value > walletMoney.value || bidAmount.value <= 0) {
      bidError.value = "Invalid bid";
      return false;
    }
    return true;
  };

  const startGame = (): void => {
    if (!validateBidAmount()) {
      bidAmount.value = 0;
      return;
    }
    hitController.value = false;
    standController.value = false;
    cards.value = deckGenerator();
    walletMoney.value -= bidAmount.value;
    giveCardToPlayer();
    giveCardToPlayer();
    giveCardToDealer(); // visible
    // giveCardToDealer(); // hidden or revealed later
    if (playerPoints.value == 21) {
      giveCardToDealer();
      hitController.value = true;
      standController.value = true;
      gameOver();
    }
    router.push("/GamePage");
  };

  const redirectToHome = (): void => {
    resetRound();
    playerName.value = "Player";
    walletMoney.value = 1000;
    router.push("/");
  };

  const newRound = () => {
    resetRound();
    router.push("/BetPage");
    console.log("New game");
  };

  const hit = (): void => {
    giveCardToPlayer();
    if (playerPoints.value > 21) {
      giveCardToDealer();
      gameOver(); // Decide immediately on bust or 21
    }
  };

  const stand = (): void => {
    // Dealer keeps hitting until 17 or more
    giveCardToDealer();
    while (dealerPoints.value < 17) {
      giveCardToDealer();
    }

    gameOver();
  };

  const gameOver = (): void => {
    const player = playerPoints.value;
    const dealer = dealerPoints.value;

    // Player busts
    if (player > 21) {
      winner.value = "Player Busts — Dealer Wins!";
      status.value = true;
      return;
    }

    // Dealer busts
    if (dealer > 21) {
      winner.value = "Dealer Busts — Player Wins!";
      walletMoney.value += bidAmount.value * 2;
      status.value = true;
      return;
    }

    if (player == 21) {
      if (dealer == 21) {
        winner.value = "Both Have Blackjack — Draw!";
        walletMoney.value += bidAmount.value; // refund
        status.value = true;
        return;
      }
      winner.value = "Blackjack! Player Wins!";
      walletMoney.value += bidAmount.value * 2;
      status.value = true;
      return;
    }
    // Dealer Blackjack only
    if (dealer === 21) {
      winner.value = "Dealer Has Blackjack!";
      status.value = true;
      return;
    }

    // Compare scores
    if (player === dealer) {
      winner.value = "Match Drawn!";
      status.value = true;
      walletMoney.value += bidAmount.value; // refund
    } else if (player > dealer) {
      winner.value = "Player Wins!";
      walletMoney.value += bidAmount.value * 2;
      status.value = true;
    } else {
      winner.value = "Dealer Wins!";
      status.value = true;
    }
  };

  return {
    nameError,
    playerName,
    validatePlayer,
    deckGenerator,
    walletMoney,
    bidAmount,
    bidError,
    startGame,
    randomCardGenerator,
    cardsOfUser: playerCards,
    cardsOfDealer: dealerCards,
    hit,
    stand,
    dealerPoints,
    playerPoints,
    status,
    winner,
    redirectToHome,
    newRound,
    hitController,
    standController,
  };
});
