import NavigationBarItem from "../NavigationBarItem/NavigationBarItem";
import SearchBar from "../SearchBar/SearchBar";

export default function NavigationBar() {
  return (
    <div className="border-nn-orange h-28 w-screen flex border-4 rounded-2xl shadow-xl justify-around items-center content-center">
      <NavigationBarItem title="Home" page="home" />
      <NavigationBarItem title="Producten" page="products" />
      <NavigationBarItem title="Aanbiedingen" page="sales" />
      <SearchBar />
      {/*hier logica inloggen/registreren of persoonlijke pagina + 1 of 2 knoppen*/}
      <NavigationBarItem title="Inloggen/Registreren" page="login" />
      <NavigationBarItem title="Winkelmandje" page="shoppingcart" />
    </div>
  );
}
