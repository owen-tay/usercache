export default function Feature({ Icon, title, description }) {
  return (
    <div className="flex flex-col bg-gray-100 items-center  p-4 border shadow-xl rounded-xl hover:scale-105 ease-in-out duration-100">
      <Icon className="text-4xl mb-2" /> 
      <h4 className="text-lg font-bold mb-1">{title}</h4>
      <p>{description}</p>
    </div>
  )
}
