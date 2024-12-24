export default function AboutBlock7() {
  return (
    <div className="font-inter mx-5 lg:mx-64 mt-10 lg:mt-0 mb-12 flex flex-col gap-10 lg:gap-28">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 z-20">
        <h3 className="block lg:hidden font-normal text-3xl text-[#171D3D]">
          В 2004 году в НХЛ начался локаут, и многие звёзды приехали в Россию
        </h3>
        <div className="flex flex-row gap-2 lg:flex-1">
          <div className="flex-1 flex flex-col gap-2">
            <img
              className="h-[210px] object-cover object-center filter grayscale rounded-xl"
              src="/assets/img/about/b7-1.png"
            />
            <p className="font-normal text-base text-[#B1B1B1]">
              Николай Хабибулин
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <img
              className="h-[210px] object-cover object-center filter grayscale rounded-xl"
              src="/assets/img/about/b7-2.png"
            />
            <p className="font-normal text-base text-[#B1B1B1]">
              Вячеслав Козлов
            </p>
          </div>
        </div>
        <div className="flex lg:flex-1 flex-col gap-5">
          <h3 className="hidden lg:block font-normal text-4xl text-[#171D3D]">
            В 2004 году в НХЛ начался локаут, и многие звёзды приехали в Россию
          </h3>
          <p className="font-normal text-lg text-[#5B5B5B] leading-[21.8px]">
            В агентстве оказались такие значимые хоккеисты, как Хабибуллин и
            Козлов. В 2005 году Россия стала выстраивать новую систему для
            хоккея, что ознаменовало создание одной из ведущих лиги мира. К
            Николаеву присоединились новые игроки, такие как Валерий Карпов и
            Михаил Сармантьев.
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-5 z-20 lg:justify-end">
        <div className="flex flex-col gap-2">
          <img
            className="h-[290px] lg:w-[395px] object-cover object-center filter grayscale rounded-xl"
            src="/assets/img/about/b7-3.png"
          />
          <p className="font-normal text-base text-[#B1B1B1]">Валерий Карпов</p>
        </div>
        <div className="flex flex-col gap-2">
          <img
            className="h-[290px] lg:w-[395px] object-cover object-center filter grayscale rounded-xl"
            src="/assets/img/about/b7-4.jpeg"
          />
          <p className="font-normal text-base text-[#B1B1B1]">
            Михаил Сарматин
          </p>
        </div>
      </div>
    </div>
  );
}
