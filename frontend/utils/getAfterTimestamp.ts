function getAfterTimestamp(range: string): Date {
  const now = Date.now();

  switch (range) {
    case "1m":
      return new Date(now - 1 * 60 * 1000);
    case "15m":
      return new Date(now - 15 * 60 * 1000);
    case "1h":
      return new Date(now - 1 * 60 * 60 * 1000);
    case "6h":
      return new Date(now - 6 * 60 * 60 * 1000);
    case "12h":
      return new Date(now - 12 * 60 * 60 * 1000);
    default:
      throw new Error("Invalid time range");
  }
}

export default getAfterTimestamp;