export default function SearchResult( { product } ) {
    return (
        <div>
            <div>{product.name}: {product.salesPrice===null? product.price : product.salesPrice}</div>
        </div>
    );
}