import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { shareType } from "@/entity/document";
import { SelectProps } from "@radix-ui/react-select";
import {
  Earth,
  EarthIcon,
  Icon,
  IconNode,
  Lock,
  LockIcon,
  LucideAArrowDown,
  LucideIcon,
  User,
  UserIcon,
} from "lucide-react";
import React, { useEffect } from "react";

const ShareTypeItems: {
  value: shareType;
  label: string;
  icon: LucideIcon;
  disabled?: boolean;
}[] = [
  {
    value: shareType.PUBLIC,
    label: "Công khai",
    icon: EarthIcon,
    disabled: true,
  },
  {
    value: shareType.FRIEND,
    label: "Bạn bè",
    icon: UserIcon,
  },
  {
    value: shareType.PRIVATE,
    label: "Chỉ mình bạn",
    icon: LockIcon,
  },
];

interface Props extends SelectProps {
  value?: shareType;
  onValueChange?: (value: shareType) => void;
}

export default function ShareTypeSelect({
  value,
  onValueChange,
  ...props
}: Props) {
  const [Icon, setIcon] = React.useState<LucideIcon>(UserIcon);

  const handleValueChange = (value: shareType) => {
    if (typeof onValueChange === "function") onValueChange(value);
    const item = ShareTypeItems.find((item) => item.value == value);
    console.log(item);

    if (item) setIcon(item.icon);
  };

  return (
    <Select
      {...props}
      value={value}
      onValueChange={handleValueChange}
      defaultValue={shareType.FRIEND}
    >
      <SelectTrigger className="w-fit shadow-none px-1 border-none">
        <SelectValue>
          <Icon size={14} />
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {ShareTypeItems.map((item) => {
          return (
            <SelectItem
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              <div className="flex items-center space-x-2">
                <item.icon size={14} />
                <span>{item.label}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
