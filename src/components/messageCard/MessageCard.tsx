interface MessageProps {
  message: string;
}

export default function MessageCard({ message }: MessageProps) {
  return (
    <div className="">
      <div className="w-full container mx-auto">
        <div className="flex flex-wrap w-full lg:w-auto">
          {/* Left Card */}
          <div className="w-full lg:w-1/2 flex rounded-lg bg-auto shadow-2xl min-h-[372px]">
            <div className="rounded-lg py-6 pl-8 pr-32 w-full bg-white text-gray-400">
              {message}
            </div>
          </div>

          {/* Right Card */}
          <div className="w-full lg:w-1/2 flex ml-0">
            <div className="lg:my-3 bg-gray-800 p-8 lg:rounded-r-lg w-full shadow-2xl text-gray-400">
              {message}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
