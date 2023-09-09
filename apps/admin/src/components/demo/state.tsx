import { Button } from 'antd';
import { clsx } from 'clsx';
import { useState } from 'react';

import $styles from './style.module.css';

const StateDemo: FC = () => {
  const [count, setCount] = useState(1);
  const [isShow, toggleShow] = useState(true);

  return (
    <div className={clsx($styles.container, 'w-[20rem]')}>
      <h2 className="text-center">useState Demo</h2>
      {isShow && <p className="text-center py-5">{count}</p>}
      <div className="flex justify-around">
        <Button onClick={() => setCount(count + 1)} type="dashed">
          增加
        </Button>
        <Button onClick={() => setCount(count - 1)} type="dashed">
          减少
        </Button>
        <Button onClick={() => toggleShow(!isShow)} type="dashed">
          {isShow ? '显示' : '隐藏'}
        </Button>
      </div>
    </div>
  );
};
export default StateDemo;
