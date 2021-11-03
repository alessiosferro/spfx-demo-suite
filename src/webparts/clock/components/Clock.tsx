import { IClockProps } from './IClockProps';
import {FunctionComponent, useEffect, useState} from "react";
import * as React from 'react';
import * as dayjs from 'dayjs';

const Clock: FunctionComponent<IClockProps> = props => {
  const [date, setDate] = useState(() => dayjs().set('hour', props.initialHour));

  useEffect(() => {
    setDate(currentDate => currentDate.set('hour', props.initialHour));
  }, [props.initialHour]);

  useEffect(() => {
    const id = setInterval(() => {
      setDate(currentDate => currentDate.add(1, 'second'));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <h1 style={{textAlign: props.clockAlignment}}>{date.format('DD/MM/YYYY HH:mm:ss')}</h1>;
}

export default Clock;
