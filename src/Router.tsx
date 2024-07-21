import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { 
  HomePage, 
  Dashboard, 
  Invoice, 
  Analysis,
  Marketing,
  Promotion,
  Report,
  Inventory
} from './pages';
import DashboardLayout from './Layout/Dashboard.layout';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="promotion" element={<Promotion />} />
          <Route path="report" element={<Report />} />
          <Route path="inventory" element={<Inventory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
