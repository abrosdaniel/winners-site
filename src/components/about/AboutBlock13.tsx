export default function AboutBlock12() {
  return (
    <div className="flex flex-col lg:flex-row-reverse gap-3 lg:gap-28 lg:items-end px-5 lg:ml-28 lg:mr-44 lg:mb-[203px] font-inter font-normal relative z-20">
      <div className="flex flex-col lg:gap-2 relative">
        <h3 className="text-[#D0D0D03B] text-3xl lg:text-5xl text-right">
          Максим Цыплаков
        </h3>
        <img
          className="rounded-xl object-cover object-center"
          src="/assets/img/about/b13-1.png"
        />
        <img
          className="hidden lg:block w-[406px] absolute top-1/2 left-1/2"
          src="/assets/img/about/b13-quote.png"
        />
      </div>
      <div className="flex flex-col gap-2 lg:gap-5">
        <h2 className="text-3xl lg:text-4xl text-[#171D3D]">
          Максим Цыплаков — талантливый игрок, начавший карьеру в молодёжных
          лигах и продвинулся выше благодаря упорству и поддержке агентства
        </h2>
        <p className="text-base leading-[19.3px] text-[#5B5B5B]">
          В 2024 году подписал контракт с «Нью-Йорк Айлендерс» Этот однолетний
          контракт новичка стал значимым этапом в его карьере после успешного
          сезона в КХЛ, где он набрал 51 очко (31 + 16) в 65 матчах за
          московский «Спартак»
        </p>
      </div>
      <img className="block lg:hidden" src="/assets/img/about/b13-quote.png" />
    </div>
  );
}
