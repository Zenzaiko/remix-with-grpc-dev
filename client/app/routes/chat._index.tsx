import type { MetaFunction } from "@remix-run/node";
import ChatSummary from "~/components/ChatSummary";

const IMAGES = [
  "/public/images/animal_black_sheep_hitsuji.png",
  "/public/images/animal_planaria.png",
  "/public/images/animal_sunagitsune.png",
  "/public/images/animal_uma_horse_stand.png",
  "/public/images/animal_ushi_aurochs.png",
  "/public/images/animal_yamaneko_iriomote.png",
  "/public/images/animal_wani_water.png",
  "/public/images/animal_yukihyou.png",
  "/public/images/bird_akasyoubin.png",
  "/public/images/shinkai_mendako_open.png",
];

export const CHANNELS_LIST = Array.from({ length: 10 }, (_, i) => ({
  channel: i + 1,
  comment: `このコメントはサンプルです。\nこれは改行されます。${i + 1}`,
  image: IMAGES[i],
}));

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Learning Chatting Space" },
    { name: "chat", content: "Welcome to chat!" },
  ];
};

export default function Index() {
  const channels = CHANNELS_LIST;
  return (
    <>
      <div className="w-full my-16 text-center">
        <h1 className="text-2xl animate-focus-in-contract">
          {`Hello ${localStorage.getItem("userName") || "Guest"}...`}
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {channels.map((channel) => (
          <div className="animate-fade-in" key={`channel${channel.channel}`}>
            <ChatSummary
              channel={channel.channel}
              comment={channel.comment}
              image={channel.image}
            />
          </div>
        ))}
      </div>
    </>
  );
}
