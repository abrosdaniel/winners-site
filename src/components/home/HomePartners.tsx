"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function HomePartners() {
  const [mounted, setMounted] = useState(false);
  const partnersRef = useRef<HTMLDivElement>(null);

  const partners: string[] = [
    "Алексей Чупин ",
    "Эдуард Кудерметов ",
    "Михаил Сарматин ",
    "Дмитрий Гоголев ",
    "Андрей Царев ",
    "Евгений Варламов ",
    "Виталий Атюшов ",
    "Юрий Добрышкин ",
    "Андрей Никитенко ",
    "Олег Шаргородский ",
    "Раймон Жиру ",
    "Алексей Морозов ",
    "Данис Зарипов ",
    "Евгений Федоров ",
    "Марат Валиуллин ",
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
    "Юрий Бабенко ",
    "Александр Трофимов ",
    "Александр Завьялов ",
    "Антон Волченков ",
    "Алексей Петров ",
    "Игорь Радулов ",
    "Дмитрий Калинин ",
    "Андрей Кутейкин ",
    "Андрей Костицын ",
    "Сергей Костицын ",
    "Алексей Жамнов ",
    "Александр Бойков ",
    "Вячеслав Буцаев ",
    "Юрий Буцаев ",
    "Станислав Чистов ",
    "Александр Свитов ",
    "Александр Пережогин ",
    "Дмитрий Ячанов ",
    "Максим Великов ",
    "Николай Игнатов ",
    "Андрей Первышин ",
    "Денис Архипов ",
    "Вячеслав Козлов ",
    "Денис Платонов ",
    "Александр Панков ",
    "Сергей Арекаев ",
    "Валерий Карпов ",
    "Константин Макаров ",
    "Сергей Вышедкевич ",
    "Олег Ореховский ",
    "Юрий Бабенко ",
    "Николай Жердев ",
    "Олег Кваша ",
    "Александр Никулин ",
    "Владимир Цыплаков ",
    "Сергей Березин ",
    "Павел Агарков ",
    "Максим Кондратьев ",
    "Сергей Востриков ",
    "Михаил Бирюков ",
    "Роман Дерлюк ",
    "Александр Осипов ",
    "Олег Антоненко ",
    "Роман Волошенко ",
    "Виктор Калачик ",
    "Геннадий Столяров ",
    "Станислав Галимов ",
    "Никита Алексеев ",
    "Денис Толпеко ",
    "Никита Комаров ",
    "Илья Ежов ",
    "Михаил Григорьев ",
    "Константин Кольцов ",
    "Кирилл Кольцов ",
    "Дмитрий Моня ",
    "Никита Филатов ",
    "Алексей Потапов ",
    "Максим Гончаров ",
    "Александр Кувалдин ",
    "Григорий Шафигулин ",
    "Марат Давыдов ",
    "Артем Чернов ",
    "Никита Точицкий ",
    "Артем Тернавски ",
    "Георгий Мишарин ",
    "Дмитрий Ерофеев ",
    "Ремир Хайдаров ",
    "Сергей Золотов ",
    "Вячеслав Козлов ",
    "Андрей Евстафьев ",
    "Олег Болтунов ",
    "Юрий Трубачев ",
    "Игорь Скороходов ",
    "Александр Суглобов ",
    "Сергей Клементьев ",
    "Александр Кузнецов ",
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
    <div
      className="justify-center items-center flex flex-col my-7 px-2 lg:px-0 lg:my-6"
      style={{ zoom: window.innerWidth >= 1024 ? 0.9 : 1 }}
    >
      <div className="w-full max-w-5xl">
        <h2 className="font-bold text-3xl leading-7 lg:leading-9 text-[#171D3D] lg:text-4xl w-10/12">
          С НАМИ РАБОТАЛИ ТАКИЕ ИЗВЕСТНЫЕ ИГРОКИ КАК
        </h2>
      </div>
      <div
        ref={partnersRef}
        className="font-bold text-[17px] lg:text-[32px] leading-[17px] lg:leading-[32px] text-[#ECECEC] text-justify max-w-5xl mt-6"
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
