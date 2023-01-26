import { ITooltip as Props, Tooltip as ReactTooltip } from 'react-tooltip';

import 'react-tooltip/dist/react-tooltip.css';

export default function Tooltip(props: Props) {
  return (
    <ReactTooltip {...props} />
  );
}