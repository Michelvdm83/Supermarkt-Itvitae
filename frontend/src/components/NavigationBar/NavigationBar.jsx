import NavigationBarItem from "../NavigationBarItem/NavigationBarItem";
import SearchBar from "../SearchBar/SearchBar";

export default function NavigationBar({ setSearchResults }) {
  return (
    <div className="border-nn-orange h-28 w-screen flex border-4 rounded-2xl shadow-xl justify-around items-center content-center">
      <NavigationBarItem title="Home" page="home" />
      <NavigationBarItem title="Producten" page="products" />
      <NavigationBarItem title="Aanbiedingen" page="sales" />
      <SearchBar setSearchResults={setSearchResults} />
      {/*hier logica inloggen/registreren of persoonlijke pagina + 1 of 2 knoppen*/}
      {sessionStorage.getItem("JWT") ? (
        <NavigationBarItem title="Account" page="account" />
      ) : (
        <NavigationBarItem title="Inloggen/Registreren" page="login" />
      )}
      <NavigationBarItem title="Winkelmandje" page="shoppingcart" />
    </div>
  );
}
