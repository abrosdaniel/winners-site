"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function HomePartners() {
  const [mounted, setMounted] = useState(false);
  const partnersRef = useRef<HTMLDivElement>(null);

  const partners: string[] = [
    "Чупин Алексей ",
    "Кудермесов Эдуард ",
    "Сарматин Михаил ",
    "Гоголев Дмитрий ",
    "Царев Андрей ",
    "Варламов Евгений ",
    "Атюшов Виталий ",
    "Добрышкин Юрий ",
    "Никитенко Андрей ",
    "Шаргородский Олег ",
    "Жиру Раймон ",
    "Морозов Алексей ",
    "Зарипов Данис ",
    "Федоров Евгений ",
    "Валиуллин Марат ",
    "Хабибулин Николай ",
    "Ковальчук Илья ",
    "Сапрыкин Олег ",
    "Кудашов Алексей ",
    "Скопинцев Андрей ",
    "Константинов Евгений ",
    "Зубов Илья ",
    "Федоров Сергей ",
    "Зубов Сергей ",
    "Марков Даниил ",
    "Кольцов Кирилл ",
    "Прошкин Виталий ",
    "Мирнов Игорь ",
    "Кайгородов Алексей ",
    "Епачинцев Вадим ",
    "Волков Алексей ",
    "Зайнуллин Руслан ",
    "Тертышный Алексей ",
    "Бабенко Юрий ",
    "Трофимов Александр ",
    "Завьялов Александр ",
    "Волченков Антон ",
    "Петров Алексей ",
    "Радулов Игорь ",
    "Калинин Дмитрий ",
    "Кутейкин Андрей ",
    "Костицын Андрей ",
    "Костицын Сергей ",
    "Жамнов Алексей ",
    "Бойков Александр ",
    "Буцаев Вячеслав ",
    "Буцаев Юрий ",
    "Чистов Станислав ",
    "Свитов Александр ",
    "Пережогин Александр ",
    "Ячанов Дмитрий ",
    "Великов Максим ",
    "Игнатов Николай ",
    "Первышин Андрей ",
    "Архипов Денис ",
    "Козлов Вячеслав ",
    "Платонов Денис ",
    "Панков Александр ",
    "Арекаев Сергей ",
    "Карпов Валерий ",
    "Макаров Константин ",
    "Вышедкевич Сергей ",
    "Ореховский Олег ",
    "Бабенко Юрий ",
    "Жердев Николай ",
    "Кваша Олег ",
    "Никулин Александр ",
    "Цыплаков Владимир ",
    "Березин Сергей ",
    "Агарков Павел ",
    "Кондратьев Максим ",
    "Востриков Сергей ",
    "Бирюков Михаил ",
    "Дерлюк Роман ",
    "Осипов Александр ",
    "Антоненко Олег ",
    "Волошенко Роман ",
    "Калачик Виктор ",
    "Столяров Геннадий ",
    "Галимов Станислав ",
    "Алексеев Никита ",
    "Толпеко Денис ",
    "Комаров Никита ",
    "Ежов Илья ",
    "Григорьев Михаил ",
    "Кольцов Константин ",
    "Кольцов Кирилл ",
    "Моня Дмитрий ",
    "Филатов Никита ",
    "Потапов Алексей ",
    "Гончаров Максим ",
    "Кувалдин Александр ",
    "Шафигулин Григорий ",
    "Давыдов Марат ",
    "Чернов Артем ",
    "Точицкий Никита ",
    "Тернавски Артем ",
    "Мишарин Георгий ",
    "Ерофеев Дмитрий ",
    "Хайдаров Ремир ",
    "Золотов Сергей ",
    "Козлов Вячеслав ",
    "Евстафьев Андрей ",
    "Болтунов Олег ",
    "Трубачев Юрий ",
    "Скороходов Игорь ",
    "Суглобов Александр ",
    "Клементьев Сергей ",
    "Кузнецов Александр ",
  ];

  useEffect(() => {
    setMounted(true);
    if (!partnersRef.current) return;

    const names = partnersRef.current.children;
    const totalNames = names.length;

    const animateRandomNames = () => {
      // Сначала сбрасываем все имена на базовый цвет
      gsap.set(names, { color: "#ECECEC" });

      // Выбираем 12 случайных индексов (6 для каждого цвета)
      const randomIndices = new Set<number>();
      while (randomIndices.size < 12) {
        randomIndices.add(Math.floor(Math.random() * totalNames));
      }

      // Преобразуем Set в массив и разделяем на две группы по 6
      const indexArray = Array.from(randomIndices);
      const firstGroup = indexArray.slice(0, 6);
      const secondGroup = indexArray.slice(6, 12);

      // Анимируем первую группу в оранжевый
      firstGroup.forEach((index) => {
        gsap.to(names[index], {
          color: "#FF730A",
          duration: 1,
          ease: "power2.inOut",
          delay: Math.random() * 0.5,
        });
      });

      // Анимируем вторую группу в темно-синий
      secondGroup.forEach((index) => {
        gsap.to(names[index], {
          color: "#171D3D",
          duration: 1,
          ease: "power2.inOut",
          delay: Math.random() * 0.5,
        });
      });
    };

    // Запускаем анимацию каждые 3 секунды
    const interval = setInterval(animateRandomNames, 3000);

    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="justify-center items-center flex flex-col my-12 px-2 lg:px-0 lg:my-16">
      <div className="w-full lg:w-10/12">
        <h2 className="font-bold text-3xl text-[#171D3D] lg:text-4xl w-10/12">
          С НАМИ РАБОТАЛИ ТАКИЕ ИЗВЕСТНЫЕ ИГРОКИ КАК
        </h2>
      </div>
      <div
        ref={partnersRef}
        className="font-bold text-[17px] lg:text-[32px] leading-[17px] lg:leading-[32px] text-[#ECECEC] text-justify lg:w-10/12"
      >
        {partners.map((name, index) => (
          <span key={index} className="transition-colors duration-300">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
