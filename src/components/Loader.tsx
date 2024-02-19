type LoaderProps = {
  text: string
}

const Loader = ({ text }: LoaderProps) => {
  return (
    <div className='flex min-h-[calc(100dvh-6rem)] flex-col items-center justify-center'>
      {text}
    </div>
  )
}

export default Loader
