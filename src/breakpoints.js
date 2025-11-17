/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { Icon, desktop, tablet, mobile } from '@wordpress/icons';

export const breakpoints = [
  {
    name: 'lg',
    slug: 'large',
    label: __('Large', 'responsive-block-controls'),
    icon: <Icon icon={desktop} />,
  },
  {
    name: 'md',
    slug: 'medium',
    label: __('Medium', 'responsive-block-controls'),
    icon: <Icon icon={tablet} />,
  },
  {
    name: 'sm',
    slug: 'small',
    label: __('Small', 'responsive-block-controls'),
    icon: <Icon icon={mobile} />,
  },
];

export default breakpoints;
