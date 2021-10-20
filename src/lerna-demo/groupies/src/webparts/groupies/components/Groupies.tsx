import * as React from 'react';
import styles from './Groupies.module.scss';
import { IGroupiesProps } from './IGroupiesProps';

import { GroupiesServicesLibrary } from 'groupies-services';
import { GroupiesComponentsLibrary } from 'groupies-ui';

export default class Groupies extends React.Component<IGroupiesProps, {}> {
  public render(): React.ReactElement<IGroupiesProps> {

    const serviceLib = new GroupiesServicesLibrary();
    const serviceLibName = serviceLib.name();

    const uiLib = new GroupiesComponentsLibrary();
    const uiLibName = uiLib.name();

    return (
      <div className={ styles.groupies }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to CollabDays Barcelona 2021 !!!!!</span>
              <p>Testing GroupiesServices: {serviceLibName}</p>
              <p>Testing GroupiesComponents: {uiLibName}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
