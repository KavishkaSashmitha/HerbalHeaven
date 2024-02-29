import { Spinner } from '@material-tailwind/react';

export function Load() {
  return (
    <div className="flex gap-8 ">
      <Spinner className="h-16 w-16 text-green-900/50" />
    </div>
  );
}
