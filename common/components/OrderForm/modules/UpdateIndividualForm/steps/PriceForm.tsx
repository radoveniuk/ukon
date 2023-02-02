import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import Checkbox from 'common/components/forms/Checkbox';
import TextArea from 'common/components/forms/TextArea';

import styles from 'styles/OrderForm.module.scss';

import MultiSelect from '../../../../forms/MultiSelect';
import Radio, { RadioButton } from '../../../../forms/Radio';
import Select from '../../../../forms/Select';
import TextField from '../../../../forms/TextField';
import FormItem from '../../../components/FormItem';
import activities from '../../../data/activities.json';
import adresses from '../../../data/adress.json';
import countries from '../../../data/countries.json';
import AccordionTable, { AccordionTableCell, AccordionTableRow } from '../components/AccordionTable';
import { usePriceContext } from '../contexts/PriceContext';

export default function PriceForm() {
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:update-individual:${path}`, { interpolation: { escapeValue: false } });

  const { control, watch, register, setValue, formState: { errors } } = useFormContext();
  const [, updatePriceList] = usePriceContext();

  // auth
  const [isRegistered, setIsRegistered] = useState(true);

  return (
    <>
      <div className={classNames(styles['reg-p'], 't2')} dangerouslySetInnerHTML={{ __html: t('entryText') }} />
      <div className={styles.reg__items}>
        <FormItem number={1} title={t('form.nameOrId')}>
          <TextField
            label={t('form.nameOrId')}
            placeholder={t('form.nameOrIdInput')}
            className={classNames(styles['reg__item-input'], 'mb-15')}
          />
          <div className="t4">{t('form.companyId')}: <strong>54 943 990</strong></div>
          <div className="t4">{t('form.companyDistrict')}: <strong>Trenčín</strong></div>
          <div className="t4">{t('form.companyRegisterNumber')}: <strong>350-48520</strong></div>
        </FormItem>
        <FormItem number={2} title={t('form.actualData')}>
          <AccordionTable title={t('form.actualData')} gridTemplateColumns="356fr 634fr" className="t4" defaultOpen>
            <AccordionTableRow>
              <AccordionTableCell>{t('form.personalName')}</AccordionTableCell>
              <AccordionTableCell>Титул Mária Michalíková, Титул</AccordionTableCell>
            </AccordionTableRow>
            <AccordionTableRow>
              <AccordionTableCell>{t('form.physicalNumber')}</AccordionTableCell>
              <AccordionTableCell>111111/1111</AccordionTableCell>
            </AccordionTableRow>
            <AccordionTableRow>
              <AccordionTableCell>{t('form.birthdate')}</AccordionTableCell>
              <AccordionTableCell>01.01.1970</AccordionTableCell>
            </AccordionTableRow>
            <AccordionTableRow>
              <AccordionTableCell>{t('form.insurance')}</AccordionTableCell>
              <AccordionTableCell>Union</AccordionTableCell>
            </AccordionTableRow>
            <AccordionTableRow>
              <AccordionTableCell>{t('form.residence')}</AccordionTableCell>
              <AccordionTableCell>Slovakia</AccordionTableCell>
            </AccordionTableRow>
            <AccordionTableRow>
              <AccordionTableCell>{t('form.citizenship')}</AccordionTableCell>
              <AccordionTableCell>Ukrajina</AccordionTableCell>
            </AccordionTableRow>
          </AccordionTable>
        </FormItem>
        <FormItem number={3} title={t('form.editor')}></FormItem>
        <FormItem number={4} title={t('form.actionsIndividual')}></FormItem>
        <FormItem title={t('form.orderComment')} number={5}>
          <TextArea
            label={t('form.comment')}
            placeholder={t('form.inputComment')}
            style={{ height: 120 }}
            {...register('comment')}
          />
        </FormItem>
        <FormItem number={6} title={t('form.promo')}>
          <TextField
            label={t('form.inputPromo')}
            className={styles['reg__item-input']}
            onKeyDown={(event) => {
              const allowed = /^[a-zA-Z]+$/;
              if (!Number.isNaN(Number(event.key)) || allowed.test(event.key)) {
                return true;
              }
              event.preventDefault();
            }}
            {...register('promo')}
          />
        </FormItem>
        <FormItem title={t('form.saveToProfile')} number={7}>
          <Checkbox label={t('form.save')} {...register('saveToProfile', { value: true })} />
        </FormItem>
        <FormItem number={8} title={t('form.isRegistered')}>
          <Radio className={styles['reg__item-radios']} name="isRegistered">
            <RadioButton checked={isRegistered} onSelect={() => void setIsRegistered(true)}>
              {t('yes')}
            </RadioButton>
            <RadioButton checked={!isRegistered} onSelect={() => void setIsRegistered(false)}>
              {t('no')}
            </RadioButton>
          </Radio>
        </FormItem>
        {isRegistered && (
          <>
            <FormItem number={9} title={t('form.email')}>
              <TextField
                label={t('form.email')}
                className={styles['reg__item-input']}
              />
            </FormItem>
            <FormItem number={10} title={t('form.pass')}>
              <TextField
                label={t('form.pass')}
                className={styles['reg__item-input']}
                type="password"
              />
            </FormItem>
          </>
        )}
        {!isRegistered && (
          <>
            <FormItem number={9} title={t('form.email')}>
              <TextField
                label={t('form.email')}
                className={styles['reg__item-input']}
              />
            </FormItem>
            <FormItem number={10} title={t('form.pass')}>
              <div className={styles['reg__item-project']} style={{ gap: 20 }}>
                <TextField
                  label={t('form.pass')}
                  className={styles['reg__item-input']}
                  type="password"
                />
                <TextField
                  label={t('form.passRepeat')}
                  className={styles['reg__item-input']}
                  type="password"
                />
              </div>
            </FormItem>
            <FormItem number={11} title={t('form.phone')}>
              <TextField
                label={t('form.phone')}
                className={styles['reg__item-input']}
              />
            </FormItem>
          </>
        )}
      </div>
    </>
  );
}