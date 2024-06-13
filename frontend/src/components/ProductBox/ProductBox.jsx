import AddProductButton from "../AddProductButton/AddProductButton";

//Moet nog routen naar productpagina
export default function ProductBox({ product }) {
  function getPrice() {
    if (product.salesPrice !== null) {
      return (
        <div className="mb-2 gap-2 mt-16 w-12 flex justify-center items-center">
          <p className="text-nn-pink font-bold">€{product.salesPrice}</p>
          <p className="line-through">€{product.price}</p>
        </div>
      );
    } else {
      return;
      <div>
        <p>€{product.price}</p>;
      </div>;
    }
  }

  return (
    <div className="border-nn-pink min-w-fit border-2 rounded-2xl shadow-xl h-32 gap-8 flex">
      {/* <img
        className="w-28 h-28 ml-4 mt-2"
        src="src\images\img_not_found.png"
      ></img> */}
      <div className="my-4 ml-8 w-1/2 flex flex-col justify-center">
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p>{product.description}</p>
      </div>
      {getPrice()}
      <div>
        <AddProductButton />
      </div>
    </div>
  );
}
