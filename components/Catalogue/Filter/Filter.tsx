'use client'

import React, { useState } from 'react'
import Image from 'next/image';
import { Offcanvas, Dropdown } from 'react-bootstrap';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import filter from '../../../public/icons/filter.svg';

import styles from './filter.module.scss';

const make = ['Porshe', 'Rols', 'Ferarri', 'Audi'];
const model = ['N240', 'N340', 'N440', 'N540'];
const keel = ['Long', 'Full', 'Short', 'Fin'];
const fuel = ['Diesel', 'Coal', 'Wind', 'Hands'];
const country = ['Norway', 'Denmark', 'Sweeden', 'Finland'];
const town = ['Oslo', 'Copenhagen', 'Stockholm', 'Bergen'];


const DropDown = ({ options, title }: { options: string[], title: string }) => {
  const [value, setValue] = useState(options[0])

  const handleDropdownChange = (option: string) => {
    setValue(option);
  }

  return (
    <>
      <p className={styles.title}>{title}</p>
      <Dropdown className='d-flex align-items-center'>
        <Dropdown.Toggle as='div' className={styles.dropdown__button}>
          {value}
        </Dropdown.Toggle>

        <Dropdown.Menu className={styles.dropdown__menu}>
          {options.map((option, index) => (
            <Dropdown.Item
              key={index}
              onClick={() => handleDropdownChange(option)}
              className={styles.dropdown__item}
            >
              {option}
            </Dropdown.Item>
          ))}

        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

type RangeProps = {
  r1: number;
  r2: number;
  step?: number;
  title: string;
}

const RangeFilter = ({ r1, r2, step, title }: RangeProps) => {
  const [min, setMin] = useState(r1);
  const [max, setMax] = useState(r2);

  const onMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= r1) {
      setMin(value);
    }
  }

  const onMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value <= r2) {
      setMax(value);
    }
  }

  const handleRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setMin(value[0]);
      setMax(value[1]);
    }

  }

  return (
    <div className="">
      <p className={styles.title}>{title}</p>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <input
            type="number"
            value={min}
            onChange={onMinChange}
            className={styles.range__box}
          />
        </div>
        <span className={styles.range__dash} />
        <div>
          <input
            type="number"
            value={max}
            onChange={onMaxChange}
            className={styles.range__box}
          />
        </div>
      </div>
      <div className='px-3'>
        <Slider
          range
          pushable
          defaultValue={[r1, r2]}
          value={[min, max]}
          min={r1}
          max={r2}
          step={step && step}
          onChange={handleRangeChange}
          trackStyle={[{ backgroundColor: '#e7801a' }]}
          handleStyle={[
            { backgroundColor: '#d9e2eb', width: '24px', height: '24px', marginTop: '-10px', border: 'solid 2px #b0bcc8', opacity: 1 },
            { backgroundColor: '#d9e2eb', width: '24px', height: '24px', marginTop: '-10px', border: 'solid 2px #b0bcc8', opacity: 1 }]}
          railStyle={{ backgroundColor: '#aaafb4' }}
        />
      </div>
    </div>
  );
}

const Filter = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <section className='d-flex align-items-center me-2'>
      <span onClick={handleShow} className={styles.button}>
        Filter <Image height={20} src={filter} alt='filter' />
      </span>
      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header>
          <Offcanvas.Title className={styles.canvas__title}>
            <span className={styles.canvas__title__main}>Filter</span>
            <span className={styles.canvas__title__reset}>Reset everything</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={styles.body}>
          <div className='pb-4 border-bottom mb-4 d-flex'>
            <div className="w-50">
              <p className={styles.title}>Featured</p>
              <div className="d-flex gap-2">
                <input type="checkbox" id="Featured" name="Featured" className={styles.checkbox} /><label htmlFor="Featured">Show</label>
              </div>
            </div>
            <div className=''>
              <p className={styles.title}>VAT Included</p>
              <div className="d-flex gap-2">
                <input type="checkbox" id="VAT" name="VAT" className={styles.checkbox} /><label htmlFor="VAT">Show</label>
              </div>
            </div>
          </div>
          <div className="pb-4 border-bottom mb-4">
            <DropDown options={make} title='Make' />
          </div>
          <div className="pb-4 border-bottom mb-4">
            <DropDown options={model} title='Model' />
          </div>
          <div className="pb-4 border-bottom mb-4">
            <RangeFilter r1={1930} r2={2024} title='Year Built' />
          </div>
          <div className="pb-4 border-bottom mb-4">
            <RangeFilter r1={2.5} r2={300} step={0.5} title='Length Overall' />
          </div>
          <div className="pb-4 border-bottom mb-4">
            <RangeFilter r1={1} r2={25} title='Beam Width' />
          </div>
          <div className="pb-4 border-bottom mb-4">
            <RangeFilter r1={0.3} r2={16} step={0.3} title='Draft Depth' />
          </div>
          <div className="pb-4 border-bottom mb-4">
            <DropDown options={keel} title='Keel Type' />
          </div>
          <div className="pb-4 border-bottom mb-4">
            <DropDown options={fuel} title='Fuel Type' />
          </div>
          <div className="pb-4 border-bottom mb-4">
            <DropDown options={country} title='Country' />
          </div>
          <div className="pb-4 border-bottom mb-4">
            <DropDown options={town} title='Town' />
          </div>
          <div className="pb-4 border-bottom mb-4">
            <RangeFilter r1={0} r2={10} title='Cabins' />
          </div>
          <div className="pb-4 border-bottom mb-4">
            <RangeFilter r1={0} r2={20} title='Berths' />
          </div>
          <div className="pb-4 border-bottom mb-4">
            <RangeFilter r1={0} r2={10} title='Heads' />
          </div>
          <div className="pb-4 border-bottom mb-4">
            <RangeFilter r1={0} r2={10} title='Showers' />
          </div>
        </Offcanvas.Body>
        <button className={styles.submit}>Apply</button>
      </Offcanvas>
    </section>
  );
};

export default Filter;
