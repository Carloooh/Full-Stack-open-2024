const Notification = ({ message, isError }) => {
    if (message === null) {
      return null;
    }
    const notificationType = isError ? 'error' : 'success';
    return (
      <div className={notificationType}>
        {message}
      </div>
    );
  };
  
  export default Notification;