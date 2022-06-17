import { customAlphabet } from "nanoid";

const ALPHABET =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LENGTH = 20;

const nanoid = customAlphabet(ALPHABET, LENGTH);

export const getRandomUid = () => nanoid();
