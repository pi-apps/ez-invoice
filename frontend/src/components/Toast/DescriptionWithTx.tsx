import React from 'react'
import { Link, Text } from '@devfedeltalabs/pibridge_uikit'
import { useTranslation } from 'contexts/Localization'
import truncateHash from 'utils/truncateHash'

interface DescriptionWithTxProps {
  description?: string
  linkTx?: string
}

const DescriptionWithTx: React.FC<DescriptionWithTxProps> = ({ linkTx, children }) => {
  const { t } = useTranslation()

  return (
    <>
      {typeof children === 'string' ? <Text as="p">{children}</Text> : children}
      {linkTx && (
        <Link external href={linkTx}>
          {t('View tx')}: {truncateHash(linkTx, 8, 0)}
        </Link>
      )}
    </>
  )
}

export default DescriptionWithTx
