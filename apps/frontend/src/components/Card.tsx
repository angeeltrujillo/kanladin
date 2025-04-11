

interface CardProps {
    title: string;
    description: string;
}

export const Card = ({ title = "New task", description = "" }: CardProps) => {

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      {/* Title */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="space-x-2">
          <button
            onClick={() => {}}
            className="text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            Edit
          </button>
          <button
            onClick={() => {}}
            className="text-sm text-red-500 hover:text-red-700 focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      
    </div>
  )
  }