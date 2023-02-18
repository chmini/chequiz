import { worker } from "./browser";

const initializeMockupWorker = () => {
  if (process.env.NODE_ENV === "development") {
    worker.start({ onUnhandledRequest: "bypass" });
  }
};

export default initializeMockupWorker;
