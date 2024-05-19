import React from 'react'
import { Card } from 'antd';
import Translation from '../translation/Translation'
import { useTranslation } from 'react-i18next';
import './HomePage.scss'

function HomePage() {
  const { t } = useTranslation();

  const handleClick = () => {
    console.log('Card clicked');
  };
  return (
    <>
      <Translation/>
      <div className="body">
        <Card className='Card' onClick={handleClick}>
          <h2>{t('test_one')}</h2>
          <p>{t('test_position')}</p>
        </Card>
        <Card className='Card' onClick={handleClick}>
          <h2>{t('test_two')}</h2>
          <p>{t('test_form')}</p>
        </Card>
      </div>
    </>
  )
}

export default HomePage