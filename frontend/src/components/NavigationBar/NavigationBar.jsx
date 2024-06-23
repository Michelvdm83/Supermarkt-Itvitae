import HomeButton from "../HomeButton/HomeButton";
import NavigationBarItem from "../NavigationBarItem/NavigationBarItem";
import NavigationBarShoppingCart from "../NavigationBarShoppingCart/NavigationBarShoppingCart";
import SearchBar from "../SearchBar/SearchBar";

export default function NavigationBar({ shoppingcartItems, setSearchResults }) {
  return (
    <div className="bg-white flex-wrap min-w-fit inset-y-0 sticky h-28 w-screen flex border-4 rounded-2xl shadow-xl justify-around items-center content-center">
      <HomeButton />
      <NavigationBarItem title="Producten" page="products" />
      <NavigationBarItem title="Aanbiedingen" page="sales" />
      <SearchBar setSearchResults={setSearchResults} />
      {/*hier logica inloggen/registreren of persoonlijke pagina + 1 of 2 knoppen*/}
      {sessionStorage.getItem("JWT") !== null ? (
        <NavigationBarItem title="Account" page="account" />
      ) : (
        <NavigationBarItem title="Inloggen/Registreren" page="login" />
      )}
      {sessionStorage.getItem("ROLE") == "customer" ? (
        <NavigationBarShoppingCart
          shoppingcartItems={shoppingcartItems}
          title="Winkelmandje"
          page="shoppingcart"
        />
      ) : (
        <NavigationBarItem title="Winkelmandje" page="login" />
      )}
    </div>
  );
}
