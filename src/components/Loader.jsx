const Loader = (props) => {
  return (
    <div className='d-flex align-items-center'>
      <strong role='status'>{props.loaderText}...</strong>
      <div className='spinner-border ms-auto' aria-hidden='true'></div>
    </div>
  );
};

export default Loader;
