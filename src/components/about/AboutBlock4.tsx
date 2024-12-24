export default function AboutBlock3() {
  return (
    <div className="font-inter bg-[#171D3D] px-5 py-10 flex flex-col gap-10 lg:flex-row lg:gap-7 lg:px-80 lg:items-end">
      <div className="flex flex-col gap-5 lg:w-3/5 z-20">
        <img
          className="rounded-xl object-cover lg:h-[300px]"
          src="/assets/img/about/b3-yuriy.png"
        />
        <p className="font-normal text-base text-[#E3E3E3]">Юрий Леонидович</p>
      </div>
      <h3 className="font-normal text-3xl leading-9 text-white mb-6 z-20">
        Тогда Юрий Леонидович Николаев начал свой независимый путь
      </h3>
    </div>
  );
}
