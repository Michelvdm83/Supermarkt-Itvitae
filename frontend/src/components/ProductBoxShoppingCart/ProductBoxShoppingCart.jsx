import { useNavigate } from "react-router-dom";

export default function ProductBoxShoppingCart({ product }) {
  const navigate = useNavigate();

  const NLEuro = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  });

  const deleteProductFromCart = () => {};

  return (
    <>
      <div className="min-w-fit border-2 rounded-2xl shadow-xl h-32 flex justify-around">
        <button
          onClick={() => navigate("/products/" + product.productName)}
          className="my-4 ml-8 w-1/3 flex flex-col justify-center items-start"
        >
          <h3 className="text-lg font-medium m-0  mr-0">
            {product.productName}
          </h3>
        </button>
        <div className="my-4 ml-8 flex flex-col justify-center items-start">
          <p className="text-nn-green">{product.quantity} x</p>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-nn-pink font-bold text-xl">
            {NLEuro.format(product.totalPrice)}
          </p>
        </div>
        <button className="flex justify-center items-center">
          <p onClick={deleteProductFromCart}>verwijderen</p>
        </button>
      </div>
    </>
  );
}
