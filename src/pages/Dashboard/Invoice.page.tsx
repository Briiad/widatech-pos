import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tabs, Box } from '@mantine/core';
import InvoiceForm from '@/components/Invoice/Input/Input'
import InvoiceTable from '@/components/Invoice/Card/Card';
import InvoiceGraph from '@/components/Invoice/Graph/Graph';

export function Invoice(){
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('menu') || 'product-data';

  return (
    <div>
      <Tabs
        value={tab}
        onChange={(value) => navigate(`/dashboard/invoice?menu=${value}`)}
      >
        <Tabs.List>
          <Tabs.Tab value='product-data'>Product Data</Tabs.Tab>
          <Tabs.Tab value='invoice-data'>Invoice Data</Tabs.Tab>
          <Tabs.Tab value='graph'>Graph</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      <Box mt={24}>
        {tab === 'product-data' && <InvoiceForm />}
        {tab === 'invoice-data' && <InvoiceTable />}
        {tab === 'graph' && <InvoiceGraph />}
      </Box>
    </div>
  )
}