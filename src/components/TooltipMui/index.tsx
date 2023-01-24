import { Tooltip, TooltipProps } from '@mui/material';
import { Children } from 'react';

export default function TooltipMui({ children, ...props }: TooltipProps) {

  if(Children.only(children).props.disabled) return <>{children}</>;

  return (
    <Tooltip
      {...props}
      disableInteractive
      arrow
    >
      {children}
    </Tooltip>
  )
}
