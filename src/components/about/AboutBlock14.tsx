export default function AboutBlock12() {
  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:gap-48 lg:items-end px-5 lg:mx-28 lg:mb-[203px] font-inter font-normal relative z-20">
      <div className="flex flex-1 flex-col lg:gap-2 relative">
        <h3 className="text-[#D0D0D03B] text-3xl lg:text-5xl text-right">
          Александр Никишин
        </h3>
        <img
          className="rounded-xl object-cover object-center aspect-[16/12]"
          src="/assets/img/about/b14-1.jpg"
        />
        <img
          className="hidden lg:block w-[406px] absolute top-1/2 left-1/2"
          src="/assets/img/about/b14-quote.png"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 lg:gap-5">
        <h2 className="text-3xl lg:text-4xl text-[#171D3D]">
          Александр Никишин — ещё один талант, доверивший свою карьеру "Winners"
        </h2>
        <p className="text-base leading-[19.3px] text-[#5B5B5B]">
          Воспитанник системы ЦСКА, Александр дебютировал в КХЛ в составе
          «Спартака» и быстро стал одним из самых перспективных защитников лиги.
          В 2022 году принял участие в Олимпийских играх в Пекине, где завоевал
          серебряную медаль со сборной России. После перехода в СКА
          Санкт-Петербург установил клубный рекорд по результативности среди
          защитников. Летом 2025 года отправился в Северную Америку, чтобы
          продолжить карьеру в «Каролине Харрикейнз», выбравшей его на драфте
          НХЛ.
        </p>
      </div>
      <img className="block lg:hidden" src="/assets/img/about/b14-quote.png" />
    </div>
  );
}
