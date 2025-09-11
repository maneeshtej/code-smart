export const setLocalItem = (key: string, value: unknown, expire: number) => {
  const now = new Date();

  const item = {
    value,
    expire: now.getTime() + expire,
  };

  localStorage.setItem(key, JSON.stringify(item));
};

export const getLocalItem = (key: string) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);

    if (!item.expire) {
      localStorage.removeItem(key);
      return null;
    }

    const now = new Date();

    if (now.getTime() > item.expire) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};
