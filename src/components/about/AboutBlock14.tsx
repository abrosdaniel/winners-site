export default function AboutBlock12() {
  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:gap-48 lg:items-end px-5 lg:mx-28 lg:mb-[203px] font-inter font-normal relative z-20">
      <div className="flex flex-1 flex-col lg:gap-2 relative">
        <h3 className="text-[#D0D0D03B] text-3xl lg:text-5xl text-right">
          Клим Костин
        </h3>
        <img
          className="rounded-xl object-cover object-center aspect-[16/12]"
          src="/assets/img/about/b14-1.png"
        />
        <img
          className="hidden lg:block w-[406px] absolute top-1/2 left-1/2"
          src="/assets/img/about/b14-quote.png"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 lg:gap-5">
        <h2 className="text-3xl lg:text-4xl text-[#171D3D]">
          Клим Костин — ещё один талант, доверивший свою карьеру "Winners"
        </h2>
        <p className="text-base leading-[19.3px] text-[#5B5B5B]">
          Подписав контракт с агентством в возрасте 17 лет, он начал свою
          профессиональную карьеру в клубе «Динамо» Москва. На драфте НХЛ был
          выбран клубом «Сент-Луис Блюз» и продолжил карьеру в Северной Америке.
          В сезоне 2020/2021, во время аренды в «Авангарде», стал обладателем
          Кубка Гагарина. Затем играл за «Эдмонтон Ойлерз» и «Детройт Ред
          Уингз». А позже был обменян в «Сан-Хосе Шаркс».
        </p>
      </div>
      <img className="block lg:hidden" src="/assets/img/about/b14-quote.png" />
    </div>
  );
}
