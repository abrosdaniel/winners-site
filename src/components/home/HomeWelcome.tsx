"use client";

export function HomeWelcome() {
  return (
    <div className="justify-center items-center flex flex-col bg-[#171D3D] text-white pt-5 pb-12 px-2">
      <div className="lg:w-10/12">
        <div className="flex flex-col lg:flex-row lg:gap-28 lg:items-center">
          <div className="flex flex-col font-bold">
            <h2 className="text-4xl lg:text-[40px]">ХОККЕЙНОЕ АГЕНТСТВО</h2>
            <h1 className="text-[128px] lg:text-[160px] leading-[128px] lg:leading-[160px]">
              WINNERS
            </h1>
          </div>
          <div className="flex lg:hidden text-[#171D3D] px-9 py-5 flex-row gap-5 bg-white rounded-full mb-7">
            <div className="flex flex-col">
              <p className="font-bold text-5xl">18</p>
              <p className="font-inter font-normal text-xs leading-[14.5px]">
                лет работы
                <br />
                агентства
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-5xl">73%</p>
              <p className="font-inter font-normal text-xs leading-[14.5px]">
                клиентов агенства
                <br />
                игроки КХЛ и НХЛ
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-5xl">21</p>
              <p className="font-inter font-normal text-xs leading-[14.5px]">
                игрок
                <br />
                НХЛ
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-5xl">200+</p>
              <p className="font-inter font-normal text-xs leading-[14.5px]">
                игроков
                <br />
                КХЛ
              </p>
            </div>
          </div>
          <p className="font-inter font-normal text-lg lg:w-6/12">
            <span className="text-[32px] leading-[38.5px] lg:text-lg lg:leading-5">
              Winners — агентство спортивного менеджмента.
            </span>
            <br />
            <span className="font-semibold text-orange-500">
              Мы занимаемся поиском контрактов, юридической и медийной
              поддержкой
            </span>
            , чтобы наши клиенты могли сосредоточиться на игре.{" "}
            <span className="hidden lg:block">
              Нас выбирают звезды, такие как Артемий Панарин, Илья Ковальчук,
              Данис Зарипов, и многие другие ведущие игроки, доверяя нашему
              опыту и профессионализму.
            </span>
          </p>
        </div>
        <div className="hidden lg:flex text-[#171D3D] flex-row justify-center py-5 gap-28 bg-white rounded-full my-7">
          <div className="flex flex-col">
            <p className="font-bold text-7xl">18</p>
            <p className="font-inter font-normal text-lg leading-[21.5px]">
              лет работы агентства
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-7xl">73%</p>
            <p className="font-inter font-normal text-lg leading-[21.5px]">
              клиентов агенства
              <br />
              игроки КХЛ и НХЛ
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-7xl">200+</p>
            <p className="font-inter font-normal text-lg leading-[21.5px]">
              игроков КХЛ
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-7xl">21</p>
            <p className="font-inter font-normal text-lg leading-[21.5px]">
              игрок НХЛ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
