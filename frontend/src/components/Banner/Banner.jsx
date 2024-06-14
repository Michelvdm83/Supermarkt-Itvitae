export default function Banner({ bannerText }) {
  let bannerCSS =
    "text-xl font-extrabold my-12 border-4 rounded-2xl shadow-xl flex h-20 justify-center items-center";

  if (bannerText == "In de aanbieding") {
    bannerCSS += " border-nn-pink text-nn-pink";
  } else {
    bannerCSS += " border-nn-green text-nn-green";
  }

  return (
    <div className={bannerCSS}>
      <h1>{bannerText}</h1>
    </div>
  );
}
