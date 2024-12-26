export default function AboutBlock18() {
  return (
    <div className="flex flex-col gap-7 font-inter font-normal px-5 lg:px-14">
      <div className="flex flex-col gap-5 lg:pl-24 lg:w-9/12">
        <h2 className="text-[#171D3D] text-3xl lg:text-4xl">
          Количество молодых талантов стремительно росло. Юрий Николаев и
          Александр Черных начали привлекать скаутов и агентов.
        </h2>
        <h3 className="text-[#5B5B5B] text-lg leading-[21.8px]">
          Многие специалисты, знающие своё дело, обращались в "Winners" за
          сотрудничеством, ведь агентство уже зарекомендовало себя как
          стабильный и надежный партнёр для молодых игроков.
        </h3>
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="flex-1 rounded-xl overflow-hidden">
          <img
            className="object-cover object-center aspect-video lg:aspect-[16/12]"
            src="/assets/img/about/b18-1.jpeg"
          />
        </div>
        <div className="flex-1 rounded-xl overflow-hidden">
          <img
            className="object-cover object-center aspect-video lg:aspect-[16/12]"
            src="/assets/img/about/b18-2.jpeg"
          />
        </div>
        <div className="flex-1 rounded-xl overflow-hidden">
          <img
            className="object-cover object-center aspect-video lg:aspect-[16/12]"
            src="/assets/img/about/b18-3.jpeg"
          />
        </div>
      </div>
    </div>
  );
}
