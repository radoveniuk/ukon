import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaPlay } from 'react-icons/fa';
import { ImPause2, ImStop2 } from 'react-icons/im';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import Button from 'common/components/Button';
import FileInput from 'common/components/forms/FileInput';
import Radio, { RadioButton } from 'common/components/forms/Radio';
import Select from 'common/components/forms/Select';
import TextArea from 'common/components/forms/TextArea';
import TextField from 'common/components/forms/TextField';
import IconButton from 'common/components/IconButton';
import InfoIcon from 'common/components/icons/InfoIcon';
import UploadIcon from 'common/components/icons/UploadIcon';
import Tooltip from 'common/components/Tooltip';
import useListState from 'common/hooks/useListState';

import styles from 'styles/OrderForm.module.scss';

import BusinessSearch from '../../../components/BusinessSearch';
import FormItems, { FormItem, FormItemRow } from '../../../components/FormItems';
import PersonalInfo from '../components/PersonalInfo';
import { useData } from '../contexts/DataContext';

type Activity = {
  created_at: string;
  description: string;
  effective_from: string;
  effective_to: string;
  id: number;
  organization_id: number;
  status: 'open' | 'stopped' | 'closed';
  suspended_from: string;
  suspended_to: string;
  updated_at: string;
  _?: Partial<Activity>;
}

