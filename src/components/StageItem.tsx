const StageItem = ( {type, statusNumber}: any ) => {
  return (
    <div className={`stage text-${type} clearfix"`}>
    <span className={'stage__text'}>Stage {statusNumber + 1}</span>
    <span className={`${type}-icon`} />
  </div>
  )
}

export default StageItem;