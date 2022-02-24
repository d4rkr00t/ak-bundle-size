// import React from "react";
// import { getEmojiRepository } from "@atlaskit/util-data-test/get-emoji-repository";
// import { Emoji } from "@atlaskit/emoji";

// const emojiService = getEmojiRepository();

// function App() {
//   const wtf = emojiService.findByShortName(":wtf:");
//   return (
//     <div>
//       <Emoji
//         emoji={wtf}
//         showTooltip={true}
//         fitToHeight={24}
//         selected={true}
//         showDelete
//       />
//     </div>
//   );
// }

// export default App;

import React from "react";
import { ResourcedEmoji } from "@atlaskit/emoji/element";
import { EmojiResource } from "@atlaskit/emoji/resource";

function App() {
  console.log(ResourcedEmoji, EmojiResource);
  return <div></div>;
}

export default App;
