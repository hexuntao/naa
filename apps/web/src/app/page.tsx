import { FC } from 'react';

import { ThemeSwitch } from '@/components/ThemeSwitch';
import ModalBlur from '@/components/ModalBlur';

const App: FC = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 p-8 md:p-10">
      <ThemeSwitch />
      <ModalBlur />
    </section>
  );
};
export default App;
