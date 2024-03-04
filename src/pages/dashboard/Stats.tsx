import { StatCard } from "./StatCard";

export const Stats = () => {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 2xl:grid-cols-5">
      <StatCard
        title="Чистая прибыль"
        value="2,000,000"
        diff={{
          value: "1,300,000",
          direction: "up",
          percentage: "60",
          isPositive: true,
        }}
      />
      <StatCard
        title="Чистая прибыль на товар"
        value="300,000"
        diff={{
          value: "200,000",
          direction: "up",
          percentage: "30",
          isPositive: true,
        }}
      />
      <StatCard
        title="Процент выкупа"
        value="43,3%"
        diff={{
          value: "45,1%",
          direction: "down",
          percentage: "2,2%",
          isPositive: false,
        }}
      />
      <StatCard
        title="ROI"
        value="60%"
        diff={{
          value: "62,1%",
          direction: "down",
          percentage: "2,1%",
          isPositive: false,
        }}
      />
      <StatCard
        title="Локализация"
        value="72%"
        diff={{
          value: "69%",
          direction: "up",
          percentage: "3%",
          isPositive: true,
        }}
      />
      <StatCard
        title="Маржинальность"
        value="32%"
        diff={{
          value: "30%",
          direction: "up",
          percentage: "2%",
          isPositive: true,
        }}
      />
      <StatCard
        title="Заказы/Прибыль"
        value="639,523"
        diff={{
          value: "600,000",
          direction: "up",
          percentage: "6,6",
          isPositive: true,
        }}
      />
      <StatCard
        title="ROA"
        value="18%"
        diff={{
          value: "15%",
          direction: "down",
          percentage: "3%",
          isPositive: false,
        }}
      />
      <StatCard
        title="ДДР"
        value="15%"
        diff={{
          value: "10%",
          direction: "up",
          percentage: "60",
          isPositive: false,
        }}
      />
    </div>
  );
};
