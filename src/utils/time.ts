export const msToTime = (duration: number) => {
  const seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  if (hours > 0) {
    return (
      hours +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  }

  return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
};

export const msToTimeLong = (duration: number) => {
  const seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  const parts = [];

  if (hours > 0) {
    parts.push(hours + " ore");
  }

  if (minutes > 0) {
    parts.push(minutes + " minuti");
  }

  if (seconds > 0 && hours < 1) {
    parts.push(seconds + " secondi");
  }

  return parts.join(" ");
};
