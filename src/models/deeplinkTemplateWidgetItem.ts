export interface DeeplinkTemplateWidgetItem {
  interface: string;
  primaryText: string | {
    text: string;
  };
  primaryLink: {
    interface: string;
    deeplink: string;
  };
  image: string;
  secondaryText: string;
  secondaryLink: {
    interface: string;
    deeplink: string;
  };
  secondaryText1: string;
  secondaryText1Link: {
    interface: string;
    deeplink: string;
  };
  secondaryText2: string;
  secondaryText2Link: {
    interface: string;
    deeplink: string;
  };
  secondaryText3: string;
  secondaryText3Link: {
    interface: string;
    deeplink: string;
  };
}
