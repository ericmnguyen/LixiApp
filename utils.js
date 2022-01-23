export const generateMoney = () => {
  const rand = Math.floor(Math.random() * 100) + 1;
  if (rand <= 10) return '200.000';
  else if (rand > 10 && rand <= 30) return '20.000';
  else if (rand > 30 && rand <= 50) return '100.000';
  else {
    return '50.000';
  }
};
