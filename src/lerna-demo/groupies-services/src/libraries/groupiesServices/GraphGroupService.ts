import { MSGraphClient } from "@microsoft/sp-http";

export interface IGraphGroup {
  title: string;
  description: string;
}

export class GraphGroupService {
  private _graphClient: MSGraphClient;

  constructor(graphClient: MSGraphClient) {
    this._graphClient = graphClient;
  }

  public getTopGroups(top: number): Promise<IGraphGroup[]> {
    return new Promise<IGraphGroup[]>((resolve, reject) => {
      try {
        this._graphClient
          .api(`groups?$top=${top}`)
          .select("displayName, description")
          .get((err, res) => {
            if (err) {
              console.error(err);
              reject(err);
            }
            var groups: Array<IGraphGroup> = new Array<IGraphGroup>();
            res.value.map((item: any) => {
              groups.push({
                title: item.displayName,
                description: item.description,
              });
            });

            resolve(groups);
          });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }
}
