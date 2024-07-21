import { Box, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Box
        className={classes.container}
      >
        {/* Button to Dashboard */}
        <Link to="/dashboard">
          <Button className={classes.button} size="xl" variant="gradient" gradient={{ from: 'pink', to: 'yellow' }}>
            Go to Dashboard
          </Button>
        </Link>
      </Box>
    </>
  );
}
