import { DeeplinkTemplate } from "./deeplinkTemplate";

export interface DeeplinkMethod {
  interface: string;
  template: DeeplinkTemplate;
  screenMode: string;
  queue: {
    interface: string;
    id: string;
  },
  forced: boolean;
}
