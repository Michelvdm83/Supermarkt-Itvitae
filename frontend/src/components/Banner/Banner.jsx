export default function Banner({ bannerText }) {
  return (
    <div className="border-nn-orange text-nn-orange mt-12 text-xl border-4 rounded-2xl shadow-xl font-extrabold flex h-20 justify-center items-center">
      <h1>{bannerText}</h1>
    </div>
  );
}
