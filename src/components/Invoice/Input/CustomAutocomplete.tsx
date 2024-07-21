import React, { useState } from 'react';
import { TextInput, Box, Group, Avatar, Text, Paper, Center } from '@mantine/core';

interface Product {
  name: string;
  picture: string;
  stock: number;
  price: number;
}

interface CustomAutocompleteProps {
  data: Product[];
  onSelect: (value: Product) => void;
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({ data, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<Product[]>(data);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = data.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  };

  const handleSelect = (product: Product) => {
    setSearchTerm(product.name);
    setDropdownVisible(false);
    onSelect(product);
  };

  return (
    <Box>
      <TextInput
        withAsterisk  
        label="Products"
        placeholder="Start typing to search products"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setDropdownVisible(!!searchTerm)}
      />

      {dropdownVisible && (
        <Paper
          shadow="sm"
          w={420}
          style={{
            position: 'absolute',
            zIndex: 1000,
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          {filteredData.length > 0 ? (
            filteredData.map((product) => (
              <Group
                key={product.name}
                style={{
                  padding: '8px',
                  cursor: 'pointer',
                }}
                onMouseDown={() => handleSelect(product)}
              >
                <Avatar src={product.picture} alt={product.name} />
                <div>
                  <Text>{product.name}</Text>
                  <Text size="xs">
                    Stock: {product.stock}, Price: ${product.price}
                  </Text>
                </div>
              </Group>
            ))
          ) : (
            <Center p="md">
              <Text size="sm">
                No data
              </Text>
            </Center>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default CustomAutocomplete;
