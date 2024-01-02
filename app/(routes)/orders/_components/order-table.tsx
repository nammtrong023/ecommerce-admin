'usc client';
import { OrderType } from '@/types';
import format from 'date-fns/format';
import { columns } from './order-column';
import { Heading } from '@/components/ui/heading';
import { Divider } from '@mui/material';
import { DataTable } from '@/components/ui/data-table';

const OrderTable = ({ data }: { data: OrderType[] | undefined }) => {
    const formattedOrder = data?.map((order) => ({
        id: order.id,
        total: order.total,
        timestamp: format(new Date(order.timestamp), 'dd/MM/yyyy'),
    }));

    if (!formattedOrder) return null;

    return (
        <div className='flex-col'>
            <div className='flex-1 gap-y-4 p-8 pt-6'>
                <Heading title={`Đơn hàng (${formattedOrder.length})`} />
                <Divider className='pt-3' />
                <DataTable
                    searchKey='total'
                    columns={columns}
                    data={formattedOrder}
                />
            </div>
        </div>
    );
};

export default OrderTable;
