export default function AboutBlock12() {
  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:gap-48 lg:items-end px-5 lg:mx-28 lg:mb-[203px] font-inter font-normal relative z-20">
      <div className="flex flex-col lg:gap-2 relative">
        <h3 className="text-[#D0D0D03B] text-3xl lg:text-5xl text-right">
          Артемий Панарин
        </h3>
        <img
          className="rounded-xl object-cover object-center"
          src="/assets/img/about/b12-1.png"
        />
        <img
          className="hidden lg:block w-[406px] absolute top-1/2 left-1/2"
          src="/assets/img/about/b12-quote.png"
        />
      </div>
      <div className="flex flex-col gap-2 lg:gap-5">
        <h2 className="text-3xl lg:text-4xl text-[#171D3D]">
          Одним из знаковых игроков агентства стал Артемий Панарин
        </h2>
        <p className="text-base leading-[19.3px] text-[#5B5B5B]">
          Его карьера началась в "Витязе", откуда он позже перешёл в питерский
          СКА. Артемию было 19 лет, и его уникальный стиль игры позволил быстро
          проявить себя. Сотрудничество с "Winners" и поддержка со стороны
          агентов помогли Панарину получить шанс в НХЛ, где он с успехом
          продолжил свою карьеру и стал одной из ярчайших звезд.
        </p>
      </div>
      <img className="block lg:hidden" src="/assets/img/about/b12-quote.png" />
    </div>
  );
}
