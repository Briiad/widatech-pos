import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconX, IconCheck } from '@tabler/icons-react';
import {
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  Box,
  Stack,
  Title,
  rem,
} from '@mantine/core';
import { DatePicker, DateValue } from '@mantine/dates'; // Ensure correct import
import CustomAutocomplete from './CustomAutocomplete';
import classes from './InvoiceInput.module.css';

const productsData = [
  { name: 'Product A', picture: 'product-a.jpg', stock: 10, price: 120000 },
  { name: 'Product B', picture: 'product-b.jpg', stock: 5, price: 200000 },
  { name: 'Product C', picture: 'product-c.jpg', stock: 20, price: 175000 },
];

interface Product {
  name: string;
  picture: string;
  stock: number;
  price: number;
}

interface RootState {
  rootReducer: {
    date: string;
    customer_name: string;
    salesperson_name: string;
    notes: string;
    products: Product[];
  };
}

const InvoiceForm = () => {
  const dispatch = useDispatch();
  const { date, customer_name, salesperson_name, notes, products } = useSelector(
    (state: RootState) => state.rootReducer
  );

  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  const form = useForm({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: {
      date: date ? new Date(date) : new Date(),
      customer_name: customer_name || '',
      salesperson_name: salesperson_name || '',
      notes: notes || '',
      products: products || [],
    },
    validate: {
      date: (value) => (value ? null : 'Date is required'),
      customer_name: (value) => (value ? null : 'Customer name is required'),
      salesperson_name: (value) => (value ? null : 'Salesperson name is required'),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
    dispatch({ type: 'SET_DATE', date: new Date(values.date).toISOString().split('T')[0] });
    dispatch({ type: 'SET_CUSTOMER_NAME', customer_name: values.customer_name });
    dispatch({ type: 'SET_SALESPERSON_NAME', salesperson_name: values.salesperson_name });
    dispatch({ type: 'SET_NOTES', notes: values.notes });
    dispatch({ type: 'SET_PRODUCTS', products: values.products });

    axios
      .post('http://localhost:8000/api/invoices/', values, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        notifications.show({
          title: 'Invoice Form Submitted',
          message: 'Data has been successfully submitted',
          color: 'blue',
          icon: checkIcon,
        });
      })
      .catch((error) => {
        console.log(error);
        notifications.show({
          title: 'Error',
          message: 'An error occurred while submitting the form',
          color: 'red',
          icon: xIcon,
        });
      })
      .finally(() => {
        form.reset();
        dispatch({ type: 'RESET_FORM' });
      });
  };

  return (
    <form className={classes.invoiceForm} onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Title order={3} className={classes.title}>
          Invoice Form
        </Title>

        <SimpleGrid cols={2} spacing="lg">
          <Box>
            <Title>Date</Title>
            <DatePicker
              {...form.getInputProps('date')}
              allowDeselect
              onChange={(value: DateValue) => form.setFieldValue('date', value as Date)}
              className={classes.inputField}
            />
          </Box>

          <Box>
            <SimpleGrid cols={2} spacing="sm">
              <Box>
                <TextInput
                  label="Customer Name"
                  placeholder="Enter customer name"
                  {...form.getInputProps('customer_name')}
                  className={classes.inputField}
                  withAsterisk
                />
              </Box>

              <Box>
                <TextInput
                  label="Salesperson Name"
                  placeholder="Enter salesperson name"
                  {...form.getInputProps('salesperson_name')}
                  className={classes.inputField}
                  withAsterisk
                />
              </Box>
            </SimpleGrid>

            <Box my={12}>
              <CustomAutocomplete
                data={productsData}
                onSelect={(product) => {
                  form.setFieldValue('products', [...form.values.products, product]);
                }}
              />
            </Box>

            <Box>
              <Textarea
                label="Notes"
                placeholder="Enter any additional notes (optional)"
                {...form.getInputProps('notes')}
                className={classes.inputField}
                autosize
                minRows={2}
              />
            </Box>

            <Group mt="md">
              <Button type="submit" color="green">
                Submit
              </Button>
            </Group>
          </Box>
        </SimpleGrid>
      </Stack>
    </form>
  );
};

export default InvoiceForm;
