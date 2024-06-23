import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProductBoxShoppingCart({
  product,
  setProducts,
  cartId,
  getShoppingCart,
}) {
  const navigate = useNavigate();

  const NLEuro = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  });

  const deleteProductFromCart = () => {
    axios
      .patch(
        `http://localhost:8080/api/v1/shoppingcarts`,
        {
          shoppingCartId: cartId,
          shoppingCartProductId: product.uuid,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.sessionStorage.getItem("JWT"),
          },
        }
      )
      .then((response) => {
        setProducts(response.data.shoppingCartProducts);
        getShoppingCart();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="min-w-fit border-2 rounded-2xl shadow-xl h-32 flex justify-around items-center">
        <button
          onClick={() => navigate("/products/" + product.productName)}
          className="my-4 ml-8 w-1/3 flex flex-col justify-center items-start"
        >
          <h3 className="text-lg font-medium m-0  mr-0">
            {product.productName}
          </h3>
        </button>
        <div className="my-4 ml-8 flex flex-col justify-center items-start">
          <p className="font-semibold">{product.quantity}</p>
        </div>
        <div className="flex justify-center items-center">
          <p className="font-semibold text-l">
            {NLEuro.format(product.totalPrice)}
          </p>
        </div>
        <button className="flex justify-center items-center">
          <p
            className=" text-white text-sm font-extrabold bg-nn-pink border-4 border-nn-pink-darker rounded-full size-6 flex justify-center items-center align-middle"
            onClick={deleteProductFromCart}
          >
            X
          </p>
        </button>
      </div>
    </>
  );
}
