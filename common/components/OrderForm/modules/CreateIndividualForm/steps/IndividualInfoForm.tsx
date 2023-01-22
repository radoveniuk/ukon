import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import Select from 'common/components/forms/Select';
import TextField from 'common/components/forms/TextField';
import FormItem from 'common/components/OrderForm/components/FormItem';

import styles from 'styles/OrderForm.module.scss';

import prefixes from '../../../data/prefixes.json';

export default function IndividualInfoForm () {
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:create-individual:${path}`, { interpolation: { escapeValue: false } });

  return (
    <>
      <div className={classNames(styles['reg-p'], 't2')} dangerouslySetInnerHTML={{ __html: t('individualInfoText') }} />
      <div className={styles.reg__items}>
        <FormItem number={1} title={t('form.physicalInfo')}>
          <div className={styles['reg__item-inputs']}>
            <Select placeholder={t('form.namePrefix')} label={t('form.inputNamePrefix')} options={prefixes.filter((item) => item.Type === 'Prefix')} pathToLabel="Value" />
            <TextField label={t('form.name')} placeholder={t('form.inputName')} />
            <TextField label={t('form.surname')} placeholder={t('form.inputSurname')} />
            <Select placeholder={t('form.namePostfix')} label={t('form.inputNamePostfix')} options={prefixes.filter((item) => item.Type === 'Postfix')} pathToLabel="Value" />
          </div>
        </FormItem>
      </div>
    </>
  );
}