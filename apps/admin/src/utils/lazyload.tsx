import loadable from '@loadable/component';
import { Spin } from 'antd';

// https://github.com/gregberge/loadable-components/pull/226
function load(fn: any, options: any) {
  const Component = loadable(fn, options);

  Component.preload = fn.requireAsync || fn;

  return Component;
}

// eslint-disable-next-line react-refresh/only-export-components
function LoadingComponent(props: {
  error: boolean;
  timedOut: boolean;
  pastDelay: boolean;
}) {
  if (props.error) {
    console.error(props.error);
    return null;
  }
  return (
    <div>
      <Spin />
    </div>
  );
}

const loader = (loader: any) =>
  load(loader, {
    fallback: LoadingComponent({
      pastDelay: true,
      error: false,
      timedOut: false,
    }),
  });

export default loader as any;
