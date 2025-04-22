export const requestAnimationFrame: typeof window.requestAnimationFrame =
  (window as any).requestAnimationFrame ||
  (window as any).mozRequestAnimationFrame ||
  (window as any).webkitRequestAnimationFrame ||
  (window as any).msRequestAnimationFrame
