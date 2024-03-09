type LoaderProps = {
  text: string
  className?: string
}

const Loader = ({ text, className = '' }: LoaderProps) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {text}
    </div>
  )
}

export default Loader
