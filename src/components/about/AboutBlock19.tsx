export default function AboutBlock19() {
  return (
    <div className="flex flex-col gap-7 font-inter font-normal mt-20 overflow-hidden mb-12">
      <div className="flex flex-col items-center">
        <div className="px-5 lg:px-40">
          <h2 className="text-[#171D3D] text-3xl lg:text-4xl lg:w-9/12 lg:translate-y-20">
            Со временем "Winners" создало целую сеть скаутов по всей России и за
            рубежом
          </h2>
        </div>
        <div className="relative h-[280px] lg:h-auto lg:w-[1100px] scale-110 lg:scale-100">
          <img src="/assets/img/about/b19-map.png" />
        </div>
        <div className="px-5 lg:px-56 w-full flex lg:justify-end">
          <h3 className="text-[#5B5B5B] text-lg leading-[21.8px] lg:w-[508px] lg:pt-2 lg:mr-20">
            Они отслеживают перспективных игроков и благодаря этому в агентстве
            появляются такие игроки как Швец-Роговой, Трушков, Рафиков,
            Гераськин, Зернов, Хохлачев, Гальченюк, Лямкин и Самонов.{" "}
          </h3>
        </div>
      </div>
    </div>
  );
}
