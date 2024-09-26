import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

import type { Plan } from '@/types';

interface PlanData {
  id: Plan;
  isActive: boolean;
}

interface MembershipContextType {
  paymentStep: null | 1 | 2 | 3;
  setPaymentStep: (step: null | 1 | 2 | 3) => void;
  activePlanId: Plan;
  checkedPlan: Plan;
  setCheckedPlan: (plan: Plan) => void;
}

const MembershipContext = createContext<MembershipContextType | undefined>(undefined);

export const MembershipProvider = ({ children, plansData }: { children: ReactNode; plansData: PlanData[] }) => {
  const [paymentStep, setPaymentStep] = useState<null | 1 | 2 | 3>(null);
  const activePlanId: Plan = plansData.find((plan) => plan.isActive)?.id ?? 'basic';
  const [checkedPlan, setCheckedPlan] = useState<Plan>(activePlanId || 'basic');

  return (
    <MembershipContext.Provider
      value={{
        paymentStep,
        setPaymentStep,
        activePlanId,
        checkedPlan,
        setCheckedPlan,
      }}
    >
      {children}
    </MembershipContext.Provider>
  );
};

export const useMembership = () => {
  const context = useContext(MembershipContext);
  if (context === undefined) {
    throw new Error('useMembership must be used within a MembershipProvider');
  }
  return context;
};
