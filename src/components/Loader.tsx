type LoaderProps = {
  text: string
}

const Loader = ({ text }: LoaderProps) => {
  return (
    <div className='container flex min-h-screen flex-col items-center justify-center'>
      {text}
    </div>
  )
}

export default Loader
