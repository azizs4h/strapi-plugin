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
      <Box
        margin={20}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ff0000',
          borderRadius: '8px',
        }}
      ></Box>
    </Main>
  );
};

export { HomePage };
