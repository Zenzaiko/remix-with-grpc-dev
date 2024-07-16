import IconBxSend from "../icons/IconBxSend";

type Props = {
  forumId: number;
};

export default function PostEdit(props: Props) {
  const handleClick = () => {
    alert(props.forumId);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-start w-full gap-2 p-4">
        {/* <div className="w-6/12"> */}
        {/*   <input */}
        {/*     type="text" */}
        {/*     id="name" */}
        {/*     className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" */}
        {/*     placeholder="名前を入力" */}
        {/*   /> */}
        {/* </div> */}
        <div className="w-full">
          <textarea
            id="comment"
            className="w-full min-h-36 max-h-36 p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="w-full flex justify-end px-4">
          <IconBxSend
            className="cursor-pointer"
            width="1.5rem"
            height="1.5rem"
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  );
}
