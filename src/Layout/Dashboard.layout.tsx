import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideNav } from '@/components/SideNav/SideNav'
import { Box, Flex } from '@mantine/core'


export default function DashboardLayout() {
    return (
        <Flex>
          <SideNav />
          <Box flex={1} ml={300} p={12}>
            <Outlet />
          </Box>
        </Flex>
    )
}