import Form from 'react-bootstrap/Form';
import { FeaturedType, } from '../../types';
import classes from './features.module.scss';

interface FeaturedProps {
  values: FeaturedType;
  changeValue: (value: keyof FeaturedType) => void;
}

function Featured({ values, changeValue }: FeaturedProps) {
  return (
    <Form.Group className={classes.group}>
      <p>Featured</p>

      <div className={classes.features}>
        <Form.Check
          className={classes.checkbox}
          name='top'
          label='Top 3'
          checked={values['top']}
          onChange={() => changeValue('top')}
        />
        <Form.Check
          className={classes.checkbox}
          name='hotPrice'
          label='Hot Price'
          checked={values['hotPrice']}
          onChange={() => changeValue('hotPrice')}
        />
        <Form.Check
          className={classes.checkbox}
          name='vat'
          label='VAT'
          checked={values['vat']}
          onChange={() => changeValue('vat')}
        />
      </div>
    </Form.Group>
  );
}

export default Featured;
