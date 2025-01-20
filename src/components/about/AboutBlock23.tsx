export default function AboutBlock23() {
  return (
    <div className="flex flex-col gap-14 lg:gap-16 items-center font-inter font-normal text-[#171D3D] my-16 lg:my-36 px-5 lg:px-16">
      <h3 className="text-3xl w-full lg:px-48 lg:mb-11">
        За всю историю агентства
        <br />с нами сотрудничали
      </h3>
      <div className="flex flex-col gap-7">
        <div className="flex flex-row gap-16 lg:gap-28">
          <div className="flex flex-col items-center">
            <h4 className="text-6xl">52</h4>
            <p className="text-xl">игрока НХЛ</p>
          </div>
          <div className="hidden lg:flex flex-col items-center">
            <h4 className="text-6xl">12</h4>
            <p className="text-xl">олимпийских чемпионов</p>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-6xl">26</h4>
            <p className="text-xl">чемпионов мира</p>
          </div>
        </div>
        <div className="flex lg:hidden flex-col items-center">
          <h4 className="text-6xl">12</h4>
          <p className="text-xl">олимпийских чемпионов</p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-8">
        <div className="rounded-xl overflow-hidden flex-1">
          <img
            className="aspect-video object-cover object-center"
            src="/assets/img/about/b23-1.jpeg"
          />
        </div>
        <div className="rounded-xl overflow-hidden flex-1">
          <img
            className="aspect-video object-cover object-center"
            src="/assets/img/about/b23-2.jpg"
          />
        </div>
      </div>
      <p className="text-lg lg:text-4xl">продолжение следует...</p>
    </div>
  );
}
