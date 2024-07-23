/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Image from 'next/image';
import classNames from 'classnames';
import Close from '@/public/icons/close.svg';
import { FilterProps } from '@/interfaces/filterProps.interface';
import { useFilter } from '../CatalogProps/FilterContext';
import Featured from './components/Featured/Featured';
import classes from './filterForm.module.scss';
import BaseFilterField from './components/BaseFilterField/BaseFilterField';
import AdvancedFilterField from './components/AdvancedFilterField/AdvancedFilterField';

type Props = {
  yachtsParams: FilterProps,
  closeForm: () => void;
}

export const FilterForm: React.FC<Props> = ({ closeForm, yachtsParams }) => {
  const {
    setYachtsParams,
    handleSubmit,
    handleReset,
  } = useFilter();

  useEffect(() => setYachtsParams(yachtsParams), []);
  
  const formRef = useRef<HTMLFormElement>(null);
  const [formHeight, setFormHeight] = useState<number | null>(null);
  const [advanced, setAdvanced] = useState(false);

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
      <div className={classes.container}>
        <div className={classes.content}>
          <Featured />
        </div>

        <BaseFilterField />

        <Form.Group className={classes.group}>
          <button
            className={classNames(
              classes['advanced-button'],
              { [classes['advanced-button--active']]: advanced },
            )}
            type='button'
            onClick={() => setAdvanced(!advanced)}
          >
            Advanced filter
          </button>
        </Form.Group>

        {advanced && <AdvancedFilterField />}
      </div>

      <div className={classes.buttons}>
        <button
          className={classes.button}
          type="button"
          onClick={() => handleReset()}
        >
          Reset
        </button>
        <button className={classes.button} type="submit">
          Apply
        </button>
      </div>
    </Form>
  );
}
