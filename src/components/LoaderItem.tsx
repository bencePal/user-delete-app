const LoaderItem = ( {type, statusNumber}: any ) => {
  return (
    <div className={`stage text-${type} clearfix"`}>
    <span className={'stage__text'}>Stage {statusNumber}</span>
    <span className={`${type}-icon`} />
  </div>
  )
}

export default LoaderItem;