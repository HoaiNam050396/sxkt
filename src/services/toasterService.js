import { toast } from 'react-toastify';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const toastMessage = (languageId, values = {}) => {
  const valuesRespond = values.dataRespond;

  if (values && values.dataRespond) {
    const notiMessage = (
      <FormattedMessage id={languageId} values={{ name: valuesRespond }} />
    );
    return <div>{notiMessage}</div>;
  }
  return <FormattedMessage id={languageId} />;
};

export const showSuccessToast = (languageId, values) => {
  toast.success(toastMessage(languageId, values));
};
export const showErrorToast = languageId => {
  toast.error(toastMessage(languageId));
};
export const showWarningToast = languageId => {
  toast.warn(toastMessage(languageId));
};
