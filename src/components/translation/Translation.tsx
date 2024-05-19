import React from 'react';
import { MenuProps , Layout, Dropdown } from 'antd';
import './Translation.scss';
import { useTranslation } from 'react-i18next';
const { Header } = Layout;

function Translation() {
  const { i18n } = useTranslation();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    i18n.changeLanguage(e.key);
  };

  const menuProps: MenuProps = {
    items: [
      { key: 'en', label: 'EN' },
      { key: 'th', label: 'TH' }
    ],
    onClick: handleMenuClick
  };

  const getUppercaseLanguage = (language: string) => {
    return language.toUpperCase();
  };

  return (
    <Layout>
        <Header className='header'>
            <Dropdown.Button menu={menuProps}>
              {getUppercaseLanguage(i18n.language)}
            </Dropdown.Button>
        </Header>
    </Layout>
  );
};

export default Translation;
