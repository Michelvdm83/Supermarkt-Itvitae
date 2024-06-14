import Banner from "../../components/Banner/Banner";
import ProductBox from "../../components/ProductBox/ProductBox";
import SearchResult from "../../components/SearchResult/SearchResult";

export default function ProductSearch({ searchResults }) {
  return (
    <div className="w-1/3 flex flex-col content-center justify-center">
      <Banner bannerText="Zoekresultaten" />
      <ul className="mt-12 flex flex-col gap-4">
        {searchResults.map((product) => (
          <ProductBox key={product.name} product={product} />
        ))}
      </ul>
    </div>
  );
}
