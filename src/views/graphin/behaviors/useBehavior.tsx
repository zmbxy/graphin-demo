import React from 'react';
import GraphinContext from '../GraphinContext';

interface Props {
  type: string;
  defaultConfig: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userProps: any;
  mode?: string;
}
const useBehavior = (params: Props) => {
  const { type, defaultConfig, userProps, mode = 'default' } = params;
  const { graph } = React.useContext(GraphinContext);
  const { disabled, ...otherConfig } = userProps;

  React.useEffect(() => {
    /** 保持单例 */
    graph.removeBehaviors(type, mode);

    if (disabled) {
      return;
    }
    graph.addBehaviors(
      {
        type,
        ...defaultConfig,
        ...otherConfig,
      },
      mode
    );
    return () => {
      if (!graph.destroyed) {
        graph.removeBehaviors(type, mode);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useBehavior;
