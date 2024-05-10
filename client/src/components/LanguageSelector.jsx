import {useEffect} from "react";
import {useTranslation} from "react-i18next";

const languages = [
  {code: "en", lang: "English"},
  {code: "fr", lang: "French"},
  {code: "kor", lang: "Korean"},
  {code: "ru", lang: "Russian"},
];

const LanguageSelector = () => {
  const {i18n} = useTranslation();

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className="btn-container">
      <select
          value={i18n.language}
          onChange={(e) => changeLanguage(e.target.value)}
          style={{
              padding: '10px', 
              borderRadius: '5px', 
              border: '1px solid #ccc', 
              backgroundColor: '#f7f7f7',  
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right center', 
              paddingRight: '30px', 
              appearance: 'none', 
              WebkitAppearance: 'none', 
              MozAppearance: 'none', 
          }}
      >
          {languages.map((lng) => (
              <option key={lng.code} value={lng.code}>
                  {lng.lang}
              </option>
          ))}
      </select>

    </div>
  );
};

export default LanguageSelector;