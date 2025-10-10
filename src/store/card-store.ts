import { defineStore } from "pinia";
import { ref } from "vue";
import type { cardValue } from "../types";

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

  const cardTypes: string[] = ["Club", "Spade", "Diamond", "Heart"];
  const index = ref<number>(-1);
  const cards = ref<cardValue[]>([]);
  const cardsOfUser = ref<cardValue[]>([]);
  const cardsOfDealer = ref<cardValue[]>([]);
  const playerPoints = ref<number>(0);
  const dealerPoints = ref<number>(0);
  // Generate the full deck
  for (let i = 0; i < cardValues.length; i++) {
    for (let j = 0; j < cardTypes.length; j++) {
      // cards.value.push(cardValues[i]!.name + " " + cardTypes[j]!);
      cards.value.push({
        name: cardValues[i]!.name + " " + cardTypes[j]!,
        value: cardValues[i]!.value,
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
    console.log(playerPoints.value);
  };
  const giveCardToDealer = (): void => {
    randomCardGenerator();
    cardsOfDealer.value.push(cards.value[index.value]!);
    dealerPoints.value += givePoints(
      cards.value[index.value]!,
      dealerPoints.value
    );
    cards.value.splice(index.value, 1);
    index.value = -1;
    console.log(dealerPoints.value);
  };
  const givePoints = (card: cardValue, value: number): number => {
    let points: number = 0;
    if (card.name.includes("A")) {
      if (value + 11 <= 21) {
        points = 11;
      } else {
        points = 1;
      }
    } else {
      points = card.value;
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
      walletMoney.value -= bidAmount.value;
      modalToggle();
      giveCardToPlayer();
      giveCardToPlayer();
      giveCardToDealer();
      giveCardToDealer();
      winner();
    }
  };
  const hit = (): void => {
    winner();
  };
  const stand = (): void => {
    if (turn.value == 0) {
    } else {
      winner();
    }
  };
  const winner = (): void => {
    if (playerPoints.value == 21 && dealerPoints.value < 21) {
      console.log("player wins");
    } else if (dealerPoints.value == 21 && playerPoints.value) {
      console.log("Dealer wins");
    } else {
      console.log("game continues");
    }
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
  };
});
