import Pusher from "pusher-js";

let pusher = new Pusher("398d603e7fcaaee24a78", {
  cluster: "eu",
});
Pusher.logToConsole = true;

export default pusher;
