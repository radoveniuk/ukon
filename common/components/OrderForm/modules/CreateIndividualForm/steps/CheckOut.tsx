import { ReactNode } from 'react';
import { useFormContext, UseFormWatch } from 'react-hook-form';
import { AiFillEdit } from 'react-icons/ai';
import { BsFileEarmarkArrowUpFill } from 'react-icons/bs';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { DateTime } from 'luxon';

import CheckoutTable, { CheckoutTableCell, CheckoutTableRow } from 'common/components/OrderForm/components/CheckoutTable';

import styles from 'styles/OrderForm.module.scss';

import { useSteps } from '../contexts/StepsContext';

type CheckoutRow = {
  name: string;
  step: 0 | 1 | 2;
  anchorField: string;
  getValue(watch: UseFormWatch<Record<string, any>>, t: (path: string) => string): string | ReactNode;
  customField?: boolean;
};

const PersonalDataRows: CheckoutRow[] = [
  {
    name: 'personalName',
    step: 1,
    anchorField: 'name',
    getValue: (watch) => `${watch('namePrefix.Value')} ${watch('name')} ${watch('surname')} ${watch('namePostfix.Value')}`,
  },
  {
    name: 'form.physicalNumber',
    step: 1,
    anchorField: 'physicalNumber',
    getValue: (watch) => watch('physicalNumber'),
  },
  {
    name: 'form.birthdate',
    step: 1,
    anchorField: 'birthdate',
    getValue: (watch) => DateTime.fromJSDate(watch('birthdate')).toFormat('dd.MM.yyyy'),
  },
  {
    name: 'form.docNumber',
    step: 1,
    anchorField: 'docNumber',
    getValue: (watch) => watch('docNumber'),
  },
  {
    name: 'form.adressResidence',
    step: 1,
    anchorField: 'street',
    getValue: (watch) => `${watch('street')}, ${watch('houseRegNumber')}, ${watch('houseNumber')}, ${watch('city')}, ${watch('zip')}, ${watch('country.ru')}`,
  },
  {
    name: 'form.adressSlovakResidence',
    step: 1,
    anchorField: 'streetSlovak',
    getValue: (watch) => `${watch('streetSlovak')}, ${watch('houseRegNumberSlovak')}, ${watch('houseNumberSlovak')}, ${watch('citySlovak')}, ${watch('zipSlovak')}, Slovensko`,
  },
  {
    name: 'form.insurance',
    step: 1,
    anchorField: 'insurance',
    getValue: (watch) => watch('insurance.ru'),
    customField: true,
  },
];

const CompanyDataRows: CheckoutRow[] = [
  {
    name: 'form.companyName',
    step: 1,
    anchorField: 'companyName',
    getValue: (watch) => `${watch('namePrefix.Value')} ${watch('name')} ${watch('surname')} ${watch('namePostfix.Value')} ${watch('companyName') ? `— ${watch('companyName')}` : ''}`,
  },
  {
    name: 'activities',
    step: 0,
    anchorField: 'mainActivity',
    getValue: (watch) => (
      <>
        <strong>{watch('mainActivity.ru')}</strong>
        <ul>
          {watch('otherActivities')?.map((activityItem: any) => (
            <li key={activityItem?.ru}>{activityItem?.ru}</li>
          ))}
        </ul>
      </>
    ),
  },
  {
    name: 'form.companyNumber',
    step: 1,
    anchorField: 'companyNumber',
    getValue: (watch) => watch('companyNumber'),
  },
  {
    name: 'form.businessAdress',
    step: 0,
    anchorField: '',
    getValue: () => 'от Úkon.sk, Nitra — Dunajská 9/1, Пакет S +X €/год',
  },
  {
    name: 'form.registerDate',
    step: 1,
    anchorField: 'registerDate',
    getValue: (watch, t) => {
      const value = watch('registerDate');
      if (value  === 'asap') {
        return t('form.asap');
      }
      if (DateTime.fromJSDate(value).isValid) {
        return DateTime.fromJSDate(value).toFormat('dd.MM.yyyy');
      }
      return '';
    },
    customField: true,
  },
  {
    name: 'form.orderComment',
    step: 1,
    anchorField: 'comment',
    getValue: (watch) => watch('comment'),
  },
];

