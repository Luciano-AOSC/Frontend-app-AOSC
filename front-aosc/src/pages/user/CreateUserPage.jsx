import UserProfile from '../../components/user/userProfile/UserProfile';

const UserProfilePage = ({readOnly = false}) => {

  return (
    <div>
        <h2>Perfil de Usuario</h2>
        <UserProfile readOnly={readOnly}/>
    </div>
  );
};

export default UserProfilePage;