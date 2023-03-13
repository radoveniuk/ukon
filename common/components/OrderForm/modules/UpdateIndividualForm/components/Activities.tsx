import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { DateTime } from 'luxon';

import { PauseIcon, PlayIcon, TrashIcon } from 'common/components/icons';
import FormItemButton from 'common/components/OrderForm/components/FormItemButton';
import { Activity } from 'common/components/OrderForm/types';

import styles from 'styles/components/OrderForm/Activities.module.scss';

import { useData } from '../contexts/DataContext';

const getIndex = (n: number) => {
  if (n < 10) {
    return `0${n}.`;
  }
  return `${n}.`;
};

const getDate = (d: string) => {
  return DateTime.fromISO(d).toFormat('dd.MM.yyyy');
};

const ICON_SIZE = 20;

const Activities = () => {
  const [data] = useData();
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:update-individual:${path}`, { interpolation: { escapeValue: false } });
  const { setValue } = useFormContext();

  const [activitiesList, setActivitiesList] = useState<Activity[]>(data?.activities || []);
  useEffect(() => {
    if (!data?.activities) return;
    setActivitiesList(data.activities);
  }, [data]);

  const [isExpanded, setIsExpaned] = useState(false);

  const changeActivityStatus = (activity: Activity, status: 'open' | 'stopped' | 'closed') => {
    setActivitiesList((prev) => prev.map((item) => {
      if (activity.id === item.id) {
        return {
          ...activity,
          _: { status },
        };
      }
      return item;
    }));
  };

  const stopActivityButton = (activityItem: Activity) => (
    <div role="button" title={t('pause')} onClick={() => void changeActivityStatus(activityItem, 'stopped')}><PauseIcon size={ICON_SIZE} /></div>
  );

  const closeActivityButton = (activityItem: Activity) => (
    <div role="button" title={t('liquidate')} onClick={() => void changeActivityStatus(activityItem, 'closed')}><TrashIcon size={ICON_SIZE} /></div>
  );

  const startActivityButton = (activityItem: Activity) => (
    <div role="button" title={t('start')} onClick={() => void changeActivityStatus(activityItem, 'open')}><PlayIcon size={ICON_SIZE} /></div>
  );

  useEffect(() => {
    setValue('activities', activitiesList);
  }, [activitiesList, setValue]);

  return (
    <div className={styles.activities}>
      <div className={styles.table}>
        <div className={classNames(styles.row, styles.header)}>
          <div className={styles.cell}>№</div>
          <div className={styles.cell}>{t('activityName')}</div>
          <div className={styles.cell}>{t('activityActiveFrom')}</div>
          <div className={classNames(styles.cell)}>{t('activityActions')}</div>
        </div>
        {(isExpanded ? activitiesList : activitiesList.slice(0, 6)).map((activityItem, index) => (
          <div key={activityItem.id} className={classNames(styles.row, activityItem._?.status === 'open' ? styles.starting : '', activityItem._?.status === 'stopped' ? styles.stopping : '', activityItem._?.status === 'closed' ? styles.closing : '', activityItem.status === 'closed' ? styles.closed : '')}>
            <div className={styles.cell}>{getIndex(index + 1)}</div>
            <div className={styles.cell}>{activityItem.description}</div>
            <div className={styles.cell}>{getDate(activityItem.effective_from)}</div>
            <div className={classNames(styles.cell, styles.actions)}>
              {activityItem.status === 'open' && (
                <>
                  {stopActivityButton(activityItem)}
                  {closeActivityButton(activityItem)}
                </>
              )}
              {activityItem.status === 'stopped' && (
                <>
                  {startActivityButton(activityItem)}
                  {closeActivityButton(activityItem)}
                </>
              )}
              {activityItem.status === 'closed' && (
                <>—</>
              )}
            </div>
          </div>
        ))}
      </div>
      {activitiesList.length > 6 && (
        <FormItemButton onClick={() => void setIsExpaned((prev) => !prev)}>{isExpanded ? t('collapse') : t('showAll')}</FormItemButton>
      )}
    </div>
  );
};

export default Activities;
