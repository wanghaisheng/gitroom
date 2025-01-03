import { Select } from '@gitroom/react/form/select';
import { uniqBy } from 'lodash';
import React, { FC, useMemo, useState } from 'react';
import { Integrations } from '@gitroom/frontend/components/launches/calendar.context';

export const SelectCustomer: FC<{
  onChange: (value: string) => void;
  integrations: Integrations[];
  customer?: string;
}> = (props) => {
  const { onChange, integrations, customer: currentCustomer } = props;
  const [customer, setCustomer] = useState(currentCustomer || '');

  const totalCustomers = useMemo(() => {
    return uniqBy(integrations, (i) => i?.customer?.id).length;
  }, [integrations]);

  if (totalCustomers <= 1) {
    return null;
  }

  return (
    <Select
      hideErrors={true}
      label=""
      name="customer"
      value={customer}
      onChange={(e) => {
        setCustomer(e.target.value);
        onChange(e.target.value);
      }}
      disableForm={true}
    >
      <option value="">Selected Customer</option>
      {uniqBy(integrations, (u) => u?.customer?.name)
        .filter((f) => f.customer?.name)
        .map((p) => (
          <option key={p.customer?.id} value={p.customer?.id}>
            Customer: {p.customer?.name}
          </option>
        ))}
    </Select>
  );
};