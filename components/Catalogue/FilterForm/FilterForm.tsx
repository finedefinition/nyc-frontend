import { FormEvent, useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Close from '@/public/icons/close.svg';
import { getSearchWith } from '@/utils/functions/getSearchWith';
import { FilterProps } from '@/interfaces/filterProps.interface';
import { FeaturedType } from './types';
import { FEATURED } from './constants';
import classes from './filterForm.module.scss';

type Props = {
  yachtsParams: FilterProps,
  closeForm: () => void;
}

export const FilterForm: React.FC<Props> = ({ closeForm }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  
  const formRef = useRef<HTMLFormElement>(null);
  const [formHeight, setFormHeight] = useState<number | null>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (formRef.current) {
        const currentHeight = formRef.current.offsetHeight;
        const rect = formRef.current.getBoundingClientRect();
        const maxFormHight = Math.trunc(window.innerHeight - rect.top - 10);

        setFormHeight(currentHeight > maxFormHight ? maxFormHight : currentHeight)
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const [featured, setFeatured] = useState<FeaturedType>({
    top: !!searchParams.get('top'),
    hotPrice: !!searchParams.get('hotPrice'),
    vat: !!searchParams.get('vat'),
  });

  const handleReset = () => {
    setFeatured(FEATURED);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const params = getSearchWith(searchParams, featured);
    replace(`${pathname}?${params}`);
  };

  return (
    <Form
      ref={formRef}
      className={classes.form}
      style={{ height: formHeight ? formHeight : 'min-content' }}
      noValidate
      onSubmit={handleSubmit}
    >
      <div className={classes.header}>
        <span>Filter</span>
        <Image src={Close} alt="Close" onClick={closeForm} />
      </div>
      <div className={classes.content}>
        Content
      </div>

      <div className={classes.buttons}>
        <button
          className={classes.button}
          type="button"
          onClick={() => handleReset()}
        >
          Reset
        </button>

        <button
          className={classes.button}
          type="submit"
        >
          Apply
        </button>
      </div>
    </Form>
  );
}
