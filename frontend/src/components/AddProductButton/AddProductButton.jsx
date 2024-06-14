export default function AddProductButton({ product }) {
  let buttonCSS =
    "text-white rounded-2xl font-extrabold h-10 w-12 mr-2 mt-16 flex justify-center items-center ";

  if (product.salesPrice != null) {
    buttonCSS += "bg-nn-pink";
  } else {
    buttonCSS += "bg-nn-green";
  }

  return <button className={buttonCSS}>+</button>;
}
