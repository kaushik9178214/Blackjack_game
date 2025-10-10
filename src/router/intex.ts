import { createMemoryHistory, createRouter } from "vue-router";
import GameScreen from "../screens/GameScreen.vue";
import WelcomePageScreen from "../screens/WelcomePageScreen.vue";

const routes=[
    {path:'/',name:"signUp",component:WelcomePageScreen},
    {path:'/GamePage',name:"game",component:GameScreen}
]
export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});