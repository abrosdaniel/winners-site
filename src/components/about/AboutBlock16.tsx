export default function AboutBlock16() {
  return (
    <div className="flex flex-col gap-4 lg:gap-9 font-inter font-normal px-5 lg:px-9">
      <h3 className="text-3xl text-[#171D3D] lg:w-10/12 lg:pl-28">
        Среди других игроков агентства чьи имена также стали известны,
        выделяются Александр Никишин, Владимир Ткачев и Егор Яковлев и другие
      </h3>
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-5">
        <div className="flex flex-col gap-2 lg:flex-1">
          <h4 className="text-3xl lg:text-5xl text-[#D0D0D03B] text-right">
            Александр Никишин
          </h4>
          <img
            className="rounded-xl object-cover object-center h-[253px] lg:h-full"
            src="/assets/img/about/b16-1.png"
          />
          <p className="text-base lg:text-lg text-[#B1B1B1]">
            Александр Никишин
          </p>
        </div>
        <div className="flex flex-col gap-2 lg:flex-1">
          <h4 className="text-3xl lg:text-5xl text-[#D0D0D03B] text-right">
            Владимир Ткачев
          </h4>
          <img
            className="rounded-xl object-cover object-center h-[253px] lg:h-full"
            src="/assets/img/about/b16-2.jpeg"
          />
          <p className="text-base lg:text-lg text-[#B1B1B1]">Владимир Ткачев</p>
        </div>
        <div className="flex flex-col gap-2 lg:flex-1">
          <h4 className="text-3xl lg:text-5xl text-[#D0D0D03B] text-right">
            Егор Яковлев
          </h4>
          <img
            className="rounded-xl object-cover object-center h-[253px] lg:h-full"
            src="/assets/img/about/b16-3.png"
          />
          <p className="text-base lg:text-lg text-[#B1B1B1]">Егор Яковлев</p>
        </div>
      </div>
    </div>
  );
}
