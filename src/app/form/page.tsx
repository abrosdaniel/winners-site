"use client";

import { useState } from "react";
import { Button } from "@ui/button";
import Link from "next/link";
import { Label } from "@ui/label";
import { Checkbox } from "@ui/checkbox";
import Field from "@kit/Field";
import { DateField, DateInput, DateSegment } from "react-aria-components";
import ReCAPTCHA from "react-google-recaptcha";

export default function Form() {
  const [formData, setFormData] = useState<Record<string, string | boolean>>(
    {}
  );
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requiredFields = [
    "name",
    "birthday",
    "email",
    "phone",
    "height",
    "weight",
    "citizenship",
    "residence-city",
    "grip",
    "role",
    "role-options",
    "stats",
    "team",
    "date-end-contract",
    "pair-game",
    "start-school",
    "phone-trainer",
    "visit-last3",
    "national-team",
    "all-teams",
    "swap-team",
    "visit-last1",
    "preferences",
    "injuries",
    "qualities",
    "style-play",
    "agent",
    "agency",
    "transfer",
    "salary",
    "new-salary",
    "youtube",
    "photo",
    "policy",
  ];

  const handleInputChange = (id: string, value: string | boolean) => {
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    if (value) {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: false }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    const dateFields = ["birthday", "date-end-contract"];

    requiredFields.forEach((field) => {
      const value = formData[field];

      if (field === "policy") {
        if (!value) {
          newErrors[field] = true;
        }
      } else if (dateFields.includes(field)) {
        if (!value || isNaN(Date.parse(value.toString()))) {
          newErrors[field] = true;
        }
      } else if (
        value === undefined ||
        value === null ||
        value.toString().trim() === ""
      ) {
        newErrors[field] = true;
      }
    });

    if (!captchaToken) {
      newErrors["captcha"] = true;
    }

    console.log("Ошибки после проверки:", newErrors);
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);
    const isValid = validateForm();
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }
    await sendData();
  };

  const sendData = async () => {
    try {
      console.log("Отправка данных на сервер. Данные:", {
        ...formData,
        captchaToken,
      });

      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, captchaToken }),
      });

      if (response.ok) {
        console.log("Форма успешно отправлена.");
        alert("Форма успешно отправлена!");
        setFormData({});
        setErrors({});
        setCaptchaToken(null);
      } else {
        alert("Произошла ошибка. Попробуйте позже.");
      }
    } catch (error) {
      alert("Произошла ошибка. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <img
        className="object-cover object-top h-44 w-full lg:h-[400px]"
        src="/assets/img/head/form.png"
      />
      <div
        className="py-8 w-full box-border max-w-5xl mx-auto relative"
        style={{ zoom: window.innerWidth >= 1024 ? 0.9 : 1 }}
      >
        <div className="px-2 mb-7">
          <h2 className="font-bold text-6xl text-[#171D3D]">анкета</h2>
          <h3 className="font-inter font-normal text-sm bg-orange-500 text-white rounded-full py-1 px-5 text-center w-max">
            АНКЕТЫ РАССМАТРИВАЮТСЯ В ТЕЧЕНИЕ 14 ДНЕЙ
          </h3>
          <p className="font-inter font-normal text-base leading-5 mt-5 w-11/12 lg:w-5/12">
            Если вы хотите стать клиентом Хоккейного агентства WINNERS
            необходимо заполнить все поля. В случае положительного решения с
            вами свяжутся по указанным в анкете контактам.
          </p>
        </div>
        <form
          className="w-full flex flex-col lg:border lg:p-6 lg:gap-6 lg:rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="bg-[#D6D6D61C] p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-6 lg:flex-row">
              <Field
                id="name"
                label="ФИО"
                placeholder="Иванов Иван Иванович"
                onChange={(e) => handleInputChange("name", e.target.value)}
                value={(formData["name"] || "") as string}
                error={errors["name"]}
                type="text"
              />
              <DateField
                aria-label="Дата рождения"
                className="space-y-2 font-inter font-normal text-base lg:flex-1"
                onChange={(date) =>
                  handleInputChange("birthday", date ? date.toString() : "")
                }
              >
                <Label
                  htmlFor="birthday"
                  className="text-[#171D3D] font-normal text-base"
                >
                  Дата рождения
                </Label>
                <DateInput
                  className={`relative inline-flex h-10 w-full items-center overflow-hidden whitespace-nowrap rounded-none border-b bg-transparent py-2 font-normal ${
                    errors["birthday"] ? "border-red-500" : ""
                  }`}
                >
                  {(segment) => (
                    <DateSegment
                      segment={segment}
                      className="inline rounded p-0.5 text-foreground caret-transparent outline outline-0 data-[disabled]:cursor-not-allowed data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-muted-foreground/70 data-[type=literal]:text-muted-foreground/70 data-[disabled]:opacity-50"
                    />
                  )}
                </DateInput>
                {errors["birthday"] && (
                  <p
                    className="mt-2 text-xs text-red-500"
                    role="alert"
                    aria-live="polite"
                  >
                    Заполните поле
                  </p>
                )}
              </DateField>
              <Field
                id="email"
                label="Ваш E-Mail"
                placeholder="info@wnrs.ru"
                type="email"
                value={(formData["email"] || "") as string}
                onChange={(e) => handleInputChange("email", e.target.value)}
                error={errors["email"]}
              />
              <Field
                id="phone"
                label="Номер телефона"
                placeholder="+7 (999) 999-99-99"
                type="phone"
                value={(formData["phone"] || "") as string}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                error={errors["phone"]}
              />
            </div>
            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="flex flex-row gap-6 lg:flex-1">
                <Field
                  id="height"
                  label="Рост (см)"
                  placeholder="183"
                  type="number"
                  value={(formData["height"] || "") as string}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  error={errors["height"]}
                />
                <Field
                  id="weight"
                  label="Вес (кг)"
                  placeholder="93"
                  type="number"
                  value={(formData["weight"] || "") as string}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  error={errors["weight"]}
                />
              </div>
              <Field
                id="citizenship"
                label="Гражданство"
                placeholder="Россия"
                type="text"
                value={(formData["citizenship"] || "") as string}
                onChange={(e) =>
                  handleInputChange("citizenship", e.target.value)
                }
                error={errors["citizenship"]}
              />
              <Field
                id="residence-city"
                label="Город проживания"
                placeholder="Москва"
                type="text"
                value={(formData["residence-city"] || "") as string}
                onChange={(e) =>
                  handleInputChange("residence-city", e.target.value)
                }
                error={errors["residence-city"]}
              />
            </div>
          </div>
          <div className="bg-[#F7F9FF] p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-6 lg:flex-row">
              <Field
                id="grip"
                label="Хват клюшки (ловушки для вратаря)"
                placeholder="Правый/левый хват"
                type="text"
                value={(formData["grip"] || "") as string}
                onChange={(e) => handleInputChange("grip", e.target.value)}
                error={errors["grip"]}
              />
              <Field
                id="role"
                label="Амплуа"
                placeholder="Левый/правый/центральный"
                type="text"
                value={(formData["role"] || "") as string}
                onChange={(e) => handleInputChange("role", e.target.value)}
                error={errors["role"]}
              />
              <Field
                id="role-options"
                label="В каком амплуа можешь выступать еще?"
                placeholder=""
                type="text"
                value={(formData["role-options"] || "") as string}
                onChange={(e) =>
                  handleInputChange("role-options", e.target.value)
                }
                error={errors["role-options"]}
              />
            </div>
            <div className="flex flex-col gap-6 lg:flex-row">
              <Field
                id="stats"
                label="Статистика за последние 2 года"
                placeholder={"2025\n2024"}
                isTextarea
                value={(formData["stats"] || "") as string}
                onChange={(e) => handleInputChange("stats", e.target.value)}
                error={errors["stats"]}
              />
            </div>
            <div className="flex flex-col gap-6 lg:flex-row">
              <Field
                id="team"
                label="Клуб этого сезона"
                placeholder={"Указать"}
                type="text"
                value={(formData["team"] || "") as string}
                onChange={(e) => handleInputChange("team", e.target.value)}
                error={errors["team"]}
              />
              <DateField
                aria-label="Дата окончания действующего контракта"
                className="space-y-2 font-inter font-normal text-base lg:flex-1"
                onChange={(date) =>
                  handleInputChange(
                    "date-end-contract",
                    date ? date.toString() : ""
                  )
                }
              >
                <Label
                  htmlFor="date-end-contract"
                  className="text-[#171D3D] font-normal text-base"
                >
                  Дата окончания действующего контракта
                </Label>
                <DateInput
                  className={`relative inline-flex h-10 w-full items-center overflow-hidden whitespace-nowrap rounded-none border-b bg-transparent py-2 font-normal ${
                    errors["date-end-contract"] ? "border-red-500" : ""
                  }`}
                >
                  {(segment) => (
                    <DateSegment
                      segment={segment}
                      className="inline rounded p-0.5 text-foreground caret-transparent outline outline-0 data-[disabled]:cursor-not-allowed data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-muted-foreground/70 data-[type=literal]:text-muted-foreground/70 data-[disabled]:opacity-50"
                    />
                  )}
                </DateInput>
                {errors["date-end-contract"] && (
                  <p
                    className="mt-2 text-xs text-red-500"
                    role="alert"
                    aria-live="polite"
                  >
                    Заполните поле
                  </p>
                )}
              </DateField>
            </div>
            <div className="flex flex-col gap-6 lg:flex-row">
              <Field
                id="pair-game"
                label="В какой тройке или паре выходишь в большинстве игр текущего
                  сезона?"
                placeholder={"Указать"}
                isTextarea
                value={(formData["pair-game"] || "") as string}
                onChange={(e) => handleInputChange("pair-game", e.target.value)}
                error={errors["pair-game"]}
              />
            </div>
          </div>
          <div className="bg-[#FFDFB740] p-6 flex flex-col gap-6">
            <Field
              id="start-school"
              label="Воспитанником какой спортивной школы являешься и год окончания?
                (город, название, тренер, контакты тренера)"
              placeholder={"Указать"}
              isTextarea
              value={(formData["start-school"] || "") as string}
              onChange={(e) =>
                handleInputChange("start-school", e.target.value)
              }
              error={errors["start-school"]}
            />
            <Field
              id="phone-trainer"
              label="Номер телефона тренера"
              placeholder={"+7 999 999 99 99"}
              type="tel"
              value={(formData["phone-trainer"] || "") as string}
              onChange={(e) =>
                handleInputChange("phone-trainer", e.target.value)
              }
              error={errors["phone-trainer"]}
            />
            <Field
              id="visit-last3"
              label="В каких клубах был на просмотре за последние 3 года? (ФИО
                тренера)"
              placeholder={"2025\n2024\n2023"}
              isTextarea
              value={(formData["visit-last3"] || "") as string}
              onChange={(e) => handleInputChange("visit-last3", e.target.value)}
              error={errors["visit-last3"]}
            />
            <Field
              id="national-team"
              label="Вызывали в сборную? (год, тренер, контакты тренера, сборная)"
              placeholder={
                "2025\nИванов Иван Иванович\n+7 999 999 99 99\nНазвание сборной"
              }
              isTextarea
              value={(formData["national-team"] || "") as string}
              onChange={(e) =>
                handleInputChange("national-team", e.target.value)
              }
              error={errors["national-team"]}
            />
            <Field
              id="all-teams"
              label="В каких клубах играл?"
              placeholder={"Название клуба"}
              isTextarea
              value={(formData["all-teams"] || "") as string}
              onChange={(e) => handleInputChange("all-teams", e.target.value)}
              error={errors["all-teams"]}
            />
            <Field
              id="swap-team"
              label="Готов ли ты поменять клуб и почему?"
              placeholder={"Указать"}
              isTextarea
              value={(formData["swap-team"] || "") as string}
              onChange={(e) => handleInputChange("swap-team", e.target.value)}
              error={errors["swap-team"]}
            />
            <Field
              id="visit-last1"
              label="В каких клубах был на просмотре в этом году?"
              placeholder={"Указать"}
              isTextarea
              value={(formData["visit-last1"] || "") as string}
              onChange={(e) => handleInputChange("visit-last1", e.target.value)}
              error={errors["visit-last1"]}
            />
            <Field
              id="preferences"
              label="Предпочтения в выборе клуба или все равно? (лига, регион, город,
                тренер и пр.)"
              placeholder={"Указать"}
              isTextarea
              value={(formData["preferences"] || "") as string}
              onChange={(e) => handleInputChange("preferences", e.target.value)}
              error={errors["preferences"]}
            />
          </div>
          <div className="bg-[#DAF3E33B] p-6 flex flex-col gap-6">
            <Field
              id="injuries"
              label="Какие серьезные травмы получал за карьеру, были ли операции и на какие органы?"
              placeholder={"Указать"}
              isTextarea
              value={(formData["injuries"] || "") as string}
              onChange={(e) => handleInputChange("injuries", e.target.value)}
              error={errors["injuries"]}
            />
            <Field
              id="qualities"
              label="Перечисли свои сильные игровые качества."
              placeholder={"Указать"}
              isTextarea
              value={(formData["qualities"] || "") as string}
              onChange={(e) => handleInputChange("qualities", e.target.value)}
              error={errors["qualities"]}
            />
            <Field
              id="style-play"
              label="Оцени сам свой стиль игры и что тебе лучше дается?"
              placeholder={"Указать"}
              isTextarea
              value={(formData["style-play"] || "") as string}
              onChange={(e) => handleInputChange("style-play", e.target.value)}
              error={errors["style-play"]}
            />
            <Field
              id="agent"
              label="Есть ли агент на данный момент или был ранее? (указать ФИО, срок взаимодействия)"
              placeholder={"Указать"}
              isTextarea
              value={(formData["agent"] || "") as string}
              onChange={(e) => handleInputChange("agent", e.target.value)}
              error={errors["agent"]}
            />
            <Field
              id="agency"
              label="Отправляли ли Вы запрос в другие агентства? (когда, какие)"
              placeholder={"Указать"}
              isTextarea
              value={(formData["agency"] || "") as string}
              onChange={(e) => handleInputChange("agency", e.target.value)}
              error={errors["agency"]}
            />
            <Field
              id="transfer"
              label="В клуб, за который выступаешь в этом сезоне, перешел без компенсации или с компенсацией? Если с компенсацией, укажи из какого клуба перешел, сумму трансфера или условия перехода."
              placeholder={"Указать"}
              isTextarea
              value={(formData["transfer"] || "") as string}
              onChange={(e) => handleInputChange("transfer", e.target.value)}
              error={errors["transfer"]}
            />
            <Field
              id="salary"
              label="Какая заработная плата у тебя в этом сезоне?"
              placeholder={"Указать"}
              isTextarea
              value={(formData["salary"] || "") as string}
              onChange={(e) => handleInputChange("salary", e.target.value)}
              error={errors["salary"]}
            />
            <Field
              id="new-salary"
              label="Какая минимальная заработная плата тебя устроит в новом клубе?"
              placeholder={"Указать"}
              isTextarea
              value={(formData["new-salary"] || "") as string}
              onChange={(e) => handleInputChange("new-salary", e.target.value)}
              error={errors["new-salary"]}
            />
            <Field
              id="youtube"
              label="Ссылки на видео материалы с YouTube"
              placeholder={"Указать"}
              isTextarea
              value={(formData["youtube"] || "") as string}
              onChange={(e) => handleInputChange("youtube", e.target.value)}
              error={errors["youtube"]}
            />
            <Field
              id="photo"
              label="Ссылки на вашу фотографию (Яндекс.Диск или другое облачное хранилище)"
              placeholder={"Указать"}
              isTextarea
              value={(formData["photo"] || "") as string}
              onChange={(e) => handleInputChange("photo", e.target.value)}
              error={errors["photo"]}
            />
          </div>
          <div
            className="mx-5 lg:mx-0 my-6 lg:my-0 flex items-center gap-2"
            style={
              {
                "--primary": "26, 100%, 52%, 1",
                "--ring": "26, 100%, 52%, 1",
              } as React.CSSProperties
            }
          >
            <Checkbox
              id="policy"
              onCheckedChange={(isChecked) => {
                const value = Boolean(isChecked);
                handleInputChange("policy", value);
              }}
            />
            <Label
              htmlFor="policy"
              className="font-inter font-normal text-xs text-[#71717A]"
            >
              Я принимаю{" "}
              <Link className="underline" href="/policy" target="_blank">
                политику конфиденциальности
              </Link>
            </Label>
          </div>
          <ReCAPTCHA
            className="mx-5 lg:mx-0 mb-6"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
            onChange={(token) => {
              setCaptchaToken(token);
              setErrors((prevErrors) => ({ ...prevErrors, captcha: false }));
            }}
          />
          <Button
            className="w-11/12 lg:w-full mx-auto box-border text-white bg-orange-500 border border-orange-500 rounded-none hover:bg-white hover:text-orange-500 font-normal text-lg leading-none font-inter"
            variant="link"
            type="submit"
            disabled={isSubmitting}
          >
            отправить
          </Button>
        </form>
      </div>
    </>
  );
}
