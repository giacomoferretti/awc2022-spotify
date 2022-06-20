import { describe, expect, it } from "vitest";

import { msToTime, msToTimeLong } from "./time";

describe("msToTime", () => {
  it("1 second", () => {
    expect(msToTime(1000)).toBe("0:01");
  });

  it("10 seconds", () => {
    expect(msToTime(10000)).toBe("0:10");
  });

  it("1 minute", () => {
    expect(msToTime(60000)).toBe("1:00");
  });

  it("10 minutes", () => {
    expect(msToTime(600000)).toBe("10:00");
  });

  it("1 hour", () => {
    expect(msToTime(3600000)).toBe("1:00:00");
  });

  it("1 hour 10 seconds", () => {
    expect(msToTime(3610000)).toBe("1:00:10");
  });

  it("1 hour 10 minutes", () => {
    expect(msToTime(4200000)).toBe("1:10:00");
  });

  it("10 hours", () => {
    expect(msToTime(36000000)).toBe("10:00:00");
  });
});

describe("msToTimeLong", () => {
  it("4 ore 21 minuti", () => {
    expect(msToTimeLong(15695000)).toBe("4 ore 21 minuti");
  });

  it("3 minuti 39 secondi", () => {
    expect(msToTimeLong(219000)).toBe("3 minuti 39 secondi");
  });

  it("29 secondi", () => {
    expect(msToTimeLong(29000)).toBe("29 secondi");
  });
});
