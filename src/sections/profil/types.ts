// src/sections/profil/types.ts
export type Pejabat = { jabatan: string; nama: string };
export type Stat = {
  label: string;
  value: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};
