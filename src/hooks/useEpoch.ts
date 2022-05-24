import { useEffect, useState } from "react";

const getEpoch = () => {
  return Math.floor(Date.now() / 1000);
};

export const useEpoch = (interval = 1000) => {
  const [epoch, setEpoch] = useState(getEpoch());

  const updateEpoch = () => setEpoch(getEpoch());

  useEffect(() => {
    const timer = setInterval(updateEpoch, interval);
    return () => clearInterval(timer);
  }, []);

  return epoch;
};
