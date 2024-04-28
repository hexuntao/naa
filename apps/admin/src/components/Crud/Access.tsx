import React, { PropsWithChildren } from 'react';
export interface AccessProps {
  accessible?: boolean;
  fallback?: React.ReactNode;
}
export const Access: React.FC<PropsWithChildren<AccessProps>> = (props) => {
  // if (process.env.NODE_ENV === 'development' && typeof props.accessible !== 'boolean') {
  //   throw new Error('[access] the `accessible` property on <Access /> should be a boolean');
  // }

  return <>{props.accessible ? props.children : props.fallback}</>;
};
