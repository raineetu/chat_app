import signup from "../assets/signup.jpg";

const ChatHeader = () => {
  return (
    <div className="p-2.5 border-b border-base-300 ">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={signup} alt="User Avatar" />
            </div>
          </div>

          {/* User info */}
          <div className="text-right">
            <h3 className="font-medium ">Neetu Rai</h3>
            <p className="text-sm text-left">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
