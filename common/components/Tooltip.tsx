import { useEffect, useState } from 'react';
import { ITooltip as Props, Tooltip as ReactTooltip } from 'react-tooltip';
import classNames from 'classnames';

import styles from 'styles/components/Tooltip.module.scss';

import 'react-tooltip/dist/react-tooltip.css';
;

export default function Tooltip(props: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);
  return (
    <>{isMounted &&  <ReactTooltip variant="light" className={classNames(props.className, styles.tooltip)} {...props} />}</>
  );
}