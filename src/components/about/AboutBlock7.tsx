export default function AboutBlock6() {
  return (
    <div className="flex flex-col lg:flex-row gap-10 items-center lg:justify-center font-inter mb-11 lg:mb-0">
      <img
        className="z-20 lg:-translate-y-1/4"
        src="/assets/img/about/b6-quote.png"
      />
      <p className="font-normal text-lg leading-[21.8px] text-[#5B5B5B] px-4 z-20 lg:w-4/12">
        Тем не менее, благодаря таланту первых клиентов Юрия Леонидовича и его
        глубокому пониманию специфики хоккейного бизнеса,{" "}
        <span className="font-medium">
          агентство стало набирать известность.
        </span>
      </p>
    </div>
  );
}
