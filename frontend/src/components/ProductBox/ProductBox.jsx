import { useNavigate } from "react-router-dom";

export default function ProductBox({ product }) {
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
      <div className=" border-2 rounded-2xl shadow-xl h-32 gap-8 flex">
        <div className="my-4 ml-8 w-1/2 flex flex-col justify-center items-start">
          <h3 className="text-lg font-medium m-0  mr-0">{product.name}</h3>
          <p>{product.description}</p>
        </div>
        <div className="mb-2 gap-2 mt-16 w-12 flex justify-end items-center">
          {getPrice()}
        </div>
      </div>
    </button>
  );
}
