export function random<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function range(start: number, end: number) {
  return (end - start) * Math.random() + start
}