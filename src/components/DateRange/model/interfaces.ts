export interface DateInterface {
  year: number;
  month: number;
  date?: number;
  day?: number;
}

export interface DateRangeInterface {
  itemList: string[];
  callBack: (result: ResultInterface) => void;
}

export interface SelectBarInterface {
  onDateSelectClickHandler: (query: string) => void;
  onItemSelectClickHandler: () => void;
  callBack: () => void;
  calendarOn: string;
  itemSelectOn: boolean;
  selectedItem: string;
  startDate: DateInterface;
  endDate: DateInterface;
}

export interface CalendarInterface {
  settingStartDate: (date: DateInterface) => void;
  settingEndDate: (date: DateInterface) => void;
  calendarOn: string;
  startDate: DateInterface;
  endDate: DateInterface;
}

export interface ResultInterface {
  item: string;
  start: DateInterface;
  end: DateInterface;
}
