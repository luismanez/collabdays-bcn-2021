import * as React from 'react';
import styles from './Groupies.module.scss';
import { IGroupiesProps, IGroupiesState } from './IGroupiesProps';
import { MSGraphClient } from '@microsoft/sp-http';

import { GraphGroupService } from 'groupies-services';
import { GraphGroup } from 'groupies-ui';
import { IGraphGroup } from 'groupies-services/lib/libraries/groupiesServices/GraphGroupService';

export default class Groupies extends React.Component<IGroupiesProps, IGroupiesState> {

  constructor(props: IGroupiesProps) {
    super(props);    
    this.state = {
      groups: []
    };
  }

  private async _getGroups(client: MSGraphClient): Promise<IGraphGroup[]> {
    const graphGroupService = new GraphGroupService(client);
    const groups = await graphGroupService.getTopGroups(5);
    return groups;
  }

  public componentDidMount(): void {
    this.props.graphClientFactory.getClient().then(client => {
      this._getGroups(client).then(groups => {
        this.setState({
          groups: groups
        });
      });
    });
  }

  public render(): React.ReactElement<IGroupiesProps> {
    if (this.state.groups) {
      const groupList: JSX.Element[] = this.state.groups.map(g => {
        return <li><GraphGroup title={g.title} description={g.description} /></li>;
      });

      return (
        <div className={ styles.groupies }>
          <div className={ styles.container }>
            <div className={ styles.row }>
              <div className={ styles.column }>
                <ul>
                  {groupList}
                </ul>                
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>loading data...</div>
      );
    }    
  }
}
