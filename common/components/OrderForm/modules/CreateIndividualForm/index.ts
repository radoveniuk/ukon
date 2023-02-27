import dynamic from 'next/dynamic';

export default dynamic(
  () => import('./CreateIndividualForm'),
  { ssr: false }
);