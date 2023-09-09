import { Button } from 'antd';
import clsx from 'clsx';
import { FC, memo, useCallback, useEffect, useState } from 'react';

import $styles from './style.module.css';

const Info: FC<{ call: () => void }> = memo(() => {
  console.log('渲染消息');
  return null;
});

export const CallbackDemo: FC = () => {
  const [, setCount] = useState<number>(0);
  const changeCount = () => setCount(Math.ceil(Math.random() * 10));
  const getInfo = useCallback(() => {}, []);
  useEffect(() => {
    console.log('getInfo函数的值改变');
  }, [getInfo]);
  return (
    <div className={clsx($styles.container, 'w-[20rem]')}>
      <h2 className="text-center">useCallback Demo</h2>
      <div className="flex justify-around">
        <Info call={getInfo} />
        <Button onClick={changeCount} type="dashed">
          变化coun1
        </Button>
      </div>
    </div>
  );
};
