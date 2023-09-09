import { Button } from 'antd';
import { useEffect, useState } from 'react';

import $styles from './style.module.css';

const EffectDemo: FC = () => {
  const [red, setRed] = useState<boolean>(false);
  const [ghost, setGhost] = useState<boolean>(false);
  const [width, setWidth] = useState(window.innerWidth);
  const toggleGhostBtn = () => setGhost(!ghost);
  const resizeHandle = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', resizeHandle);
    return () => {
      window.removeEventListener('resize', resizeHandle);
    };
  }, [width]);
  useEffect(() => {
    (async () => {
      await new Promise((resolve) => {
        setTimeout(() => resolve(true), 1000);
      });
      setRed(ghost);
    })();
  }, [ghost]);
  return (
    <div className={$styles.container}>
      <h2 className="text-center">useEffect Demo</h2>
      <p className="text-center py-5">{ghost ? 'ghost' : '普通'}按钮</p>
      <div className="flex justify-center flex-col">
        <Button type="primary" onClick={toggleGhostBtn} ghost={ghost} danger={red}>
          切换按钮样式
        </Button>
        <p className="pt-5 text-center">宽度为: {width}</p>
      </div>
    </div>
  );
};
export default EffectDemo;
