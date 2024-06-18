import { useNavigate } from "react-router-dom";

export default function CategoryBox({ name }) {
  const navigate = useNavigate();

  name = name.toLowerCase();
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <>
      <button onClick={() => navigate("/category/" + name)}>
        <div className="min-w-fit border-2 rounded-2xl shadow-xl flex m-2">
          <div className="my-4 mx-8 w-1/2 flex flex-col justify-center items-start">
            <p className="text-lg font-medium m-0  mr-0">{displayName}</p>
          </div>
        </div>
      </button>
    </>
  );
}
