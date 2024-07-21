import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Chip, Pagination, Container, Text, Skeleton } from '@mantine/core';
import styles from './InvoiceCard.module.css';

const PAGE_SIZE = 5;

interface Invoice {
  id: number;
  date: string;
  customer_name: string;
  salesperson_name: string;
  notes: string;
  products: {
    name: string;
    price: number;
    stock: number;
  }[];
}

const InvoiceTable = () => {
  const [activePage, setActivePage] = useState(1);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/invoices/')
      .then((response) => setInvoices(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Calculate the range of invoices to display for the current page
  const displayedInvoices = invoices.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE);

  // console.log(invoices);

  return (
    <Container>
      <Table className={styles.invoiceTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Salesperson</th>
            <th>Notes</th>
            <th>Products</th>
            <th>Amount Paid (Rp)</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length !== 0 ? (
            displayedInvoices?.map((invoice) => (
              <tr key={invoice.id} className={styles.invoiceRow}>
                <td>{invoice.id}</td>
                <td>{invoice.customer_name}</td>
                <td>{invoice.salesperson_name}</td>
                <td>
                  {invoice.notes && (
                    <Text>
                      {invoice.notes.length > 50
                        ? `${invoice.notes.substring(0, 50)}...`
                        : invoice.notes}
                    </Text>
                  )}
                </td>
                <td>
                  <Chip color="blue" size="sm">
                    {invoice.products[0].name}
                  </Chip>
                </td>
                <td>
                  <Text>
                    {
                      new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      }).format(invoice.products[0].price * invoice.products[0].stock)
                    }
                  </Text>
                </td>
              </tr>
            ))
          ) : (
            // 5 rows, 6 columns
            Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <tr key={index} className={styles.invoiceRow}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <td key={index}>
                    <Skeleton height={40} />
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <div className={styles.paginationWrapper}>
        <Pagination
          total={Math.ceil(invoices.length / PAGE_SIZE)}
          value={activePage}
          onChange={setActivePage}
        />
      </div>
    </Container>
  );
};

export default InvoiceTable;
