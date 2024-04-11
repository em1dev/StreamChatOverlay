export const pickRandom = <T>(items: Array<T>):T => {
  const randomIndex = Math.floor((Math.random() * 10 ) % items.length);
  const item = items.at(randomIndex);
  if (!item) throw new Error('invalid index');
  return item;
};