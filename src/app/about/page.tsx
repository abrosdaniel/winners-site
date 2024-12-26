import { TextBlock } from "@/components/about/TextBlock";
import AboutBlock1 from "@/components/about/AboutBlock1";
import AboutBlock2 from "@/components/about/AboutBlock2";
import AboutBlock3 from "@/components/about/AboutBlock3";
import AboutBlock4 from "@/components/about/AboutBlock4";
import AboutBlock5 from "@/components/about/AboutBlock5";
import AboutBlock6 from "@/components/about/AboutBlock6";
import AboutBlock7 from "@/components/about/AboutBlock7";
import AboutBlock8 from "@/components/about/AboutBlock8";
import AboutBlock9 from "@/components/about/AboutBlock9";
import AboutBlock10 from "@/components/about/AboutBlock10";
import AboutBlock11 from "@/components/about/AboutBlock11";
import AboutBlock12 from "@/components/about/AboutBlock12";
import AboutBlock13 from "@/components/about/AboutBlock13";
import AboutBlock14 from "@/components/about/AboutBlock14";
import AboutBlock15 from "@/components/about/AboutBlock15";
import AboutBlock16 from "@/components/about/AboutBlock16";
import AboutBlock17 from "@/components/about/AboutBlock17";
import AboutBlock18 from "@/components/about/AboutBlock18";
import AboutBlock19 from "@/components/about/AboutBlock19";
import AboutBlock20 from "@/components/about/AboutBlock20";
import AboutBlock21 from "@/components/about/AboutBlock21";
import AboutBlock22 from "@/components/about/AboutBlock22";
import AboutBlock23 from "@/components/about/AboutBlock23";

export default function About() {
  return (
    <div className="w-full box-border flex flex-col">
      <AboutBlock1 />

      <div className="relative">
        <TextBlock type="scroller" className="sticky">
          1999
        </TextBlock>
        <AboutBlock2 />
      </div>

      <div className="relative">
        <TextBlock type="scroller" className="sticky">
          2001
        </TextBlock>
        <AboutBlock3 />
        <AboutBlock4 />
        <AboutBlock5 />
      </div>

      <div className="relative bg-[#F5F5F5]">
        <TextBlock type="scroller" className="sticky">
          2003
        </TextBlock>
        <AboutBlock6 />
      </div>

      <div className="relative">
        <TextBlock type="description">Первые успехи и рост агентства</TextBlock>
        <TextBlock type="scroller" className="sticky">
          2004
        </TextBlock>
        <AboutBlock7 />
        <AboutBlock8 />
      </div>

      <div className="relative">
        <TextBlock type="scroller" className="sticky">
          2006
        </TextBlock>
        <AboutBlock9 />
      </div>

      <div className="relative bg-[#171D3D]">
        <TextBlock type="description">
          Создание агентства и новый этап
        </TextBlock>
        <TextBlock type="scroller" className="sticky">
          2007
        </TextBlock>
        <AboutBlock10 />
      </div>

      <div className="relative">
        <TextBlock type="scroller" className="sticky">
          2008
        </TextBlock>
        <AboutBlock11 />
      </div>

      <div className="relative bg-[#F5F5F5] pb-20 lg:pb-36">
        <TextBlock type="description">
          Новое поколение:
          <br />
          Панарин, Костин и другие
        </TextBlock>
        <TextBlock type="scroller" className="mt-10 lg:mt-0 mb-9 lg:mb-11">
          Новое поколение
        </TextBlock>
        <AboutBlock12 />
        <TextBlock type="description" className="pt-2 hidden lg:block">
          2015
        </TextBlock>
        <AboutBlock13 />
        <TextBlock type="description" className="pt-6 hidden lg:block">
          2016
        </TextBlock>
        <AboutBlock14 />
        <AboutBlock15 />
        <TextBlock type="description" className="mt-20 lg:mt-36 mb-14 lg:mb-0">
          Новые перспективные игроки
        </TextBlock>
        <AboutBlock16 />
        <AboutBlock17 />
      </div>
      <div className="relative">
        <TextBlock type="description" className=" mb-28 lg:mb-32">
          Создание профессиональной
          <br />
          команды скаутов и агентов
        </TextBlock>
        <AboutBlock18 />
        <AboutBlock19 />
      </div>
      <div className="relative bg-[#F5F5F5]">
        <TextBlock type="description" className="mt-5 lg:mt-7 mb-28 lg:mb-20">
          Игроки спустя года
        </TextBlock>
        <AboutBlock20 />
        <TextBlock type="description" className="mt-24 lg:mt-7">
          2025
        </TextBlock>
        <TextBlock type="scroller" className="mb-9 lg:mb-11">
          ТРЕНЕРЫ КХЛ
        </TextBlock>
        <AboutBlock21 />
        <TextBlock type="scroller" className="mt-16 lg:mt-20">
          ГАЛЕРЕЯ
        </TextBlock>
        <AboutBlock22 />
      </div>
      <div className="relative">
        <AboutBlock23 />
      </div>
    </div>
  );
}
