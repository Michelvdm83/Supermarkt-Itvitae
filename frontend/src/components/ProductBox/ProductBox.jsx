import AddProductButton from "../AddProductButton/AddProductButton";

export default function ProductBox({ product }) {
  return (
    <div className="border-nn-orange h-32 gap-8 flex border-2 rounded-2xl shadow-xl">
      {/* <img
        className="border-4 w-28 h-28 ml-4 mt-2"
        src="src\images\img_not_found.png"
      ></img> */}
      <div className="mt-4 mb-2 ml-8 w-1/2 flex flex-col justify-center">
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p>{product.description}</p>
      </div>
      <div className="mb-2 mt-16 flex  w-12 justify-center items-center">
        <p>€{product.salesPrice}</p>
      </div>
      <div>
        <AddProductButton />
      </div>
    </div>
  );
}
