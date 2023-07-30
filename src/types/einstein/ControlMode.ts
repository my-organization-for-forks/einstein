export const ControlMode = ['translate', 'scale'] as const;

export type ControlMode = (typeof ControlMode)[number];
