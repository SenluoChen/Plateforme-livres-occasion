
import { Outlet } from 'react-router-dom';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

function Root() {
  return (
    <div>
      <h1>Bienvenue dans Root</h1>
      <WorkspacePremiumIcon style={{ fontSize: 40, color: '#FFD700' }} />
    
      <Outlet />
    </div>
  );
}

export default Root;
