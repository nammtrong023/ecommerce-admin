'use client';
import { Accordion, AccordionItem, AccordionTrigger } from '../ui/accordion';
import SidebarItem from './sidebar-item';
import useRoutes from '@/hooks/use-routes';

const Sidebar = () => {
    const routes = useRoutes();
    return (
        <aside className='sticky left-0 bottom-0 top-16 w-[15vw] text-black flex-shrink-0'>
            <Accordion
                type='multiple'
                className='flex flex-col items-center gap-y-3 w-full py-3 p-5 mt-3'
            >
                {routes.map((item, index) => (
                    <AccordionItem
                        className='w-full'
                        key={item.label}
                        value={`item-${index++}`}
                    >
                        <AccordionTrigger className='w-full'>
                            {item.label}
                        </AccordionTrigger>
                        <SidebarItem sub={item.sub} />
                    </AccordionItem>
                ))}
            </Accordion>
        </aside>
    );
};

export default Sidebar;
