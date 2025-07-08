import React from 'react';
import { Container, Typography } from '@mui/material';

const MembershipPage: React.FC = () => {
  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        👑 會員專區
      </Typography>
      <Typography align="center">
        歡迎來到會員中心！這裡未來可以顯示會員等級、權益、升級方案等等。
      </Typography>
    </Container>
  );
};

export default MembershipPage;
