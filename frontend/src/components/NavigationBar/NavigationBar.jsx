import NavigationBarItem from "../NavigationBarItem/NavigationBarItem";
import SearchBar from "../SearchBar/SearchBar";
import "./NavigationBar.css";

export default function NavigationBar() {
    return (
        <div className="navigation-bar">
            <NavigationBarItem title="Home" page="home"/>
            <NavigationBarItem title="Producten" page="products"/>
            <NavigationBarItem title="Aanbiedingen" page="sales"/>
            <SearchBar/>
            {/*hier logica inloggen/registreren of persoonlijke pagina + 1 of 2 knoppen*/}
            <NavigationBarItem title="Inloggen/Registreren" page="login"/>
            <NavigationBarItem title="Winkelmandje" page="shoppingcart"/>
        </div>
    )
}