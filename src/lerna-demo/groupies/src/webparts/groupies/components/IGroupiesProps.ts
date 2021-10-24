import { MSGraphClientFactory } from "@microsoft/sp-http";
import { IGraphGroup } from "groupies-services/lib/libraries/groupiesServices/GraphGroupService";
export interface IGroupiesProps {
  description: string;
  graphClientFactory: MSGraphClientFactory;
}

export interface IGroupiesState {
  groups: IGraphGroup[];
}
