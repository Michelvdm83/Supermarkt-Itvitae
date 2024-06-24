import { useNavigate } from "react-router-dom";

export default function SmallProductBox({ product }) {
  const navigate = useNavigate();

  function getPrice() {
    if (product.salesPrice != null) {
      return (
        <>
          <p className="text-nn-pink font-bold text-xl">
            {NLEuro.format(product.salesPrice)}
          </p>
          <p className="line-through">{NLEuro.format(product.price)}</p>
        </>
      );
    } else {
      return (
        <>
          <p className="font-medium">{NLEuro.format(product.price)}</p>
        </>
      );
    }
  }

  const NLEuro = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <button onClick={() => navigate("/products/" + product.name)}>
      <div className="flex w-56 h-40 flex-col items-center border-2 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center ml-4 my-4">
          <h3 className="text-lg font-medium">{product.name}</h3>
          <p>{product.description}</p>
        </div>
        <div className="mb-2 mr-2 flex flex-col justify-center items-center">
          {getPrice()}
        </div>
      </div>
    </button>
  );
}
