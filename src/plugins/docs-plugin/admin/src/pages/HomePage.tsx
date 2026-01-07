import { Main, Box, Typography } from '@strapi/design-system';
import { useIntl } from 'react-intl';

import { getTranslation } from '../utils/getTranslation';

const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <Main padding={5} className="docs-plugin-home-page">
      <Box paddingBottom={4} margin={20}>
        <Typography variant="alpha">
          {formatMessage({ id: getTranslation('plugin.name') })}
        </Typography>
        <Box>
          <Typography variant="beta">
            {formatMessage({ id: getTranslation('plugin.description') })}
          </Typography>
        </Box>
      </Box>
      <iframe
        src="/docs/index.html"
        style={{ width: '100%', height: 'calc(100vh - 56px)', border: 'none' }}
        title="Documentation"
      />
    </Main>
  );
};

export { HomePage };
