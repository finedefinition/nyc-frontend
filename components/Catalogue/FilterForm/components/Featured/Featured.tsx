import Form from 'react-bootstrap/Form';
import { useFilter } from '@/components/Catalogue/CatalogProps/FilterContext';
import { FeaturedType } from '../../types';
import { FEATURED_FIELDS } from '../../constants';
import classes from './features.module.scss';

function Featured() {
  const { featured, setFeatured } = useFilter();
  
  const handleChange = (key: keyof FeaturedType) => setFeatured({
    ...featured,
    [key]: !featured[key],
  });

  return (
    <Form.Group className={classes.group}>
      <p>Featured</p>

      <div className={classes.features}>
        {FEATURED_FIELDS.map(field => (
          <Form.Check
            key={field.name}
            className={classes.checkbox}
            name={field.name}
            label={field.label}
            checked={featured[field.name]}
            onChange={() => handleChange(field.name)}
          />
        ))}
      </div>
    </Form.Group>
  );
}

export default Featured;
