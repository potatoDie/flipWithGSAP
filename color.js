export function getRandomColor() {
  const color = {
    r: 0,
    g: 0,
    b: 0
  };

  for (let c in color) {
    color[c] = Math.floor(Math.random() * 256);
  }

  return `rgb(${color.r}, ${color.g}, ${color.b})`;
}
