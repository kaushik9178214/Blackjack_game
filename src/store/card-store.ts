import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { card, cardValue } from "../types";
import { router } from "../router/intex";

export const useCardStore = defineStore("card", () => {
  const cardValues: cardValue[] = [
    { name: "A", value: 1 },
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
  const winner = ref<string>("");
  const cardTypes: string[] = ["♥", "♦", "♣", "♠"];
  const dealerHiddenCard = ref<card | null>(null);
  const cards = ref<card[]>([]);
  const cardsOfUser = ref<card[]>([]);
  const cardsOfDealer = ref<card[]>([]);
  const playerPoints = ref<number>(0);
  const dealerPoints = ref<number>(0);
  const displayedDealerPoints = computed(() => {
    if (winner.value) {
      // show full points after round
      return dealerPoints.value;
    } else {
      // during game, sum only visible cards
      return cardsOfDealer.value.reduce((sum, c) => sum + givePoints(c, 0), 0);
    }
  });
  const turn = ref<number>(1);
  const modalController = ref<boolean>(false);
  const playerName = ref<string>("Player");
  const nameError = ref<string>("");
  const bidError = ref<string>("");
  const walletMoney = ref<number>(1000);
  const bidAmount = ref<number>(0);
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
  cards.value = deckGenerator();
  const randomCardGenerator = (): card | null => {
    if (cards.value.length === 0) return null;

    const index = Math.floor(Math.random() * cards.value.length);
    const [c] = cards.value.splice(index, 1); // splice returns card[]; could be empty
    return c || null; // safely return null if undefined
  };
  const givePoints = (card: card, value: number): number => {
    let points: number = 0;
    if (card.value.name.includes("A")) {
      if (value + 11 <= 21) {
        points = 11;
      } else {
        points = 1;
      }
    } else {
      points = card.value.value;
    }
    return points;
  };

  const giveCardToPlayer = (): void => {
    const drawn = randomCardGenerator();
    if (!drawn) return; // deck empty guard
    cardsOfUser.value.push(drawn);

    playerPoints.value += givePoints(drawn, playerPoints.value);
  };
  const giveCardToDealer = (hidden = false): void => {
    const drawn = randomCardGenerator();
    if (!drawn) return;

    if (hidden && !dealerHiddenCard.value) {
      dealerHiddenCard.value = drawn; // only store hidden card here
    } else {
      cardsOfDealer.value.push(drawn); // only push visible cards
      dealerPoints.value += givePoints(drawn, dealerPoints.value);
    }
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
    if (validateBidAmount()) {
      router.push("/GamePage");

      walletMoney.value -= bidAmount.value;
      giveCardToPlayer();
      giveCardToPlayer();
      giveCardToDealer(true);
      giveCardToDealer();
      
      console.log(cardsOfDealer.value);
      console.log(cardsOfUser.value);
      console.log(dealerHiddenCard.value);

      judge();
    } else {
      bidAmount.value = 0;
    }
  };
  const hit = (): void => {
    if (turn.value !== 1) return; // only allow player to hit
    giveCardToPlayer();
    judge();
  };
  const stand = (): void => {
    turn.value = 2;

    if (dealerHiddenCard.value) {
      dealerPoints.value += givePoints(
        dealerHiddenCard.value,
        dealerPoints.value
      );
      cardsOfDealer.value.push(dealerHiddenCard.value);
      dealerHiddenCard.value = null;
    }

    while (dealerPoints.value < 17) {
      giveCardToDealer();
    }

    judge();
  };

  const judge = (): void => {
    if (turn.value == 1) {
      if (playerPoints.value == 21 || dealerPoints.value > 21) {
        winner.value = "Player wins";
        walletMoney.value += 2 * bidAmount.value;
        modalController.value = true;
      } else if (playerPoints.value > 21 || dealerPoints.value == 21) {
        winner.value = "Dealer wins";
        modalController.value = true;
      }
      else if(playerPoints.value==21&&dealerPoints.value==21){
        winner.value="Match Drawn"
        walletMoney.value +=  bidAmount.value;
      }
    } else {
      if (
        (playerPoints.value <= 21 && playerPoints.value > dealerPoints.value) ||
        dealerPoints.value > 21
      ) {
        winner.value = "Player wins";
        walletMoney.value += 2 * bidAmount.value;
        modalController.value = true;
      } else if (
        playerPoints.value > 21 ||
        (dealerPoints.value <= 21 && playerPoints.value < dealerPoints.value)
      ) {
        winner.value = "Dealer wins";
        modalController.value = true;
      }
      else if (playerPoints.value == 21 && dealerPoints.value == 21) {
        winner.value = "Match Drawn";
        walletMoney.value += bidAmount.value;
      }
    }
  };
  const redirectToHome = (): void => {
    winner.value = "";
    playerName.value = "Player";
    dealerPoints.value = 0;
    playerPoints.value = 0;
    turn.value = 1;
    bidAmount.value = 0;

    modalController.value = false;
    walletMoney.value = 1000;
    cardsOfUser.value = [];
    cardsOfDealer.value = [];
    dealerHiddenCard.value = null;
    router.push("/");
  };
  const newRound = () => {
    if (cards.value.length < 10) {
      cards.value = deckGenerator();
    }
    dealerPoints.value = 0;
    playerPoints.value = 0;
    turn.value = 1;
    winner.value = "";
    bidAmount.value = 0;
    modalController.value = false;
    dealerHiddenCard.value = null;
    cardsOfUser.value = [];
    cardsOfDealer.value = [];
    router.push("/BetPage");
  };

  return {
    nameError,
    playerName,
    validatePlayer,
    modalController,
    deckGenerator,
    walletMoney,
    bidAmount,
    bidError,
    startGame,
    randomCardGenerator,
    cardsOfUser,
    cardsOfDealer,
    hit,
    stand,
    dealerPoints,
    playerPoints,
    displayedDealerPoints,
    winner,
    redirectToHome,
    newRound,
    dealerHiddenCard,
  };
});
