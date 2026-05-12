import { useTranslations } from 'next-intl';
import { ThinBarClient } from './ThinBarClient';

export function ThinBar() {
  const t = useTranslations('thinBar');
  return (
    <ThinBarClient
      shipping={t('shipping')}
      returns={t('returns')}
    />
  );
}
