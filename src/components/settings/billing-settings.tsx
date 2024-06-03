import { onGetSubscriptionPlan } from "@/actions/settings";
import Section from "@/components/section-label";

const BillingSetting = async () => {
  const plan = await onGetSubscriptionPlan();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <Section
          label="Billing Settings"
          message="Add payment information, upgrade and modify your plan."
        />
      </div>
    </div>
  );
};

export default BillingSetting;
