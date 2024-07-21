import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { Card, Text, Loader, useMantineTheme } from "@mantine/core";
import classes from "./InvoiceGraph.module.css";

const InvoiceGraph = () => {
  const theme = useMantineTheme();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/invoices/').then((res) => {
      setData(res.data);
      setLoading(false);
      console.log(res.data);
    });
  }, []);

  if (loading) {
    return <Loader />;
  }

  // Prepare data for the graph
  const formattedData = data.map((item) => {
    return {
      // Format date to DD, Month, YYYY
      date: new Date(item.date)
        .toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
        .split(" ")
        .join(" "),
      total: item.products[0].price * item.products[0].stock,
    };
  });

  // Custom tick formatter for the Y-axis
  const formatYAxis = (tick: number) => {
    if (tick >= 1e9) return `${(tick / 1e9).toFixed(1)} Bil`;
    if (tick >= 1e6) return `${(tick / 1e6).toFixed(1)} Mil`;
    if (tick >= 1e3) return `${(tick / 1e3).toFixed(1)} K`;
    return tick.toString();
  };

  return (
    <Card padding="lg" className={classes.card}>
      <Text className={classes.title}>Invoice Time Series Graph</Text>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={formattedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke={theme.colors.blue[6]} />
          <Brush dataKey="date" height={30} stroke={theme.colors.blue[6]} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default InvoiceGraph;
