import { ClickableComponent } from '@/components/ClickableComponent/ClickableComponent';

const AdminPanelPage = () => {
  return (
    <div className="flex w-full justify-between items-center px-5 md:px-16 py-4 md:py-6 xl:py-8">
      <h3>AdminPanelPage</h3>
      <ClickableComponent
        href="/crm/addyacht"
        variants={['button', 'primary']}
      >
        Add yacht
      </ClickableComponent>
    </div>
  );
};

export default AdminPanelPage;
