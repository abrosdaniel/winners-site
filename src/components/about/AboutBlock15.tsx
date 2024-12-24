export default function AboutBlock15() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-24 px-5 lg:px-36 mt-4 font-inter font-normal lg:items-center">
      <img
        className="rounded-xl object-cover object-center lg:w-[359px] lg:h-[309px]"
        src="/assets/img/about/b15.jpeg"
      />
      <div className="flex flex-col gap-5">
        <h3 className="text-xl lg:text-4xl text-[#171D3D]">
          «Наши ребята в НХЛ прославляют страну, их знает весь мир. Все знают
          Овечкина, Малкина, Кучерова, Панарина, Василевского, Шестеркина».
        </h3>
        <p className="text-base text-[#5B5B5B]">– Александр Черных</p>
      </div>
    </div>
  );
}
