import { Spinner } from '@material-tailwind/react';

export function Load() {
  return (
    <div className="flex gap-8">
      <Spinner color="teal" />
    </div>
  );
}
