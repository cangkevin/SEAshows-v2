type LoaderProps = {
  text: string
}

const Loader = ({ text }: LoaderProps) => {
  return <div className='flex flex-col items-center'>{text}</div>
}

export default Loader