export default function UpdateData() {
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:update-individual:${path}`, { interpolation: { escapeValue: false } });

  const { setValue, register, watch } = useFormContext();
  // const [, updatePriceList] = usePriceContext();

  const [individualData, setIndividualData] = useData();

  // auth
  const [isRegistered, setIsRegistered] = useState(true);

  const [activitiesList, setActivitiesList] = useState<Activity[]>(individualData?.activities || []);
  const [isAddingActivities, setIsAddingActivities] = useState(false);

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

  useEffect(() => {
    setValue('activities', activitiesList);
  }, [activitiesList, setValue]);


  const stopActivityButton = (activityItem: Activity) => (
    <IconButton color={activityItem._?.status === 'stopped' ? 'warning' : 'default'} title={t('stop')} onClick={() => void changeActivityStatus(activityItem, 'stopped')}><ImPause2 size={10} /></IconButton>
  );

  const closeActivityButton = (activityItem: Activity) => (
    <IconButton color={activityItem._?.status === 'closed' ? 'error' : 'default'} title={t('close')} onClick={() => void changeActivityStatus(activityItem, 'closed')}><ImStop2 size={10} /></IconButton>
  );

  const startActivityButton = (activityItem: Activity) => (
    <IconButton color={activityItem._?.status === 'open' ? 'primary' : 'default'} title={t('start')} onClick={() => void changeActivityStatus(activityItem, 'open')}><FaPlay size={10} /></IconButton>
  );

  // useEffect(() => {
  //   if (!individualData) return;
  //   setActivitiesList(individualData.activities);
  // }, [individualData]);
  const [paymentType, setPaymentType] = useState<'online' | 'invoice'>('online');
  const [invoiceTo, setInvoiceTo] = useState<'me' | 'other'>('me');
  const PAYMENT_TYPES = [
    { value: 'online', name: t('paymentByCard') },
    { value: 'invoice', name: t('paymentByInvoice') },
  ];

  const INVOICE_OPTIONS = [
    { value: 'me', name: watch('fullname') || individualData?.name },
    { value: 'other', name: t('invoiceToOther') },
  ];


  return (
    <>
      <div className={classNames(styles['reg-p'], 't2')} dangerouslySetInnerHTML={{ __html: t('entryText') }} />
      <FormItems>
        <FormItem iconSrc="/images/order-form/form-items/CheckData.svg" title={t('form.nameOrId')}>
          <FormItemRow cols={2}>
            <BusinessSearch
              onSearchResult={(res) => {
                setIndividualData(res);
                fetch(`/api/get-activities?id=${res.cin}`).then((res) => res.json())
                  .then((res: { data: Activity[] }) => {
                    setIndividualData((prev) => prev ? ({
                      ...prev,
                      activities: res.data,
                    }) : null);
                  });;
              }}
            />
          </FormItemRow>
        </FormItem>
        <FormItem disabled={!individualData} iconSrc="/images/order-form/form-items/Profile.svg" title={t('form.actualData')}>
          <PersonalInfo />
        </FormItem>
        <FormItem disabled={!individualData} iconSrc="/images/order-form/form-items/Auth.svg" title={t('form.regAuth')}>
          <Radio name="isRegistered">
            <FormItemRow cols={2}>
              <RadioButton className={styles.registeredRadio} checked={isRegistered} onSelect={() => void setIsRegistered(true)}>
                {translation.t('imRegistered')}
              </RadioButton>
              <RadioButton className={styles.registeredRadio} checked={!isRegistered} onSelect={() => void setIsRegistered(false)}>
                {translation.t('imNotRegistered')}
              </RadioButton>
              {isRegistered && (
                <>
                  <TextField
                    label={t('form.email')}
                  />
                  <TextField
                    label={t('form.pass')}
                    type="password"
                  />
                </>
              )}
              {!isRegistered && (
                <>
                  <TextField
                    label={t('form.email')}
                  />
                  <TextField
                    label={t('form.phone')}
                  />
                  <TextField
                    label={t('form.pass')}
                    type="password"
                  />
                  <TextField
                    label={t('form.passRepeat')}
                    type="password"
                  />
                </>
              )}
            </FormItemRow>
          </Radio>
        </FormItem>
        <FormItem disabled={!individualData} iconSrc="/images/order-form/form-items/Note.svg" title={t('form.orderComment')}>
          <TextArea
            label={t('form.comment')}
            placeholder={t('form.inputComment')}
            style={{ height: 120 }}
            {...register('comment')}
          />
        </FormItem>
        <FormItem disabled={!individualData} iconSrc="/images/order-form/form-items/Docs.svg" title={t('docsUpload')}>
          <div className={styles['reg__docs']}>
            <div className={styles['reg__doc']}>
              <div className={styles['reg__doc-title']}>
                <div className={styles['reg__doc-title-text']}>{t('proxyDoc')}</div>
                <Tooltip content={t('proxyDoc')}>
                  <InfoIcon className={styles['reg__doc-info']} id="ProxyInfo" />
                </Tooltip>
              </div>
              <div className={classNames(styles['reg__doc-body'], 't4')}>
                <div className={styles.filesLink}>{t('downloadTemplate')}</div>
                <div className={styles.filesLink}>{t('sendTemplate')}</div>
                <div className={styles.filesLink}>{t('signOnline')}</div>
              </div>
              <FileInput className={classNames(styles['reg__doc-fileinput'], 't2')}>
                <UploadIcon />
                {t('upload')}
              </FileInput>
            </div>
            <div className={styles['reg__doc']}>
              <div className={styles['reg__doc-title']}>
                <div className={styles['reg__doc-title-text']}>{t('identDoc')}</div>
                <Tooltip content={t('identDocPlaceholder')}>
                  <InfoIcon className={styles['reg__doc-info']} id="IdentDocInfo" />
                </Tooltip>
              </div>
              <FileInput className={classNames(styles['reg__doc-fileinput'], 't2')}>
                <UploadIcon />
                {t('upload')}
              </FileInput>
            </div>
            <div className={styles['reg__doc']}>
              <div className={styles['reg__doc-title']}>
                <div className={styles['reg__doc-title-text']}>{t('nonConvictDoc')}</div>
                <Tooltip content={t('nonConvictDoc')}>
                  <InfoIcon className={styles['reg__doc-info']} id="NotConvictInfo" />
                </Tooltip>
              </div>
              <FileInput className={classNames(styles['reg__doc-fileinput'], 't2')}>
                <UploadIcon />
                {t('upload')}
              </FileInput>
            </div>
          </div>
        </FormItem>
        <FormItem disabled={!individualData} iconSrc="/images/order-form/form-items/Billing.svg" title={translation.t('billing')}>
          <FormItemRow cols={2}>
            <Select
              options={PAYMENT_TYPES}
              pathToLabel="name"
              label={`${t('paymentLink')}:`}
              value={PAYMENT_TYPES.find((item) => item.value === paymentType)}
              onChange={({ value }) => {
                setPaymentType(value);
              }}
            />
            <Select
              options={INVOICE_OPTIONS}
              pathToLabel="name"
              label={t('invoiceType')}
              value={INVOICE_OPTIONS.find((item) => item.value === invoiceTo)}
              onChange={({ value }) => {
                setInvoiceTo(value);
              }}
            />
            {paymentType === 'online' && <Button>{t('paymentLink')}</Button>}
          </FormItemRow>
        </FormItem>

        {/* {!!individualData && (
          <>
            <FormItem title={t('form.actualData')}>
              <AccordionTable title={t('activities')} gridTemplateColumns="356fr 634fr 1fr" className="t4" defaultOpen>
                {activitiesList?.filter((activityItem) => activityItem.status !== 'closed').map((activityItem: Activity, index: number) => (
                  <AccordionTableRow key={`${activityItem.description}${index}`}>
                    <AccordionTableCell>{index+1}. {activityItem.description}</AccordionTableCell>
                    <AccordionTableCell>
                      от {DateTime.fromISO(activityItem.effective_from).toFormat('dd.MM.yyyy')}
                      {activityItem._?.status === 'open' && (
                        <Controller
                          control={control}
                          name={`activities[${index}]._.suspended_to`}
                          defaultValue={null}
                          render={({ field }) => (
                            <DatePicker
                              min={DateTime.now().plus({ month: 1 }).toJSDate()}
                              value={field.value || null}
                              onChange={field.onChange}
                              label={t('form.activityStartFrom')}
                              className={styles['reg__item-input']}
                            />
                          )}
                        />
                      )}
                      {activityItem._?.status === 'stopped' && (
                        <Controller
                          control={control}
                          name={`activities[${index}]._.suspended_from`}
                          defaultValue={null}
                          render={({ field }) => (
                            <DatePicker
                              min={DateTime.now().plus({ month: 1 }).toJSDate()}
                              value={field.value || null}
                              onChange={field.onChange}
                              label={t('form.activityStopFrom')}
                              className={styles['reg__item-input']}
                            />
                          )}
                        />
                      )}
                      {activityItem._?.status === 'closed' && (
                        <Controller
                          control={control}
                          name={`activities[${index}]._.effective_to`}
                          defaultValue={null}
                          render={({ field }) => (
                            <DatePicker
                              min={DateTime.now().plus({ month: 1 }).toJSDate()}
                              value={field.value || null}
                              onChange={field.onChange}
                              label={t('form.activityCloseFrom')}
                              className={styles['reg__item-input']}
                            />
                          )}
                        />
                      )}
                    </AccordionTableCell>
                    <AccordionTableCell className={styles['reg__table-actions']}>
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
                    </AccordionTableCell>
                  </AccordionTableRow>
                ))}
              </AccordionTable>
              <div className="mb-15">
                {!isAddingActivities && <Button onClick={() => void setIsAddingActivities(true)}><BsPlusLg />{t('add')}</Button>}
                {isAddingActivities && (
                  <Controller
                    control={control}
                    name="otherActivities"
                    render={({ field }) => (
                      <MultiSelect
                        tooltip="<div>В случае добавления ремесленного или регулируемого вида деятельности необходимо установить ответственного представителя имеющего соответствующую квалификацию.<br>Также, будет необходимо приложить к заявке документы подтверждающие квалификацию ответственного лица и его согласие<br>За каждый регулируемый и ремесленный вид деятельности к стоимости добавляется 7,5 евро</div>"
                        label={t('form.activitySearch')}
                        pathToLabel="ru"
                        options={activities}
                        handleChange={field.onChange}
                        placeholder={t('form.activitySelectPlaceholder')}
                        customRenderMenuItem={(item: any) => (
                          <>
                            <span>{item.ru}</span>
                            <span className={styles.activityOptionPrice}>
                              {item.Type !== 'Volná' ? 7.5 : 0}€
                            </span>
                          </>
                        )}
                      />
                    )}
                  />
                )}
              </div>
            </FormItem>
            <FormItem title={t('dataForEditings')}></FormItem>
            
            {/* <FormItem title={t('form.promo')}>
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
            </FormItem> */}
        {/* <FormItem title={t('form.saveToProfile')}>
              <Checkbox label={t('form.save')} {...register('saveToProfile', { value: true })} />
            </FormItem> */}
        {/* <FormItem title={t('form.isRegistered')}>
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
                <FormItem title={t('form.email')}>
                  <TextField
                    label={t('form.email')}
                    className={styles['reg__item-input']}
                  />
                </FormItem>
                <FormItem title={t('form.pass')}>
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
                <FormItem title={t('form.email')}>
                  <TextField
                    label={t('form.email')}
                    className={styles['reg__item-input']}
                  />
                </FormItem>
                <FormItem title={t('form.pass')}>
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
                <FormItem title={t('form.phone')}>
                  <TextField
                    label={t('form.phone')}
                    className={styles['reg__item-input']}
                  />
                </FormItem>
              </>
            )}
          </>
        )} */}
      </FormItems>
    </>
  );
}