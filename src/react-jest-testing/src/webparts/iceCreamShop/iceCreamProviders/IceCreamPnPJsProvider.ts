import { IceCream } from "./IceCream";
import { IIceCreamProvider } from "./IIceCreamProvider";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import {  ISearchQuery, SearchResults } from "@pnp/sp/search";

export class IceCreamPnPJsProvider implements IIceCreamProvider {

    public getAll(): Promise<IceCream[]> {

        return new Promise<IceCream[]>((resolve, reject) => {

            const query: ISearchQuery = {
                RowLimit: 10,
                SelectProperties: ["UniqueId", "Title", "PriceOWSNMBR"],
                Querytext: 'path:https://spfxjest.sharepoint.com/sites/jest/Lists/IceCreamFlavours AND contenttypeid:0x01*'
            } as ISearchQuery;

            sp.search(query).then((searchResults: SearchResults) => {

                const result = [];
                for (const item of searchResults.PrimarySearchResults) {
                    result.push({ UniqueId: item.UniqueId, Title: item.Title, Price: Math.round(item["PriceOWSNMBR"] * 100) / 100 });
                }

                resolve(result);
            }).catch(error => reject(error));
        });
    }

    public buy(uniqueid: string, quantity: number): Promise<any> {

        return new Promise<any>((resolve, reject) => {
            sp.web.lists.getByTitle('Ice Cream Orders').items.add({
                "Title": uniqueid,
                "Quantity": quantity
            })
                .then(result => resolve())
                .catch(error => reject(error));
        });
    }
}