
import { PropsWithChildren, useId } from 'react';
import { useTranslation } from 'next-i18next';

import { DownloadIcon, InfoIcon, SignatureIcon, UploadIcon } from 'common/components/icons';
import Tooltip from 'common/components/Tooltip';

import styles from 'styles/components/OrderForm/Docs.module.scss';

const Docs = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.docs}>
      {children}
    </div>
  );
};

export default Docs;

type DocProps = {
  docName: string;
  tooltip?: string;
}

export const Doc = ({ docName, tooltip, children }: PropsWithChildren<DocProps>) => {
  const translation = useTranslation('docs');
  const t = (path: string) => translation.t(path);
  const tooltipId = useId();
  return (
    <div className={styles.docUpload}>
      <div className={styles.header}>
        <div>{t(docName)}</div>
        {!!tooltip && (
          <Tooltip content={tooltip}>
            <InfoIcon id={tooltipId} />
          </Tooltip>
        )}
      </div>
      <div className={styles.actions}>{children}</div>
    </div>
  );
};

export const DocSignature = () => {
  const translation = useTranslation('docs');
  const t = (path: string) => translation.t(path);

  return (
    <div className={styles.action}><SignatureIcon />{t('signOnline')}</div>
  );
};

export const DocTemplateDownload = () => {
  const translation = useTranslation('docs');
  const t = (path: string) => translation.t(path);

  return (
    <div className={styles.action}><DownloadIcon />{t('downloadTemplate')}</div>
  );
};

export const DocUpload = () => {
  const translation = useTranslation('docs');
  const t = (path: string) => translation.t(path);

  return (
    <div className={styles.action}><UploadIcon />{t('upload')}</div>
  );
};