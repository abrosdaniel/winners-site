export default function AboutBlock9() {
  return (
    <div className="relative text-white font-inter font-normal flex flex-col mx-5 lg:mx-28 gap-16 lg:gap-64 z-20 mb-16 lg:mb-32">
      <h3 className="text-3xl lg:text-4xl lg:w-7/12">
        В 2007 году встал вопрос о дальнейшем расширении и потребностью в более
        широких связях и ресурсах
      </h3>
      <div className="flex flex-row gap-16">
        <div className="hidden lg:flex flex-col gap-3">
          <img
            className="rounded-full w-[135px]"
            src="/assets/img/about/b9-chernyh.png"
          />
          <h3 className="font-bold text-2xl w-max">Александр Черных</h3>
          <p className="text-lg text-[#ECECEC] w-max">
            Хоккейный агент с 2007 года
          </p>
        </div>
        <div className="flex flex-col gap-2 lg:gap-5">
          <h3 className="text-3xl lg:text-4xl mb-3 lg:w-9/12">
            Тогда Юрий Николаев решил{" "}
            <span className="text-orange-500 font-semibold">
              объединить усилия с Александром Черных
            </span>
          </h3>
          <img
            className="rounded-xl object-cover object-center"
            src="/assets/img/about/b9-1.png"
          />
          <div className="flex flex-row gap-2 lg:gap-5">
            <img
              className="rounded-xl object-cover object-center w-[calc(50%-0.25rem)] lg:w-[calc(50%-0.5rem)]"
              src="/assets/img/about/b9-2.png"
            />
            <img
              className="rounded-xl object-cover object-center w-[calc(50%-0.25rem)] lg:w-[calc(50%-0.5rem)]"
              src="/assets/img/about/b9-3.jpeg"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <img
          className="w-[183px] lg:w-[193px]"
          src="/assets/icons/logo/logo.png"
        />
        <div className="flex flex-col gap-5">
          <h4 className="text-3xl lg:text-4xl lg:w-10/12">
            Агентство, которое они назвали "Winners",{" "}
            <span className="font-semibold">
              ставило целью помочь хоккеистам добиваться своих целей, развивать
              профессионалов высочайшего уровня
            </span>{" "}
            и становиться частью настоящей «хоккейной элиты».
          </h4>
          <p className="text-lg leading-[21.8px] text-[#ECECEC] lg:w-6/12">
            Благодаря этому сотрудничеству "Winners" стал выходить на
            международные рынки и подписывать молодых игроков из других регионов
            и даже стран.
          </p>
        </div>
      </div>
    </div>
  );
}
