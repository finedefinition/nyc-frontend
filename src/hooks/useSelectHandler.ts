import { useRouter, useSearchParams } from 'next/navigation';

export const useSelectHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.delete('page');
      params.set(key, value as string);
    }

    router.push(`/catalogue?${params.toString()}`);
  };

  return { handleSelect };
};
