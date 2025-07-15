import {signUpRoute} from "./SignUpRoute.js";
import {loginRoute} from "./LoginRoute.js";
import {updateUserInfoRoute} from "./updateUserInfoRoute.js";
import {addTripRoutes} from "./createTripRoute.js";
import {tripsRoute} from "./tripsRoute.js";
import {getTripRoutes} from "./getTripRoutes.js";


export const routes = [signUpRoute, loginRoute, updateUserInfoRoute,addTripRoutes, tripsRoute, getTripRoutes];