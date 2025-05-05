// Importing routing components
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// Import pages
import App from "../App.jsx";
import Home from "../pages/Home/Home.jsx";
import GamesList from "../pages/GamesList/GamesList.jsx";
import GameDetails from "../pages/GameDetails/GameDetails.jsx";
import Cart from "../pages/Cart/Cart.jsx";
import Checkout from "../pages/Checkout/Checkout.jsx";
import OrderConfirmation from "../pages/OrderConfirmation/OrderConfirmation.jsx";
import SignUp from "../pages/SignUp/SignUp.jsx";
import SignIn from "../pages/SignIn/SignIn.jsx";
import VerifyEmail from "../pages/VerifyEmail/VerifyEmail.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import Contact from "../pages/Contact/Contact.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/games" element={<GamesList />} />
      <Route path="/games/:id" element={<GameDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
