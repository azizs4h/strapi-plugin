import { Main, Box, Typography } from '@strapi/design-system';
import { useIntl } from 'react-intl';

import { getTranslation } from '../utils/getTranslation';

const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <Main style={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexGrow: 1, overflow: 'hidden', position: 'relative' }}>
        <iframe
          src="/api/docs-plugin/docs/"
          style={{
            position: 'absolute',
            inset: 0,
            border: '0px solid black',
            width: '100%',
            height: '100%',
          }}
          title="Documentation"
        />
      </div>
    </Main>
  );
};

export { HomePage };
