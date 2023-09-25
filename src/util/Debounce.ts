export function createDebounce() {
  let timeout: NodeJS.Timeout | null = null;
  return function debounce(func: () => void, wait: number) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(func, wait)
  };
}

export function createThrottle() {
  let timeout: NodeJS.Timeout | null = null;
  return function throttle(func: () => void, wait: number) {
    if (timeout === null) {
      func();

      timeout = setTimeout(() => {
        timeout = null
      }, wait)
    }
  };
}