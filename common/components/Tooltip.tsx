import React, { PropsWithChildren } from 'react';
import { Tooltip as ReactTooltip } from '@nextui-org/react';

import ReactHtmlParser from 'common/utils/ReactHtmlParser';

type Props = {
  content: string | React.ReactNode;
}

export default function Tooltip({ content, children }: PropsWithChildren<Props>) {
  return (
    <ReactTooltip content={<ReactHtmlParser content={content} />}>
      {children}
    </ReactTooltip>
  );
}

