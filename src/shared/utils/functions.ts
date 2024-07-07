export function getRandomChartData(total: number) {
  let chartData: number[] = [];
  const currentHour = new Date().getHours();
  const numberOfIntervals = Math.floor(currentHour / 2) + 1;
  const totalAmount = total;

  chartData = Array.from({ length: numberOfIntervals }, () => Math.random());

  const sumOfRandomValues = chartData.reduce((acc, value) => acc + value, 0);
  chartData = chartData.map(
    (value) => (value / sumOfRandomValues) * totalAmount
  );

  const adjustedTotalAmount = chartData.reduce(
    (acc, value) => acc + Math.floor(value),
    0
  );
  chartData = chartData.map(Math.floor);

  let remainder = totalAmount - adjustedTotalAmount;
  while (remainder > 0) {
    const randomIndex = Math.floor(Math.random() * numberOfIntervals);
    chartData[randomIndex]++;
    remainder--;
  }

  return chartData;
}
