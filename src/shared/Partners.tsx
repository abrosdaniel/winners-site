"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function Partners() {
  const [mounted, setMounted] = useState(false);
  const partnersRef = useRef<HTMLDivElement>(null);

  const partners: string[] = [
    "Данис Зарипов ",
    "Евгений Варламов ",
    "Виталий Атюшов ",
    "Юрий Добрышкин ",
    "Алексей Морозов ",
    "Николай Хабибулин ",
    "Илья Ковальчук ",
    "Олег Сапрыкин ",
    "Алексей Кудашов ",
    "Андрей Скопинцев ",
    "Евгений Константинов ",
    "Илья Зубов ",
    "Сергей Федоров ",
    "Сергей Зубов ",
    "Даниил Марков ",
    "Кирилл Кольцов ",
    "Виталий Прошкин ",
    "Игорь Мирнов ",
    "Алексей Кайгородов ",
    "Вадим Епачинцев ",
    "Алексей Волков ",
    "Руслан Зайнуллин ",
    "Алексей Тертышный ",
    "Александр Завьялов ",
    "Антон Волченков ",
    "Игорь Радулов ",
    "Дмитрий Калинин ",
    "Андрей Кутейкин ",
    "Андрей Костицын ",
    "Сергей Костицын ",
    "Алексей Жамнов ",
    "Вячеслав Буцаев ",
    "Юрий Буцаев ",
    "Станислав Чистов ",
    "Александр Свитов ",
    "Александр Пережогин ",
    "Дмитрий Ячанов ",
    "Андрей Первышин ",
    "Вячеслав Козлов ",
    "Денис Платонов ",
    "Виталий Прошкин ",
    "Сергей Вышедкевич ",
    "Олег Ореховский ",
    "Николай Жердев ",
    "Олег Кваша ",
    "Сергей Березин ",
    "Павел Агарков ",
    "Максим Кондратьев ",
    "Михаил Бирюков ",
    "Роман Дерлюк ",
    "Олег Антоненко ",
    "Геннадий Столяров ",
    "Станислав Галимов ",
    "Денис Толпеко ",
    "Илья Ежов ",
    "Константин Кольцов ",
    "Никита Филатов ",
    "Алексей Потапов ",
    "Максим Гончаров ",
    "Григорий Шафигулин ",
    "Вячеслав Козлов ",
    "Андрей Евстафьев ",
    "Юрий Трубачев ",
    "Антон Худобин ",
    "Владимир Галузин ",
  ];

  useEffect(() => {
    setMounted(true);
    if (!partnersRef.current) return;

    const names = partnersRef.current.children;
    const totalNames = names.length;

    const animateRandomNames = () => {
      gsap.set(names, { color: "#ECECEC" });

      const randomIndices = new Set<number>();
      while (randomIndices.size < 12) {
        randomIndices.add(Math.floor(Math.random() * totalNames));
      }

      const indexArray = Array.from(randomIndices);
      const firstGroup = indexArray.slice(0, 6);
      const secondGroup = indexArray.slice(6, 12);

      firstGroup.forEach((index) => {
        gsap.to(names[index], {
          color: "#FF730A",
          duration: 1,
          ease: "power2.inOut",
          delay: Math.random() * 0.5,
        });
      });

      secondGroup.forEach((index) => {
        gsap.to(names[index], {
          color: "#171D3D",
          duration: 1,
          ease: "power2.inOut",
          delay: Math.random() * 0.5,
        });
      });
    };

    const interval = setInterval(animateRandomNames, 3000);

    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-5 lg:gap-10">
      <h2 className="font-bold text-3xl leading-7 lg:leading-9 text-[#171D3D] lg:text-4xl max-w-64 lg:max-w-none">
        С НАМИ РАБОТАЛИ ТАКИЕ ИЗВЕСТНЫЕ ИГРОКИ КАК
      </h2>
      <div
        ref={partnersRef}
        className="font-bold text-[17px] lg:text-[32px] leading-[17px] lg:leading-[32px] text-[#ECECEC] text-justify"
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

export { Partners };
