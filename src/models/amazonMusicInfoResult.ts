import { AmazonMusicInfoResultItem } from "./AmazonMusicInfoResultItem";
import { AmazonMusicUrlType } from "./amazonMusicUrlType";

export interface AmazonMusicInfoResult {
  type: AmazonMusicUrlType;
  items: AmazonMusicInfoResultItem[];
  title: string;
}
