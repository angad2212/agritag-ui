export const DEMO_VIDEO_URL =
  "https://drive.google.com/file/d/1MahkVZP8DVjzt4BJVWJX2Rehi97AcTcy/view?usp=drive_link";

export const openDemoVideo = () => {
  if (typeof window !== "undefined") {
    window.open(DEMO_VIDEO_URL, "_blank", "noopener,noreferrer");
  }
};

