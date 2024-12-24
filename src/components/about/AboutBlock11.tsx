export default function AboutBlock10() {
  return (
    <div className="relative px-5 lg:px-0 mb-24 lg:mb-32 mt-10 lg:mt-0 z-20">
      <div className="flex flex-col gap-7 items-center font-inter font-normal text-center">
        <img
          className="w-[154px] lg:w-[185px]"
          src="/assets/img/about/b10-khl.png"
        />
        <h3 className="text-3xl lg:text-4xl text-[#171D3D] lg:w-5/12">
          В 2008 году была создана КХЛ,
          <br />
          что привело к значительному притоку игроков
        </h3>
        <h4 className="text-lg leading-[21.8px] text-[#5B5B5B] w-10/12 lg:w-3/12">
          Тогда с агентством сотрудничало порядка{" "}
          <span className="font-semibold">
            30% всех ведущих хоккеистов лиги.
          </span>
        </h4>
      </div>
      <img
        className="hidden lg:block w-[213px] absolute right-28 top-1/2 -translate-y-1/2"
        src="/assets/img/about/b10-graf.svg"
      />
    </div>
  );
}
