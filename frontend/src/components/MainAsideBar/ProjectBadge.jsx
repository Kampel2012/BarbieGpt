import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProjectBadge = ({ name, id }) => {
  //bg-activeBlue для активности

  return (
    <Link
      to={`/main/${id}`}
      className="px-3 py-2 rounded-xl flex hover:bg-activeBlue transition-all"
    >
      {name}
    </Link>
  );
};

ProjectBadge.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default ProjectBadge;
