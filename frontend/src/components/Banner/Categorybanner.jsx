export default function CategoryBanner({ bannerText }) {
  return (
    <div className="border-nn-green text-nn-green mb-2 text-l font-extrabold mt-12 border-4 rounded-2xl shadow-xl flex h-10 justify-center items-center">
      <h1 className="mr-2">Categorie -</h1>
      <h1 className="lowercase">{bannerText}</h1>
    </div>
  );
}
