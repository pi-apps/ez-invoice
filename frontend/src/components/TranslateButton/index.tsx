import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useTranslation } from "react-i18next";

const TranslateButton = () => {
    const { t, i18n } = useTranslation();
    const [lang, setLang] = useState('en');

    useEffect(() => {
        if(lang) i18n.changeLanguage(lang);
    }, [lang]);
    
    return (
        <DropdownButton id="dropdown-basic-button" title="Dropdown button" onSelect={(e) => setLang(e)}>
            <Dropdown.Item eventKey='en'>en</Dropdown.Item>
            <Dropdown.Item eventKey='fr'>fr</Dropdown.Item>
        </DropdownButton>
    );
}

export default TranslateButton;