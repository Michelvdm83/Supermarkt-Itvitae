import SearchResult from "../../components/SearchResult/SearchResult";

export default function ProductSearch( { searchResults } ) {
    return(
        <div>
            {searchResults.map((product) => <SearchResult key={product.name} product={product}/>)}
        </div>
    );
}