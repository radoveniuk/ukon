import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import Dialog from 'rc-dialog';

import { CloseIcon, DropdownIcon, MinusIcon, PlusIcon } from 'common/components/icons';

import styles from 'styles/components/OrderForm/ActivitiesListDialog.module.scss';

import activities from '../../data/activities.json';

import { CONTROLLABLE_TYPE, CRAFT_TYPE, FREE_TYPE } from './constants';
import { Activity } from './types';

import 'rc-dialog/assets/index.css';

const PANELS = [
  {
    name: 'freeActivities',
    list: activities.filter((item) => item.Type === FREE_TYPE),
  },
  {
    name: 'craftActivities',
    list: activities.filter((item) => item.Type === CRAFT_TYPE),
  },
  {
    name: 'controllableActivities',
    list: activities.filter((item) => item.Type === CONTROLLABLE_TYPE),
  },
];

type Props = {
  onClose(): void;
  visible: boolean;
  onSelect(v: Activity): void;
  onSelectMany?(v: Activity[]): void;
  onUnSelect?(v: Activity): void;
  selectedItems?: Activity[];
  closeAfterSelect?: boolean;
};

const ActivitiesListDialog = ({ onClose, visible, onSelect, closeAfterSelect, selectedItems, onUnSelect, onSelectMany }: Props) => {
  const translation = useTranslation('forms');
  const [openPanel, setOpenPanel] = useState<null | string>('freeActivities');

  return (
    <Dialog
      destroyOnClose
      closeIcon={<CloseIcon size={20} />}
      zIndex={101}
      onClose={onClose}
      visible={visible}
      wrapClassName={styles.dialogWrap}
      width={700}
    >
      <div className={styles.content}>
        <div className={classNames('h3', styles.title)}>{translation.t('activity')}</div>
        {PANELS.map((panelData) => (
          <div key={panelData.name} className={styles.activitiesPanel}>
            <div className={styles.top} onClick={() => void setOpenPanel((prev) => prev === panelData.name ? null : panelData.name)}>
              <div className={classNames('t1', styles.top__title)}>{translation.t(panelData.name)}</div>
              {!!onSelectMany && (
                <div
                  role="button"
                  className={styles.top__add}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectMany?.(panelData.list);
                  }}
                >
                  {translation.t('addAll')}
                </div>
              )}
              <div role="button" className={styles.top__dropdown}><DropdownIcon /></div>
            </div>
            <div className={classNames(styles.bot, openPanel === panelData.name ? styles.open : '')}>
              {panelData.list.map((activity) => (
                <div
                  key={activity.Id}
                  className={classNames(styles.botItem, selectedItems?.some((item) => item.Id === activity.Id) ? styles.active : '')}
                  onClick={() => {
                    if (!selectedItems?.some((item) => item.Id === activity.Id)) {
                      onSelect(activity);
                      if (closeAfterSelect) {
                        onClose();
                      }
                    } else {
                      onUnSelect?.(activity);
                    }
                  }}
                >
                  <div className={styles.botItem__title}>{activity.ru}</div>
                  <div className={styles.botItem__price}>{activity.Type !== FREE_TYPE ? '+7.50€' : ''}</div>
                  <div className={styles.botItem__add}>{selectedItems?.some((item) => item.Id === activity.Id) ? <MinusIcon /> : <PlusIcon />}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Dialog>
  );
};

export default ActivitiesListDialog;
