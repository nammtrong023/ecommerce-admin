'use client';

import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Divider } from '@mui/material';
import React from 'react';
import { columns } from '../_components/order-detail-column';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { OrderDetailType } from '@/types';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/order-details/get-by-order-id`;

const OrderIdPage = ({ params }: { params: { orderId: string } }) => {
    const { data } = useQuery({
        queryKey: ['order', params.orderId],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}/${params.orderId}`);

            return response.data as OrderDetailType[];
        },
    });

    if (!data) return null;

    const formattedOrder = data.map((order) => ({
        id: order.id,
        productName: order.product.name,
        size: order.size,
        color: order.color,
        price: order.price,
        quantity: order.quantity,
        timestamp: format(new Date(order.timestamp), 'dd/MM/yyyy'),
    }));

    return (
        <div className='min-h-[800px] w-full sticky p-5 right-0 overflow-auto'>
            <div className='flex items-center justify-between'>
                <Heading title={'Chi tiết đơn hàng'} />
                <Link href='/'>
                    <Button>
                        <ArrowLeft className='w-4 h-4' />
                    </Button>
                </Link>
            </div>
            <Divider className='pt-3' />
            <DataTable
                searchKey='productName'
                columns={columns}
                data={formattedOrder}
            />
        </div>
    );
};

export default OrderIdPage;