export default function CheckOut () {
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:create-individual:${path}`, { interpolation: { escapeValue: false } });
  const { setStep } = useSteps();

  const { watch, setFocus } = useFormContext();

  const goToField = (id: string, scroll = false) => {
    setFocus(id, { shouldSelect: true });
    if (scroll) {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 100,
        });
      }
    }
  };

  return (
    <>
      <div className={classNames(styles['reg-p'], 't2')} dangerouslySetInnerHTML={{ __html: t('checkoutText') }} />
      <div className={styles.reg__tables}>
        <CheckoutTable title={t('personalData')}>
          {PersonalDataRows.map((row) => (
            <CheckoutTableRow key={row.name}>
              <CheckoutTableCell className="t4">{t(row.name)}</CheckoutTableCell>
              <CheckoutTableCell className="t4">{row.getValue(watch, t)}</CheckoutTableCell>
              <CheckoutTableCell
                className={styles['reg__table-edit']}
                onClick={() => {
                  setStep(row.step);
                  setTimeout(() => { goToField(row.anchorField, row.customField); }, 100);
                }}
              >
                <AiFillEdit />
              </CheckoutTableCell>
            </CheckoutTableRow>
          ))}
        </CheckoutTable>
        <CheckoutTable title={t('companyData')}>
          {CompanyDataRows.map((row) => (
            <CheckoutTableRow key={row.name}>
              <CheckoutTableCell className="t4">{t(row.name)}</CheckoutTableCell>
              <CheckoutTableCell className="t4">{row.getValue(watch, t)}</CheckoutTableCell>
              <CheckoutTableCell
                className={styles['reg__table-edit']}
                onClick={() => {
                  setStep(row.step);
                  setTimeout(() => { goToField(row.anchorField, row.customField); }, 100);
                }}
              >
                <AiFillEdit />
              </CheckoutTableCell>
            </CheckoutTableRow>
          ))}
        </CheckoutTable>
        <CheckoutTable title={t('docsUpload')}>
          <CheckoutTableRow>
            <CheckoutTableCell className="t4">{t('proxyDoc')}</CheckoutTableCell>
            <CheckoutTableCell className="t4">
              <div className={styles.filesLink}>{t('downloadTemplate')}</div>
              <div className={styles.filesLink}>{t('sendTemplate')}</div>
              <div className={styles.filesLink}>{t('signOnline')}</div>
            </CheckoutTableCell>
            <CheckoutTableCell className={styles['reg__table-edit']} >
              <BsFileEarmarkArrowUpFill />
            </CheckoutTableCell>
          </CheckoutTableRow>
          <CheckoutTableRow>
            <CheckoutTableCell className="t4">{t('realtyDoc')}</CheckoutTableCell>
            <CheckoutTableCell className="t4">
              <div className={styles.filesLink}>{t('downloadTemplate')}</div>
              <div className={styles.filesLink}>{t('sendTemplate')}</div>
            </CheckoutTableCell>
            <CheckoutTableCell className={styles['reg__table-edit']} >
              <BsFileEarmarkArrowUpFill />
            </CheckoutTableCell>
          </CheckoutTableRow>
          <CheckoutTableRow>
            <CheckoutTableCell className="t4">{t('nonConvictDoc')}</CheckoutTableCell>
            <CheckoutTableCell className="t4"></CheckoutTableCell>
            <CheckoutTableCell className={styles['reg__table-edit']} >
              <BsFileEarmarkArrowUpFill />
            </CheckoutTableCell>
          </CheckoutTableRow>
          <CheckoutTableRow>
            <CheckoutTableCell className="t4">{t('identDoc')}</CheckoutTableCell>
            <CheckoutTableCell className="t4">{t('identDocPlaceholder')}</CheckoutTableCell>
            <CheckoutTableCell className={styles['reg__table-edit']} >
              <BsFileEarmarkArrowUpFill />
            </CheckoutTableCell>
          </CheckoutTableRow>
          <CheckoutTableRow>
            <CheckoutTableCell className="t4">{t('residenceSkDoc')}</CheckoutTableCell>
            <CheckoutTableCell className="t4" />
            <CheckoutTableCell className={styles['reg__table-edit']} >
              <BsFileEarmarkArrowUpFill />
            </CheckoutTableCell>
          </CheckoutTableRow>
          <CheckoutTableRow>
            <CheckoutTableCell className="t4">{t('permitResidenceDoc')}<br />{watch('residence.ru')}</CheckoutTableCell>
            <CheckoutTableCell className="t4" />
            <CheckoutTableCell className={styles['reg__table-edit']} >
              <BsFileEarmarkArrowUpFill />
            </CheckoutTableCell>
          </CheckoutTableRow>
        </CheckoutTable>
      </div>
    </>
  );
}