export default function AboutBlock20() {
  return (
    <div className="flex flex-col gap-32 lg:gap-36 lg:items-center font-inter font-normal text-[#171D3D] px-5 lg:px-24">
      <h2 className="text-2xl lg:text-4xl text-center lg:w-7/12">
        Сегодня многие{" "}
        <span className="font-semibold">
          игроки, начавшие свою карьеру с нашим агентством, стали тренерами и
          хоккейными агентами
        </span>
      </h2>
      <div className="flex flex-col lg:flex-row-reverse gap-5 lg:gap-14 items-center lg:justify-end">
        <h3 className="text-2xl lg:text-4xl lg:w-5/12">
          Алексей Морозов, например, теперь президент КХЛ
        </h3>
        <div className="flex flex-col gap-2 lg:w-5/12">
          <img
            className="object-cover object-center rounded-xl"
            src="/assets/img/about/b20.png"
          />
          <p className="text-[#B1B1B1] text-base">Алексей Морозов</p>
        </div>
      </div>
    </div>
  );
}
