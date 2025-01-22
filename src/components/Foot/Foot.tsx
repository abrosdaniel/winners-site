import { Button } from "@ui/button";
import Link from "next/link";

export default function Foot() {
  return (
    <footer
      id="contacts"
      className="relative bg-[#171D3D] rounded-b-none rounded-t-3xl w-full max-w-6xl mx-auto py-10 px-14 overflow-hidden lg:rounded-full lg:py-24 lg:px-20 zoomer"
    >
      <div className="absolute top-0 left-0 flex w-full h-full z-10 pt-20 lg:py-20 lg:justify-center lg:gap-32  lg:px-36 lg:box-border">
        <div className="flex-1 px-10 pt-20 lg:flex-none lg:flex lg:px-0 lg:pt-0 lg:gap-32">
          <img
            className="w-full pb-16 lg:pb-0"
            src="/assets/img/foot/khl.png"
          />
          <img
            className="w-full pb-16 lg:pb-0"
            src="/assets/img/foot/vhl.png"
          />
        </div>
        <div className="flex-1 px-10 lg:flex-none lg:flex lg:px-0 lg:gap-32">
          <img
            className="w-full pb-16 lg:pb-0"
            src="/assets/img/foot/nhl.png"
          />
          <img
            className="w-full pb-16 lg:pb-0"
            src="/assets/img/foot/mhl.png"
          />
        </div>
      </div>
      <div className="relative z-20 lg:flex lg:items-center lg:justify-between">
        <div className="flex justify-center pb-5 lg:pb-0">
          <img
            className="h-32 lg:w-[76px] lg:h-[87px]"
            src="/assets/icons/logo/logo.png"
          />
        </div>
        <div className="text-white font-bold text-3xl leading-none flex flex-col gap-3 items-start font-inter pb-12 lg:pb-0">
          <a href={`mailto:info@wnrs.ru`}>info@wnrs.ru</a>
          <div className="flex gap-2 justify-center items-center">
            <img
              className="h-7 w-7 p-2 rounded-full bg-white"
              src="/assets/icons/social/phone.svg"
            />
            <a
              href="https://wa.me/79688658761"
              target="_blank"
              rel="noopener noreferrer"
            >
              +7 968 865 87 61
            </a>
          </div>
        </div>
        <div className="flex justify-between pb-10 lg:pb-0 lg:gap-32">
          <div className="flex flex-col">
            <Button
              className="text-white hover:bg-transparent hover:text-white font-normal text-lg leading-none font-inter h-auto pl-0 justify-start"
              variant="link"
              asChild
            >
              <Link href="/players">игроки</Link>
            </Button>
            <Button
              className="text-white hover:bg-transparent hover:text-white font-normal text-lg leading-none font-inter  h-auto pl-0 justify-start"
              variant="link"
              asChild
            >
              <Link href="/about">о нас</Link>
            </Button>
            <Button
              className="text-white hover:bg-transparent hover:text-white font-normal text-lg leading-none font-inter  h-auto pl-0 justify-start"
              variant="link"
              asChild
            >
              <Link href="/news">новости</Link>
            </Button>
            <Button
              className="text-white hover:bg-transparent hover:text-white font-normal text-lg leading-none font-inter  h-auto pl-0 justify-start"
              variant="link"
              asChild
            >
              <Link href="/agency">команда</Link>
            </Button>
            <Button
              className="text-white hover:bg-transparent hover:text-white font-normal text-lg leading-none font-inter  h-auto pl-0 justify-start"
              variant="link"
              asChild
            >
              <Link href="#contacts">контакты</Link>
            </Button>
          </div>
          <div className="flex flex-col">
            <Button
              className="text-white hover:bg-transparent hover:text-white font-normal text-lg leading-none font-inter h-auto pl-0 justify-start"
              variant="link"
              asChild
            >
              <Link
                href="https://www.instagram.com/winners_hockey"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="h-7 w-7 p-2 rounded-full bg-white"
                  src="/assets/icons/social/inst.svg"
                />
                instagram*
              </Link>
            </Button>
            <Button
              className="text-white hover:bg-transparent hover:text-white font-normal text-lg leading-none font-inter  h-auto pl-0 justify-start"
              variant="link"
              asChild
            >
              <Link
                href="https://t.me/winnershockey"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="h-7 w-7 p-2 rounded-full bg-white"
                  src="/assets/icons/social/telegram.svg"
                />
                telegram
              </Link>
            </Button>
            <Button
              className="text-white hover:bg-transparent hover:text-white font-normal text-lg leading-none font-inter  h-auto pl-0 justify-start"
              variant="link"
              asChild
            >
              <Link
                href="https://wa.me/79688658761"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="h-7 w-7 p-2 rounded-full bg-white"
                  src="/assets/icons/social/phone.svg"
                />
                what’sapp
              </Link>
            </Button>
            <Button
              className="text-white hover:bg-transparent hover:text-white font-normal text-lg leading-none font-inter  h-auto pl-0 justify-start"
              variant="link"
              asChild
            >
              <Link href={`mailto:info@wnrs.ru`}>
                <img
                  className="h-7 w-7 p-2 rounded-full bg-white"
                  src="/assets/icons/social/email.svg"
                />
                email
              </Link>
            </Button>
          </div>
        </div>
        <div className="pb-14 lg:pb-0">
          <Button
            className="bg-orange-500 hover:bg-transparent py-1 h-8 rounded-none font-normal text-lg leading-none font-inter border border-orange-500 hover:border-white"
            asChild
          >
            <Link href="/form">заполнить анкету</Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col relative text-xs font-normal text-[#B3B3B3] font-inter gap-2 z-20 lg:flex-row lg:justify-center lg:gap-5 lg:absolute lg:bottom-5 lg:left-1/2 lg:-translate-x-1/2 lg:w-full">
        <p>© 2024 ХОККЕЙНОЕ АГЕНТСТВО WINNERS</p>
        <a href="/policy">Политика конфиденциальности</a>
        <p>
          *Meta признана экстремистской организацией и запрещена на территории
          России
        </p>
      </div>
    </footer>
  );
}
