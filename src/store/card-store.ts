import { defineStore } from "pinia";
import { ref } from "vue";
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
  // const cardTypes: string[] = ["Club", "Spade", "Diamond", "Heart"];
  const cardTypes: string[] = ["♥", "♦", "♣", "♠"];
  const index = ref<number>(-1);
  const cards = ref<card[]>([]);
  const cardsOfUser = ref<card[]>([]);
  const cardsOfDealer = ref<card[]>([]);
  const playerPoints = ref<number>(0);
  const dealerPoints = ref<number>(0);
  const displayedDealerPoints = ref<number>(0);
  // Generate the full deck
  for (let i = 0; i < cardValues.length; i++) {
    for (let j = 0; j < cardTypes.length; j++) {
      // cards.value.push(cardValues[i]!.name + " " + cardTypes[j]!);
      cards.value.push({
        // name: cardValues[i]!.name + " " + cardTypes[j]!,
        // value: cardValues[i]!.value,
        value: { name: cardValues[i]!.name, value: cardValues[i]!.value },
        symbol: cardTypes[j]!,
      });
    }
  }
  const randomCardGenerator = (): void => {
    index.value = Math.floor(Math.random() * cards.value.length + 1);
  };
  const giveCardToPlayer = (): void => {
    randomCardGenerator();
    cardsOfUser.value.push(cards.value[index.value]!);

    playerPoints.value += givePoints(
      cards.value[index.value]!,
      playerPoints.value
    );
    cards.value.splice(index.value, 1);
    index.value = -1;
  };
  const giveCardToDealer = (): void => {
    randomCardGenerator();
    cardsOfDealer.value.push(cards.value[index.value]!);
    dealerPoints.value += givePoints(
      cards.value[index.value]!,
      dealerPoints.value
    );
    displayedDealerPoints.value =
      dealerPoints.value -
      givePoints(cards.value[index.value]!, dealerPoints.value);
    cards.value.splice(index.value, 1);
    index.value = -1;
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
      points = card.value.value
    }
    return points;
  };
  console.log(cards.value);
  const turn = ref<number>(1);
  const modalController = ref<boolean>(false);
  const playerName = ref<string>("");
  const nameError = ref<string>("");
  const bidError = ref<string>("");
  const walletMoney = ref<number>(1000);
  const bidAmount = ref<number>(0);
  const validatePlayer = (): boolean => {
    nameError.value = "";
    if (!playerName.value.trim()) {
      nameError.value = "Name cannot be empty";
      return false;
    }
    return true;
  };
  const modalToggle = (): void => {
    modalController.value = !modalController.value;
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
      modalToggle();
      giveCardToPlayer();
      giveCardToPlayer();
      giveCardToDealer();
      giveCardToDealer();
      judge();
    } else {
      bidAmount.value = 0;
    }
  };
  const hit = (): void => {
    if (turn.value == 1) {
      giveCardToPlayer();
      judge();
    } else {
      // if (dealerPoints.value <= 17) {
      //   giveCardToDealer();
      //   winner();
      // }
      while (dealerPoints.value <= 17) {
        giveCardToDealer();
      }
      judge();
    }
  };
  const stand = (): void => {
    turn.value = 2;

    hit();
  };
  const judge = (): void => {
    if (turn.value == 1) {
      if (playerPoints.value == 21 || dealerPoints.value > 21) {
        winner.value = "Player wins";
        walletMoney.value += bidAmount.value;
      } else if (playerPoints.value > 21 || dealerPoints.value == 21) {
        winner.value = "Dealer wins";
        walletMoney.value -= bidAmount.value;
      }
    } else {
      if (
        (playerPoints.value <= 21 && playerPoints.value > dealerPoints.value) ||
        dealerPoints.value > 21
      ) {
        winner.value = "Player wins";
        walletMoney.value += bidAmount.value;
      } else if (
        playerPoints.value > 21 ||
        (dealerPoints.value <= 21 && playerPoints.value < dealerPoints.value)
      ) {
        winner.value = "Dealer wins";
        walletMoney.value -= bidAmount.value;
      }
    }
  };
  const redirectToHome = (): void => {
    winner.value = "";
    playerName.value = "";
    dealerPoints.value = 0;
    playerPoints.value = 0;
    turn.value = 1;
    bidAmount.value = 0;
    modalToggle();
    walletMoney.value=1000
    cardsOfUser.value = [];
    cardsOfDealer.value = [];
    router.push("/");
  };

  return {
    nameError,
    playerName,
    validatePlayer,
    modalController,
    modalToggle,
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
    turn,
  };
});
