import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'GroupiesWebPartStrings';
import Groupies from './components/Groupies';
import { IGroupiesProps } from './components/IGroupiesProps';

import { MSGraphClientFactory } from "@microsoft/sp-http";

export interface IGroupiesWebPartProps {
  description: string;
}

export default class GroupiesWebPart extends BaseClientSideWebPart<IGroupiesWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IGroupiesProps> = React.createElement(
      Groupies,
      {
        description: this.properties.description,
        graphClientFactory: this.context.msGraphClientFactory
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
