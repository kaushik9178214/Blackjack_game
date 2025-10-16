import { createWebHistory, createRouter } from "vue-router";
import GameScreen from "../screens/GameScreen.vue";
import WelcomePageScreen from "../screens/WelcomePageScreen.vue";
import BetScreen from "../screens/BetScreen.vue";

const routes=[
    {path:'/',name:"signUp",component:WelcomePageScreen},
    {path:'/BetPage',name:"bet",component:BetScreen},
    {path:'/GamePage',name:"game",component:GameScreen}
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  
});
let isInitialLoad = true;

router.beforeEach((to, _, next) => {
  if (isInitialLoad) {
    isInitialLoad = false;
    // If user reloads or directly enters any route other than '/'
    if (to.path != "/") {
      return next("/");
    }
  }
  next();
});