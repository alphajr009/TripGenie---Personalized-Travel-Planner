import { useTranslation } from 'react-i18next';

const useTranslationInClass = () => {
    const { t } = useTranslation();
    return t;
};

export default useTranslationInClass;
