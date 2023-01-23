const Loading = ({ show, children }) => {
  return <>{show ? <div className="loading-main">{children}</div> : null}</>
}

export default Loading
