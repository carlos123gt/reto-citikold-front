function Loader() {
  return (
    <div className={` backdrop-blur-sm absolute top-0 left-0 z-[100] bg-black/60 w-full h-full`}>
        <div className="flex justify-center items-center h-full">
            <div className="bg-white rounded-3xl p-6 shadow-sm">
                Cargando...
            </div>
        </div>
    </div>
  )
}

export default Loader