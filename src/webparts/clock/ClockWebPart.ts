import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration, PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ClockWebPartStrings';
import Clock from './components/Clock';
import { IClockProps } from './components/IClockProps';

type TextAlignment = 'left' | 'center' | 'right';

export interface IClockWebPartProps {
  initialHour: number;
  clockAlignment: TextAlignment;
}

let script = document.createElement('script');
script.src = "//localhost:35729/livereload.js?snipver=1";
document.head.appendChild(script);

export default class ClockWebPart extends BaseClientSideWebPart<IClockWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IClockProps> = React.createElement(
      Clock,
      {
        initialHour: this.properties.initialHour,
        clockAlignment: this.properties.clockAlignment
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

  private validateInitialHour(value: string): string {
    if (+value < 0 || +value >= 24) return 'Please enter a number between 0 and 23.';

    return '';
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
                PropertyPaneTextField('initialHour', {
                  label: strings.InitialHourLabel,
                  onGetErrorMessage: value => this.validateInitialHour(value)
                }),
                PropertyPaneDropdown('clockAlignment', {
                  label: 'Clock alignment',
                  options: [
                    {key: 'left', text: 'Left alignment'},
                    {key: 'center', text: 'Center alignment'},
                    {key: 'right', text: 'Right alignment'}
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
