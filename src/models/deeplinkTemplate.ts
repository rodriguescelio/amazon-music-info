import { DeeplinkTemplateHeader } from "./deeplinkTemplateHeader";
import { DeeplinkTemplateWidget } from "./deeplinkTemplateWidget";

export interface DeeplinkTemplate {
  interface: string;
  headerText: DeeplinkTemplateHeader;
  widgets: DeeplinkTemplateWidget[];
  headerPrimaryText: string;
  headerSecondaryText: string;
  headerTertiaryText: string;
}
