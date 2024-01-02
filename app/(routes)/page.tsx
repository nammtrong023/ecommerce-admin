'use client';

import OrderTable from '@/app/(routes)/orders/_components/order-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMoney } from '@/lib/utils';
import { OrderType, UserType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CreditCardIcon } from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function Home() {
    const { data } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}/orders`);

            return response.data as OrderType[];
        },
    });

    const totalRevenue = data?.reduce((total, order) => total + order.total, 0);

    const productQuantities = data
        ?.map((order) =>
            order.orderDetails.map((orderDetail) => orderDetail.quantity),
        )
        .flat();

    const salesCount = productQuantities?.reduce(
        (count, item) => count + item,
        0,
    );

    return (
        <main className='min-h-[800px] w-full sticky p-5 right-0 overflow-auto'>
            <div className='flex items-center justify-center gap-4 mb-24 w-full'>
                <Card className='w-[354px] min-h-[56px] h-full'>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Tổng Doanh Thu
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>
                            {formatMoney(totalRevenue)}
                        </div>
                    </CardContent>
                </Card>
                <Card className='w-[354px] min-h-[56px] h-full'>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Đã Bán
                        </CardTitle>
                        <CreditCardIcon className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>+{salesCount}</div>
                    </CardContent>
                </Card>
            </div>
            <OrderTable data={data} />
        </main>
    );
}
