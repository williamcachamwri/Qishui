// src/services/desktopLyrics/type.ts
// @ts-nocheck

let desktopLyricsFontSizeSet: any = [12, 16, 20, 24, 28, 32, 36, 40];

let desktopLyricsFontSizeWidthMap: any = {
        12: 480,
        16: 520,
        20: 580,
        24: 640,
        28: 800,
        32: 880,
        36: 960,
        40: 1080
      };

let desktopLyricsColorSet: any = [
        {
          label: "\u767E\u642D\u7070",
          key: "gray",
          focusColor: "rgba(153, 255, 170, 1)",
          blurColor: "rgba(179, 179, 179, 1)"
        },
        {
          label: "\u660E\u4EAE\u767D",
          key: "light",
          focusColor: "rgba(153, 255, 170, 1)",
          blurColor: "white",
          filter: "drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.6))"
        },
        {
          label: "\u6DF1\u6C89\u9ED1",
          key: "dark",
          focusColor: "rgba(44, 197, 19, 1)",
          blurColor: "rgba(0, 0, 0, 0.8)",
          dark: true
        }
      ];

export {
  desktopLyricsFontSizeWidthMap,
  desktopLyricsFontSizeSet,
  desktopLyricsColorSet
};
