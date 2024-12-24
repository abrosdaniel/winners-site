export default function AboutBlock8() {
  return (
    <div className="font-inter mx-5 lg:mx-64 mt-10 lg:mt-0 mb-12 flex flex-col gap-10 lg:gap-28">
      <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-20 z-20 lg:items-center">
        <div className="flex flex-col gap-2 lg:w-[366px]">
          <img
            className="h-full object-cover object-center rounded-xl"
            src="/assets/img/about/b8-radulov.png"
          />
          <p className="font-normal text-base text-[#B1B1B1]">
            Александр Радулов
          </p>
        </div>
        <div className="flex lg:flex-1 flex-col gap-5">
          <h3 className="font-normal text-3xl lg:text-4xl text-[#171D3D]">
            В 2006 году агентство подписало контракт с молодым Александром
            Радуловым
          </h3>
          <p className="font-normal text-lg text-[#5B5B5B] leading-[21.7px]">
            который начал карьеру в Уфе.
          </p>
        </div>
      </div>
    </div>
  );
}
