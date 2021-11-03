declare interface IClockWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  InitialHourLabel: string
}

declare module 'ClockWebPartStrings' {
  const strings: IClockWebPartStrings;
  export = strings;
}
