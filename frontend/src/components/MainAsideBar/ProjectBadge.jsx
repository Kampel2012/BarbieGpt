import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const ProjectBadge = ({ name, id }) => {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const isActive = currentChat._id === id;
  return (
    <Link
      to={`/main/${id}`}
      className={`w-[213px] px-3 py-2 rounded-xl flex hover:bg-activeBlue transition-all mr-2 overflow-x-clip ${
        isActive && 'bg-activeBlue'
      }`}
    >
      {name}
    </Link>
  );
};

ProjectBadge.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ProjectBadge;
